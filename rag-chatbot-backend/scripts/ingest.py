import os
import glob
from langchain_text_splitters import RecursiveCharacterTextSplitter
from qdrant_client import QdrantClient, models
from dotenv import load_dotenv
import google.genai as genai # Import google.generativeai

# Load environment variables from .env file
load_dotenv(dotenv_path='../.env')

# --- Configuration ---
DOCS_PATH = "../../docs"  # Path to the Docusaurus docs folder
QDRANT_COLLECTION_NAME = "my_book_collection"
EMBEDDING_MODEL = "models/embedding-001"  # Use Google's embedding model

# Configure Gemini for embedding
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# --- Initialize Clients ---
qdrant_client = QdrantClient(
    url=os.getenv("QDRANT_URL"),
    api_key=os.getenv("QDRANT_API_KEY"),
)
# We no longer need sentence_transformers
# embedding_model = SentenceTransformer(EMBEDDING_MODEL)

def get_all_markdown_files():
    """Finds all markdown files in the specified docs path."""
    return glob.glob(f"{DOCS_PATH}/**/*.md", recursive=True)

def main():
    """Main function to ingest the book content into Qdrant."""
    files = get_all_markdown_files()
    if not files:
        print("No markdown files found. Check the DOCS_PATH.")
        return

    print(f"Found {len(files)} markdown files to process.")

    # --- Setup Qdrant Collection ---
    try:
        qdrant_client.recreate_collection(
            collection_name=QDRANT_COLLECTION_NAME,
            vectors_config=models.VectorParams(size=768, distance=models.Distance.COSINE), # Update vector size to 768
        )
        print(f"Collection '{QDRANT_COLLECTION_NAME}' created successfully.")
    except Exception as e:
        print(f"Collection already exists or an error occurred: {e}")


    # --- Process and Upload ---
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=100,
    )
    
    points_to_upload = []
    for file_path in files:
        print(f"Processing: {file_path}")
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        chunks = text_splitter.split_text(content)
        
        # Generate embeddings using Google's generative AI
        embeddings_response = genai.embed_content(
            model=EMBEDDING_MODEL,
            content=chunks, # genai.embed_content can take a list of strings
            task_type="RETRIEVAL_DOCUMENT"
        )
        embeddings = embeddings_response['embedding']

        for i, (chunk, embedding) in enumerate(zip(chunks, embeddings)):
            point_id = f"{file_path}-{i}"
            points_to_upload.append(
                models.PointStruct(
                    id=point_id,
                    vector=embedding, # embedding is already a list from genai.embed_content
                    payload={"text": chunk, "source": file_path}
                )
            )

    # Bulk upload points to Qdrant
    if points_to_upload:
        print(f"Uploading {len(points_to_upload)} points to Qdrant...")
        qdrant_client.upsert(
            collection_name=QDRANT_COLLECTION_NAME,
            points=points_to_upload,
            wait=True
        )
        print("Upload complete.")

if __name__ == "__main__":
    main()
