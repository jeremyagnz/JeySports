import { useState } from 'react'
import { useAuth } from '../auth/AuthContext'
import { getAll, add, update, remove } from '../data/store'

const EMPTY_FORM = { equipo: '', j: 0, g: 0, p: 0, pct: '.000', gb: '-', rf: 0, rc: 0 }
const NUM_FIELDS = ['j', 'g', 'p', 'rf', 'rc']

export default function Standings() {
  const { isAdmin } = useAuth()
  const [rows, setRows] = useState(() => getAll('clasificacion'))
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [showForm, setShowForm] = useState(false)

  const sorted = [...rows].sort((a, b) => Number(b.g) - Number(a.g) || (Number(b.rf) - Number(b.rc)) - (Number(a.rf) - Number(a.rc)))

  const openNew = () => {
    setEditing(null)
    setForm(EMPTY_FORM)
    setShowForm(true)
  }

  const openEdit = (row) => {
    setEditing(row.id)
    setForm({ equipo: row.equipo, j: row.j, g: row.g, p: row.p, pct: row.pct, gb: row.gb, rf: row.rf, rc: row.rc })
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
    { key: 'j', label: 'J', title: 'Juegos Jugados' },
    { key: 'g', label: 'G', title: 'Ganados' },
    { key: 'p', label: 'P', title: 'Perdidos' },
    { key: 'pct', label: 'PCT', title: 'Porcentaje' },
    { key: 'gb', label: 'GB', title: 'Juegos Detrás' },
    { key: 'rf', label: 'RF', title: 'Carreras a Favor' },
    { key: 'rc', label: 'RC', title: 'Carreras en Contra' },
  ]

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">🏆 Tabla de Posiciones</h1>
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">PCT</label>
              <input
                value={form.pct}
                placeholder=".500"
                onChange={(e) => setForm({ ...form, pct: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">GB</label>
              <input
                value={form.gb}
                placeholder="- ó 1.5"
                onChange={(e) => setForm({ ...form, gb: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />
            </div>
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
          <thead className="bg-blue-900 text-white">
            <tr>
              <th className="px-4 py-3 text-left">#</th>
              <th className="px-4 py-3 text-left">Equipo</th>
              {COLS.map(({ key, label, title }) => (
                <th key={key} className="px-3 py-3 text-center" title={title}>{label}</th>
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
                  <td key={key} className={`px-3 py-3 text-center ${key === 'pct' ? 'font-bold text-blue-700' : 'text-gray-600'}`}>
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
              <tr><td colSpan={isAdmin ? 10 : 9} className="px-4 py-8 text-center text-gray-400">No hay datos de posiciones</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-xs text-gray-400 flex flex-wrap gap-x-4 gap-y-1">
        <span><strong>J</strong> = Juegos Jugados</span>
        <span><strong>G</strong> = Ganados</span>
        <span><strong>P</strong> = Perdidos</span>
        <span><strong>PCT</strong> = Porcentaje</span>
        <span><strong>GB</strong> = Juegos Detrás</span>
        <span><strong>RF</strong> = Carreras a Favor</span>
        <span><strong>RC</strong> = Carreras en Contra</span>
      </div>
    </div>
  )
}
