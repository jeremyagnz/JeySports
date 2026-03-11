import { useState } from 'react'
import { useAuth } from '../auth/AuthContext'
import { getAll, add, update, remove } from '../data/store'

const EMPTY_FORM = { nombre: '', ciudad: '', fundacion: '', escudo: '⚾' }
const ESCUDOS = ['🦁', '🦅', '🐯', '🐺', '⚡', '🔥', '🌊', '🌟', '⚾', '🏟️']

export default function Teams() {
  const { isAdmin } = useAuth()
  const [teams, setTeams] = useState(() => getAll('equipos'))
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [showForm, setShowForm] = useState(false)

  const openNew = () => {
    setEditing(null)
    setForm(EMPTY_FORM)
    setShowForm(true)
  }

  const openEdit = (team) => {
    setEditing(team.id)
    setForm({ nombre: team.nombre, ciudad: team.ciudad, fundacion: team.fundacion, escudo: team.escudo })
    setShowForm(true)
  }

  const handleSave = (e) => {
    e.preventDefault()
    const payload = { ...form, fundacion: Number(form.fundacion) }
    if (editing) {
      setTeams(update('equipos', editing, payload))
    } else {
      setTeams(add('equipos', payload))
    }
    setShowForm(false)
  }

  const handleDelete = (id) => {
    if (confirm('¿Eliminar este equipo?')) {
      setTeams(remove('equipos', id))
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">🏟️ Equipos</h1>
        {isAdmin && (
          <button
            onClick={openNew}
            className="bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold px-4 py-2 rounded-lg"
          >
            + Añadir Equipo
          </button>
        )}
      </div>

      {showForm && isAdmin && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
          <h2 className="font-semibold text-blue-800 mb-4">{editing ? 'Editar Equipo' : 'Nuevo Equipo'}</h2>
          <form onSubmit={handleSave} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
              <input
                required
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ciudad</label>
              <input
                required
                value={form.ciudad}
                onChange={(e) => setForm({ ...form, ciudad: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Año Fundación</label>
              <input
                type="number"
                min="1900"
                max="2030"
                required
                value={form.fundacion}
                onChange={(e) => setForm({ ...form, fundacion: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Logo</label>
              <div className="flex flex-wrap gap-2">
                {ESCUDOS.map((e) => (
                  <button
                    key={e}
                    type="button"
                    onClick={() => setForm({ ...form, escudo: e })}
                    className={`text-2xl p-1 rounded border-2 ${form.escudo === e ? 'border-blue-600' : 'border-transparent'}`}
                  >
                    {e}
                  </button>
                ))}
              </div>
            </div>
            <div className="sm:col-span-2 flex gap-3">
              <button type="submit" className="bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold">
                {editing ? 'Guardar Cambios' : 'Añadir'}
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm">
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {teams.map((t) => (
          <div key={t.id} className="bg-white rounded-xl shadow p-5">
            <div className="text-4xl mb-2">{t.escudo}</div>
            <h2 className="font-bold text-gray-800 text-lg">{t.nombre}</h2>
            <p className="text-gray-500 text-sm">{t.ciudad} · Fundado en {t.fundacion}</p>
            {isAdmin && (
              <div className="mt-3 flex gap-3">
                <button onClick={() => openEdit(t)} className="text-blue-600 hover:underline text-xs">Editar</button>
                <button onClick={() => handleDelete(t.id)} className="text-red-600 hover:underline text-xs">Eliminar</button>
              </div>
            )}
          </div>
        ))}
        {teams.length === 0 && (
          <p className="text-gray-400 col-span-3">No hay equipos registrados</p>
        )}
      </div>
    </div>
  )
}
