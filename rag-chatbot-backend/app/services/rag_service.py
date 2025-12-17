import os
import google.genai as genai
from qdrant_client import QdrantClient
from ..core.config import settings

# Initialize Gemini
genai.configure(api_key=settings.GOOGLE_API_KEY)

# Initialize Qdrant client
qdrant_client = QdrantClient(
    url=settings.QDRANT_URL,
    api_key=settings.QDRANT_API_KEY,
)

# Use Google's embedding model
# Ensure 'models/embedding-001' or similar is used, check Gemini API documentation for latest.
EMBEDDING_MODEL = "models/embedding-001"
# We no longer need sentence_transformers or the local model
# embedding_model = SentenceTransformer("all-MiniLM-L6-v2") # Ensure this model is downloaded/available

QDRANT_COLLECTION_NAME = "my_book_collection"
GENERATION_MODEL = "gemini-pro" # Or "gemini-1.5-pro-latest" for more advanced capabilities

async def get_rag_response(query: str, session_id: str, selected_text: str | None = None) -> str:
    context = ""
    if selected_text:
        # If user provided selected text, use it directly as context
        context = selected_text
    else:
        # Otherwise, retrieve relevant documents from Qdrant
        # Generate embedding using Google's generative AI
        embed_response = genai.embed_content(
            model=EMBEDDING_MODEL,
            content=query,
            task_type="RETRIEVAL_QUERY"
        )
        query_embedding = embed_response['embedding']
        
        search_result = qdrant_client.search(
            collection_name=QDRANT_COLLECTION_NAME,
            query_vector=query_embedding,
            limit=3 # Retrieve top 3 relevant chunks
        )
        
        if search_result:
            context = "\n".join([hit.payload["text"] for hit in search_result])
        else:
            context = "No relevant information found in the book."

    # Construct the prompt for the LLM
    # Emphasize answering ONLY from the provided context to prevent hallucinations
    prompt_parts = [
        f"You are a helpful assistant that answers questions about a book based on provided context. "
        f"Answer the following question ONLY from the context below. If the answer is not available "
        f"in the context, state 'I cannot answer this question based on the provided information.' "
        f"Do not make up any information.\n\n"
        f"Context:\n{context}\n\n"
        f"Question: {query}\n"
        f"Answer:"
    ]
    
    try:
        model = genai.GenerativeModel(GENERATION_MODEL)
        response = model.generate_content(prompt_parts)
        return response.text
    except Exception as e:
        print(f"Error generating content from LLM: {e}")
        return "I am currently unable to generate a response. Please try again later."
