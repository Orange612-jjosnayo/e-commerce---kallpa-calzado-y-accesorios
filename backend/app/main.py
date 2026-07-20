from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Importamos nuestra base de datos y enrutador
from app.core.database import engine, Base
from app.users.router import router as users_router

# Esta línea crea las tablas en MySQL automáticamente si no existen
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Kallpa Calzado API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Conectamos las rutas de usuarios a la aplicación principal
app.include_router(users_router)

@app.get("/")
def read_root():
    return {"status": "online"}