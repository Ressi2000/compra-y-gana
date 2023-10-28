import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const hideNavbarOnPaths = ['/formulario', '/beforeForm'];

  if (hideNavbarOnPaths.includes(location.pathname)) {
    return null; // No muestra el Navbar en las rutas especificadas
  }

  return (
    <nav className="bg-indigo-700 p-4 rounded-lg my-3">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/admin/" className="text-white text-xl font-semibold">Inicio</Link>
        <ul className="flex space-x-4">
          {isAuthenticated ? (
            <>
                {isAuthenticated && user && (
                <li>¡Hola!, {user.username}</li>
                )}
              <li><Link to="/admin/tasks" className="text-white hover:text-yellow-300">Tareas</Link></li>
              <li><Link to="/admin/stores" className="text-white hover:text-lime-500">Locales</Link></li>
              <li><Link to="/admin/show-formulario" className="text-white hover:text-cyan-200">Ver Respuestas</Link></li>
              <li><Link to="/admin/show-tabla-crm" className="text-white hover:text-yellow-300">CRM</Link></li>
              <li onClick={logout} className="cursor-pointer text-white hover:text-indigo-300 bg-red-500 px-4 py-1 rounded-sm">Cerrar sesión</li>
            </>
          ) : (
            <>
              <li><Link to="/admin/login" className="text-white hover:text-indigo-300  bg-indigo-500 px-4 py-1 rounded-sm">Iniciar sesión</Link></li>
              <li><Link to="/admin/register" className="text-white hover:text-indigo-300  bg-indigo-500 px-4 py-1 rounded-sm">Registro</Link></li>
              <li><Link to="/formulario" className="text-white hover:text-indigo-300  bg-indigo-500 px-4 py-1 rounded-sm">Formulario</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;