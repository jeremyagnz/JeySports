import { Link } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

const SECTIONS = [
  { to: '/jugadores', icon: '🏃', label: 'Jugadores', desc: 'Gestionar jugadores de la liga' },
  { to: '/equipos', icon: '🛡️', label: 'Equipos', desc: 'Gestionar equipos' },
  { to: '/calendario', icon: '📅', label: 'Calendario', desc: 'Gestionar partidos y fechas' },
  { to: '/clasificacion', icon: '🏆', label: 'Clasificación', desc: 'Actualizar tabla de posiciones' },
]

export default function Admin() {
  const { user } = useAuth()

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="bg-blue-800 text-white rounded-2xl p-8 mb-8 text-center">
        <div className="text-5xl mb-3">🔧</div>
        <h1 className="text-3xl font-bold">Panel de Administración</h1>
        <p className="text-blue-200 mt-2">Bienvenido, <span className="font-semibold text-yellow-300">{user?.username}</span>. Tienes acceso completo de administrador.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {SECTIONS.map((s) => (
          <Link
            key={s.to}
            to={s.to}
            className="bg-white rounded-xl shadow hover:shadow-md transition-shadow p-6 flex items-start gap-4 group"
          >
            <div className="text-4xl">{s.icon}</div>
            <div>
              <h2 className="font-bold text-gray-800 text-lg group-hover:text-blue-700 transition-colors">{s.label}</h2>
              <p className="text-gray-500 text-sm mt-0.5">{s.desc}</p>
              <span className="inline-block mt-2 text-xs text-blue-600 font-semibold">Agregar · Editar · Eliminar →</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-5 text-sm text-yellow-800">
        <strong>ℹ️ Nota:</strong> Todos los cambios se guardan automáticamente en el almacenamiento local del navegador.
      </div>
    </div>
  )
}
