import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    GOOGLE_API_KEY: str = os.getenv("GOOGLE_API_KEY")
    QDRANT_URL: str = os.getenv("QDRANT_URL")
    QDRANT_API_KEY: str = os.getenv("QDRANT_API_KEY")
    DATABASE_URL: str = os.getenv("DATABASE_URL")
    # Add other settings here as needed, e.g., allowed CORS origins
    CORS_ORIGINS: list[str] = ["http://localhost:3000", "http://127.0.0.1:3000"] # Docusaurus default

settings = Settings()
