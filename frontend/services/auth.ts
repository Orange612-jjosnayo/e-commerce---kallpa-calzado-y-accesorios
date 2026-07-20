const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export interface RegisterData {
  email: string;
  password?: string; // Opcional por si es Google
  first_name: string;
  last_name: string;
}

export async function registerUserInBackend(data: RegisterData) {
  try {
    const response = await fetch(`${API_URL}/api/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      // Si FastAPI devuelve un error (ej: el correo ya existe), lanzamos la alerta
      throw new Error(result.detail || "Error al registrar el usuario");
    }

    return { success: true, data: result };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}