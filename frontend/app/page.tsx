import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-2 uppercase">
        Kallpa Calzado
      </h1>
      <p className="text-gray-500 mb-8 max-w-md">
        Sistema de ventas y administración en construcción.
      </p>
      
      <div className="flex gap-4 w-full max-w-xs justify-center">
        <Link href="/login" className="w-full rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 transition-colors">
          Iniciar Sesión
        </Link>
        <Link href="/register" className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 transition-colors">
          Registrarse
        </Link>
      </div>
    </div>
  );
}