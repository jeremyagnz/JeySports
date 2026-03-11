import { Link } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

export default function Home() {
  const { isAdmin } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-20 px-4 text-center">
        <div className="text-6xl mb-4">⚽</div>
        <h1 className="text-4xl font-bold mb-3">Bienvenido a JeySports</h1>
        <p className="text-blue-200 text-lg max-w-xl mx-auto">
          Tu plataforma de gestión deportiva. Consulta jugadores, equipos, calendario y clasificación.
        </p>
        {isAdmin && (
          <Link
            to="/admin"
            className="inline-block mt-6 bg-yellow-500 hover:bg-yellow-400 text-blue-900 font-bold px-6 py-3 rounded-lg transition-colors"
          >
            Ir al Panel Admin
          </Link>
        )}
        {!isAdmin && (
          <Link
            to="/login"
            className="inline-block mt-6 bg-white hover:bg-gray-100 text-blue-800 font-bold px-6 py-3 rounded-lg transition-colors"
          >
            Iniciar Sesión
          </Link>
        )}
      </div>

      {/* Cards */}
      <div className="max-w-5xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { to: '/jugadores', icon: '🏃', title: 'Jugadores', desc: 'Consulta el roster completo de jugadores' },
          { to: '/equipos', icon: '🛡️', title: 'Equipos', desc: 'Conoce todos los equipos de la liga' },
          { to: '/calendario', icon: '📅', title: 'Calendario', desc: 'Revisa los próximos partidos' },
          { to: '/clasificacion', icon: '🏆', title: 'Clasificación', desc: 'Tabla de posiciones actualizada' },
        ].map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="bg-white rounded-xl shadow hover:shadow-md transition-shadow p-6 text-center group"
          >
            <div className="text-4xl mb-3">{item.icon}</div>
            <h2 className="font-bold text-gray-800 text-lg group-hover:text-blue-700 transition-colors">{item.title}</h2>
            <p className="text-gray-500 text-sm mt-1">{item.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
