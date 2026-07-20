import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Correo", type: "email" },
        password: { label: "Contraseña", type: "password" }
      },
      async authorize(credentials) {
        try {
          // Llamamos directamente a nuestra API en FastAPI
          const response = await fetch("http://127.0.0.1:8000/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
              first_name: "", // Campos requeridos por el esquema básico
              last_name: ""
            })
          })

          const user = await response.json()

          if (response.ok && user) {
            // Si FastAPI dice que el usuario es válido, Auth.js crea la sesión
            return user
          }
          return null
        } catch (error) {
          return null
        }
      }
    })
  ],
  pages: {
    signIn: "/login",
  }
})