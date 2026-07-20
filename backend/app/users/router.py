from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import get_password_hash, verify_password
from app.users import models, schemas

router = APIRouter(prefix="/api/users", tags=["Users"])

@router.post("/register", response_model=schemas.UserResponse, status_code=status.HTTP_201_CREATED)
def register_user(user_data: schemas.UserCreate, db: Session = Depends(get_db)):
    # 1. Verificar si el correo ya existe
    existing_user = db.query(models.User).filter(models.User.email == user_data.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="El correo electrónico ya está registrado."
        )
    
    # 2. Encriptar la contraseña
    hashed_pw = get_password_hash(user_data.password)
    
    # 3. Crear el nuevo usuario
    new_user = models.User(
        email=user_data.email,
        hashed_password=hashed_pw,
        first_name=user_data.first_name,
        last_name=user_data.last_name,
        provider="email"
    )
    
    # 4. Guardar en la base de datos
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    return new_user

@router.post("/login")
def login_user(user_data: schemas.UserCreate, db: Session = Depends(get_db)):
    # 1. Buscar al usuario por correo
    user = db.query(models.User).filter(models.User.email == user_data.email).first()
    if not user:
        raise HTTPException(status_code=400, detail="Correo o contraseña incorrectos")
    
    # 2. Verificar la contraseña encriptada usando nuestro nuevo modulo de bcrypt
    if not verify_password(user_data.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Correo o contraseña incorrectos")
    
    # 3. Si todo está bien, retornamos sus datos básicos
    return {
        "id": user.id,
        "email": user.email,
        "first_name": user.first_name,
        "last_name": user.last_name
    }