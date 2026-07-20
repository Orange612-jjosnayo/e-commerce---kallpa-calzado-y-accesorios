from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

# Lo que envía el frontend al registrarse
class UserCreate(BaseModel):
    email: EmailStr
    password: str
    first_name: str
    last_name: str

# Lo que el backend le responde al frontend (¡SIN la contraseña!)
class UserResponse(BaseModel):
    id: int
    email: EmailStr
    first_name: str
    last_name: str
    provider: str
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True