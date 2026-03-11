import { useState } from 'react'
import { useAuth } from '../auth/AuthContext'
import { getAll, add, update, remove } from '../data/store'

const EMPTY_FORM = { local: '', visitante: '', fecha: '', hora: '', estadio: '', resultado: '' }

export default function Schedule() {
  const { isAdmin } = useAuth()
  const [matches, setMatches] = useState(() => getAll('partidos'))
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [showForm, setShowForm] = useState(false)

  const openNew = () => {
    setEditing(null)
    setForm(EMPTY_FORM)
    setShowForm(true)
  }

  const openEdit = (match) => {
    setEditing(match.id)
    setForm({
      local: match.local,
      visitante: match.visitante,
      fecha: match.fecha,
      hora: match.hora,
      estadio: match.estadio,
      resultado: match.resultado || '',
    })
    setShowForm(true)
  }

  const handleSave = (e) => {
    e.preventDefault()
    if (editing) {
      setMatches(update('partidos', editing, form))
    } else {
      setMatches(add('partidos', form))
    }
    setShowForm(false)
  }

  const handleDelete = (id) => {
    if (confirm('¿Eliminar este partido?')) {
      setMatches(remove('partidos', id))
    }
  }

  const sorted = [...matches].sort((a, b) => new Date(a.fecha) - new Date(b.fecha))

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">📅 Calendario de Partidos</h1>
        {isAdmin && (
          <button
            onClick={openNew}
            className="bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold px-4 py-2 rounded-lg"
          >
            + Añadir Partido
          </button>
        )}
      </div>

      {showForm && isAdmin && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
          <h2 className="font-semibold text-blue-800 mb-4">{editing ? 'Editar Partido' : 'Nuevo Partido'}</h2>
          <form onSubmit={handleSave} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: 'Equipo Local', key: 'local', type: 'text' },
              { label: 'Equipo Visitante', key: 'visitante', type: 'text' },
              { label: 'Fecha', key: 'fecha', type: 'date' },
              { label: 'Hora', key: 'hora', type: 'time' },
              { label: 'Estadio', key: 'estadio', type: 'text' },
              { label: 'Resultado (ej: 2-1)', key: 'resultado', type: 'text' },
            ].map(({ label, key, type }) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                <input
                  type={type}
                  required={key !== 'resultado'}
                  value={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                />
              </div>
            ))}
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

      <div className="space-y-4">
        {sorted.map((m) => (
          <div key={m.id} className="bg-white rounded-xl shadow p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="font-bold text-gray-800 text-base">
                {m.local} <span className="text-gray-400 font-normal">vs</span> {m.visitante}
              </div>
              <div className="text-gray-500 text-sm mt-0.5">
                {m.fecha} · {m.hora} · {m.estadio}
              </div>
              {m.resultado && (
                <span className="inline-block mt-1 bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded">
                  Resultado: {m.resultado}
                </span>
              )}
            </div>
            {isAdmin && (
              <div className="flex gap-3 shrink-0">
                <button onClick={() => openEdit(m)} className="text-blue-600 hover:underline text-xs">Editar</button>
                <button onClick={() => handleDelete(m.id)} className="text-red-600 hover:underline text-xs">Eliminar</button>
              </div>
            )}
          </div>
        ))}
        {matches.length === 0 && (
          <p className="text-gray-400">No hay partidos programados</p>
        )}
      </div>
    </div>
  )
}
