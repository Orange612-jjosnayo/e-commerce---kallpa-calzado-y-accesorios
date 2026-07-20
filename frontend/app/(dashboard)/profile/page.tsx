export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900">Mi Perfil</h1>
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Panel Lateral */}
          <div className="col-span-1 bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-fit">
            <nav className="space-y-4">
              <a href="#" className="block px-3 py-2 text-sm font-medium text-black bg-gray-100 rounded-md">
                Mis Pedidos
              </a>
              <a href="#" className="block px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-md">
                Direcciones de Envío
              </a>
              <a href="#" className="block px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md">
                Cerrar Sesión
              </a>
            </nav>
          </div>

          {/* Área Principal de Contenido */}
          <div className="col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Historial de Pedidos</h2>
              <div className="text-center py-10 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                <p className="text-sm text-gray-500">Aún no has realizado ninguna compra.</p>
                <button className="mt-4 px-4 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800">
                  Ir al catálogo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}