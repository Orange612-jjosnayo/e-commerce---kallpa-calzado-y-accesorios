import bcrypt

def get_password_hash(password: str) -> str:
    # 1. Convertimos el string a bytes
    pwd_bytes = password.encode('utf-8')
    # 2. Generamos una "sal" (salt) aleatoria
    salt = bcrypt.gensalt()
    # 3. Encriptamos
    hashed_password = bcrypt.hashpw(password=pwd_bytes, salt=salt)
    # 4. Lo devolvemos como string para guardarlo en la base de datos (MySQL)
    return hashed_password.decode('utf-8')

def verify_password(plain_password: str, hashed_password: str) -> bool:
    # Convertimos ambos strings a bytes
    password_byte_enc = plain_password.encode('utf-8')
    hashed_password_bytes = hashed_password.encode('utf-8')
    # Bcrypt verifica automáticamente usando la sal incrustada en el hash
    return bcrypt.checkpw(password=password_byte_enc, hashed_password=hashed_password_bytes)