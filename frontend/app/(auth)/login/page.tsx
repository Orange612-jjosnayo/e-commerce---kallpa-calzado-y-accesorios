"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Usamos el motor de NextAuth para iniciar sesión
    const result = await signIn("credentials", {
      redirect: false, // Evitamos que la pantalla parpadee
      email,
      password,
    });

    if (result?.error) {
      setError("Credenciales incorrectas. Intenta de nuevo.");
    } else {
      router.push("/profile"); // ¡Rumbo a la vista dummy!
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-8 shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-center text-gray-900">Bienvenido a Kallpa</h2>
        
        {error && <p className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">{error}</p>}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <input 
              type="email" 
              placeholder="Correo electrónico" 
              required 
              className="w-full rounded-lg border border-gray-300 px-4 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input 
              type="password" 
              placeholder="Contraseña" 
              required 
              className="w-full rounded-lg border border-gray-300 px-4 py-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="w-full rounded-lg bg-black py-2.5 text-white">
            Ingresar
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          ¿No tienes cuenta? <Link href="/register" className="font-medium text-black underline">Regístrate</Link>
        </p>
      </div>
    </div>
  );
}