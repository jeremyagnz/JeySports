import { useState } from 'react'
import { useAuth } from '../auth/AuthContext'
import { getAll, add, update, remove } from '../data/store'

const POSITIONS = [
  'Pitcher',
  'Catcher',
  'Primera Base',
  'Segunda Base',
  'Tercera Base',
  'Shortstop',
  'Jardinero Izquierdo',
  'Jardinero Central',
  'Jardinero Derecho',
  'Bateador Designado',
]
const EMPTY_FORM = { nombre: '', posicion: 'Pitcher', equipo: '', dorsal: '' }

export default function Players() {
  const { isAdmin } = useAuth()
  const [players, setPlayers] = useState(() => getAll('jugadores'))
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [showForm, setShowForm] = useState(false)

  const openNew = () => {
    setEditing(null)
    setForm(EMPTY_FORM)
    setShowForm(true)
  }

  const openEdit = (player) => {
    setEditing(player.id)
    setForm({ nombre: player.nombre, posicion: player.posicion, equipo: player.equipo, dorsal: player.dorsal })
    setShowForm(true)
  }

  const handleSave = (e) => {
    e.preventDefault()
    const payload = { ...form, dorsal: Number(form.dorsal) }
    if (editing) {
      setPlayers(update('jugadores', editing, payload))
    } else {
      setPlayers(add('jugadores', payload))
    }
    setShowForm(false)
  }

  const handleDelete = (id) => {
    if (confirm('¿Eliminar este jugador?')) {
      setPlayers(remove('jugadores', id))
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">🧢 Jugadores</h1>
        {isAdmin && (
          <button
            onClick={openNew}
            className="bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold px-4 py-2 rounded-lg"
          >
            + Añadir Jugador
          </button>
        )}
      </div>

      {showForm && isAdmin && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
          <h2 className="font-semibold text-blue-800 mb-4">{editing ? 'Editar Jugador' : 'Nuevo Jugador'}</h2>
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Posición</label>
              <select
                value={form.posicion}
                onChange={(e) => setForm({ ...form, posicion: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 text-sm"
              >
                {POSITIONS.map((p) => <option key={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Equipo</label>
              <input
                required
                value={form.equipo}
                onChange={(e) => setForm({ ...form, equipo: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Número</label>
              <input
                type="number"
                min="1"
                max="99"
                required
                value={form.dorsal}
                onChange={(e) => setForm({ ...form, dorsal: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />
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

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-blue-900 text-white">
            <tr>
              <th className="px-4 py-3 text-left">#</th>
              <th className="px-4 py-3 text-left">Nombre</th>
              <th className="px-4 py-3 text-left">Posición</th>
              <th className="px-4 py-3 text-left">Equipo</th>
              <th className="px-4 py-3 text-left">Núm.</th>
              {isAdmin && <th className="px-4 py-3 text-right">Acciones</th>}
            </tr>
          </thead>
          <tbody>
            {players.map((p, i) => (
              <tr key={p.id} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-4 py-3 text-gray-400">{i + 1}</td>
                <td className="px-4 py-3 font-medium text-gray-800">{p.nombre}</td>
                <td className="px-4 py-3 text-gray-600">{p.posicion}</td>
                <td className="px-4 py-3 text-gray-600">{p.equipo}</td>
                <td className="px-4 py-3 text-gray-600">{p.dorsal}</td>
                {isAdmin && (
                  <td className="px-4 py-3 text-right space-x-2">
                    <button onClick={() => openEdit(p)} className="text-blue-600 hover:underline text-xs">Editar</button>
                    <button onClick={() => handleDelete(p.id)} className="text-red-600 hover:underline text-xs">Eliminar</button>
                  </td>
                )}
              </tr>
            ))}
            {players.length === 0 && (
              <tr><td colSpan={isAdmin ? 6 : 5} className="px-4 py-8 text-center text-gray-400">No hay jugadores registrados</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
