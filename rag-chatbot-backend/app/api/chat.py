from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..models import schemas
from ..services import rag_service, history_service
import uuid

router = APIRouter()

# Dependency to get DB session
def get_db():
    yield from history_service.get_db()

@router.post("/")
async def chat_endpoint(request: schemas.ChatRequest, db: Session = Depends(get_db)):
    # Save user message
    history_service.create_chat_message(db, request.session_id, request.query, is_from_user=True)

    # Get RAG response
    ai_response = await rag_service.get_rag_response(
        query=request.query,
        session_id=request.session_id,
        selected_text=request.selected_text
    )

    # Save AI response
    history_service.create_chat_message(db, request.session_id, ai_response, is_from_user=False)
    
    return schemas.ChatResponse(session_id=request.session_id, response=ai_response)

@router.get("/history/{session_id}")
async def get_chat_history(session_id: str, db: Session = Depends(get_db)):
    messages = history_service.get_chat_history(db, session_id)
    formatted_history = [
        {"message": msg.message, "is_from_user": msg.is_from_user, "timestamp": str(msg.timestamp)}
        for msg in messages
    ]
    return schemas.HistoryResponse(session_id=session_id, history=formatted_history)
