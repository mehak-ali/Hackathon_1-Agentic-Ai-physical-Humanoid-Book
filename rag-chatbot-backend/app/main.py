from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .core.config import settings
from .models.database import Base, engine
from .api import chat

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="RAG Chatbot API",
    description="API for the Docusaurus RAG Chatbot",
    version="0.1.0",
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routers
app.include_router(chat.router, prefix="/api/chat", tags=["Chatbot"])

@app.get("/")
async def root():
    return {"message": "RAG Chatbot API is running!"}
