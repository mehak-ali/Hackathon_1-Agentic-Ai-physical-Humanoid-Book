from pydantic import BaseModel
from sqlalchemy import Column, Integer, String, Boolean, DateTime
from .database import Base
import datetime

# --- SQLAlchemy Model ---
class ChatMessage(Base):
    __tablename__ = "chat_messages"

    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(String, index=True, nullable=False)
    message = Column(String, nullable=False)
    is_from_user = Column(Boolean, nullable=False)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)

# --- Pydantic Models ---
class ChatRequest(BaseModel):
    session_id: str
    query: str
    selected_text: str | None = None

class ChatResponse(BaseModel):
    session_id: str
    response: str

class HistoryResponse(BaseModel):
    session_id: str
    history: list[dict]
