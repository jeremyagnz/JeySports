import { useState } from 'react'
import { useAuth } from '../auth/AuthContext'
import { getAll, add, update, remove } from '../data/store'

const EMPTY_FORM = { equipo: '', pj: 0, pg: 0, pe: 0, pp: 0, gf: 0, gc: 0, pts: 0 }
const NUM_FIELDS = ['pj', 'pg', 'pe', 'pp', 'gf', 'gc', 'pts']

export default function Standings() {
  const { isAdmin } = useAuth()
  const [rows, setRows] = useState(() => getAll('clasificacion'))
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [showForm, setShowForm] = useState(false)

  const sorted = [...rows].sort((a, b) => b.pts - a.pts || b.gf - b.gc - (a.gf - a.gc))

  const openNew = () => {
    setEditing(null)
    setForm(EMPTY_FORM)
    setShowForm(true)
  }

  const openEdit = (row) => {
    setEditing(row.id)
    setForm({ equipo: row.equipo, pj: row.pj, pg: row.pg, pe: row.pe, pp: row.pp, gf: row.gf, gc: row.gc, pts: row.pts })
    setShowForm(true)
  }

  const handleSave = (e) => {
    e.preventDefault()
    const payload = { ...form }
    NUM_FIELDS.forEach((f) => { payload[f] = Number(payload[f]) })
    if (editing) {
      setRows(update('clasificacion', editing, payload))
    } else {
      setRows(add('clasificacion', payload))
    }
    setShowForm(false)
  }

  const handleDelete = (id) => {
    if (confirm('¿Eliminar esta fila?')) {
      setRows(remove('clasificacion', id))
    }
  }

  const COLS = [
    { key: 'pj', label: 'PJ' },
    { key: 'pg', label: 'PG' },
    { key: 'pe', label: 'PE' },
    { key: 'pp', label: 'PP' },
    { key: 'gf', label: 'GF' },
    { key: 'gc', label: 'GC' },
    { key: 'pts', label: 'Pts' },
  ]

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">🏆 Clasificación</h1>
        {isAdmin && (
          <button
            onClick={openNew}
            className="bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold px-4 py-2 rounded-lg"
          >
            + Añadir Fila
          </button>
        )}
      </div>

      {showForm && isAdmin && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
          <h2 className="font-semibold text-blue-800 mb-4">{editing ? 'Editar Fila' : 'Nueva Fila'}</h2>
          <form onSubmit={handleSave} className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="col-span-2 sm:col-span-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Equipo</label>
              <input
                required
                value={form.equipo}
                onChange={(e) => setForm({ ...form, equipo: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />
            </div>
            {NUM_FIELDS.map((f) => (
              <div key={f}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{f.toUpperCase()}</label>
                <input
                  type="number"
                  min="0"
                  value={form[f]}
                  onChange={(e) => setForm({ ...form, [f]: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                />
              </div>
            ))}
            <div className="col-span-2 sm:col-span-4 flex gap-3">
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
          <thead className="bg-blue-800 text-white">
            <tr>
              <th className="px-4 py-3 text-left">#</th>
              <th className="px-4 py-3 text-left">Equipo</th>
              {COLS.map(({ key, label }) => (
                <th key={key} className="px-3 py-3 text-center">{label}</th>
              ))}
              {isAdmin && <th className="px-4 py-3 text-right">Acciones</th>}
            </tr>
          </thead>
          <tbody>
            {sorted.map((row, i) => (
              <tr key={row.id} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-4 py-3 text-gray-400 font-medium">{i + 1}</td>
                <td className="px-4 py-3 font-medium text-gray-800">{row.equipo}</td>
                {COLS.map(({ key }) => (
                  <td key={key} className={`px-3 py-3 text-center ${key === 'pts' ? 'font-bold text-blue-700' : 'text-gray-600'}`}>
                    {row[key]}
                  </td>
                ))}
                {isAdmin && (
                  <td className="px-4 py-3 text-right space-x-2">
                    <button onClick={() => openEdit(row)} className="text-blue-600 hover:underline text-xs">Editar</button>
                    <button onClick={() => handleDelete(row.id)} className="text-red-600 hover:underline text-xs">Eliminar</button>
                  </td>
                )}
              </tr>
            ))}
            {rows.length === 0 && (
              <tr><td colSpan={isAdmin ? 10 : 9} className="px-4 py-8 text-center text-gray-400">No hay datos de clasificación</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
