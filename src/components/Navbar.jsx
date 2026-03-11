import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const isActive = (path) =>
    location.pathname === path ? 'text-yellow-300 font-semibold' : 'text-white hover:text-yellow-200'

  return (
    <nav className="bg-blue-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">⚽</span>
            <span className="text-white font-bold text-xl tracking-wide">JeySports</span>
          </Link>

          <div className="flex items-center gap-6">
            <Link to="/" className={`text-sm ${isActive('/')}`}>Inicio</Link>
            <Link to="/jugadores" className={`text-sm ${isActive('/jugadores')}`}>Jugadores</Link>
            <Link to="/equipos" className={`text-sm ${isActive('/equipos')}`}>Equipos</Link>
            <Link to="/calendario" className={`text-sm ${isActive('/calendario')}`}>Calendario</Link>
            <Link to="/clasificacion" className={`text-sm ${isActive('/clasificacion')}`}>Clasificación</Link>

            {isAdmin && (
              <Link to="/admin" className={`text-sm ${isActive('/admin')}`}>
                <span className="bg-yellow-500 text-blue-900 px-2 py-1 rounded text-xs font-bold">ADMIN</span>
              </Link>
            )}

            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-blue-200 text-sm">👤 {user.username}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded transition-colors"
                >
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-yellow-500 hover:bg-yellow-400 text-blue-900 text-sm font-semibold px-4 py-1.5 rounded transition-colors"
              >
                Iniciar Sesión
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
