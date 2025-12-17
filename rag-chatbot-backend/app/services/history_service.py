from sqlalchemy.orm import Session
from ..models import schemas, database

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

def create_chat_message(db: Session, session_id: str, message: str, is_from_user: bool):
    db_message = schemas.ChatMessage(
        session_id=session_id,
        message=message,
        is_from_user=is_from_user
    )
    db.add(db_message)
    db.commit()
    db.refresh(db_message)
    return db_message

def get_chat_history(db: Session, session_id: str):
    return db.query(schemas.ChatMessage).filter(schemas.ChatMessage.session_id == session_id).all()
