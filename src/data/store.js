// Simple localStorage-backed data store

const defaultData = {
  jugadores: [
    { id: 1, nombre: 'Carlos López', posicion: 'Delantero', equipo: 'Leones FC', dorsal: 9 },
    { id: 2, nombre: 'Miguel Torres', posicion: 'Mediocampista', equipo: 'Águilas SC', dorsal: 8 },
    { id: 3, nombre: 'Juan Pérez', posicion: 'Defensa', equipo: 'Leones FC', dorsal: 4 },
    { id: 4, nombre: 'Andrés Ruiz', posicion: 'Portero', equipo: 'Tigres CF', dorsal: 1 },
  ],
  equipos: [
    { id: 1, nombre: 'Leones FC', ciudad: 'Quito', fundacion: 2005, escudo: '🦁' },
    { id: 2, nombre: 'Águilas SC', ciudad: 'Guayaquil', fundacion: 2010, escudo: '🦅' },
    { id: 3, nombre: 'Tigres CF', ciudad: 'Cuenca', fundacion: 1998, escudo: '🐯' },
    { id: 4, nombre: 'Lobos United', ciudad: 'Ambato', fundacion: 2015, escudo: '🐺' },
  ],
  partidos: [
    { id: 1, local: 'Leones FC', visitante: 'Águilas SC', fecha: '2026-03-15', hora: '15:00', estadio: 'Estadio Olímpico', resultado: '' },
    { id: 2, local: 'Tigres CF', visitante: 'Lobos United', fecha: '2026-03-16', hora: '17:00', estadio: 'Estadio Cuenca', resultado: '' },
    { id: 3, local: 'Águilas SC', visitante: 'Tigres CF', fecha: '2026-03-22', hora: '16:00', estadio: 'Estadio Monumental', resultado: '2-1' },
    { id: 4, local: 'Lobos United', visitante: 'Leones FC', fecha: '2026-03-23', hora: '18:00', estadio: 'Estadio Bellavista', resultado: '0-3' },
  ],
  clasificacion: [
    { id: 1, equipo: 'Leones FC', pj: 2, pg: 2, pe: 0, pp: 0, gf: 5, gc: 1, pts: 6 },
    { id: 2, equipo: 'Tigres CF', pj: 1, pg: 1, pe: 0, pp: 0, gf: 2, gc: 1, pts: 3 },
    { id: 3, equipo: 'Águilas SC', pj: 2, pg: 1, pe: 0, pp: 1, gf: 3, gc: 3, pts: 3 },
    { id: 4, equipo: 'Lobos United', pj: 2, pg: 0, pe: 0, pp: 2, gf: 1, gc: 6, pts: 0 },
  ],
}

function getStore(key) {
  try {
    const raw = localStorage.getItem(`jeysports_${key}`)
    if (raw) return JSON.parse(raw)
    localStorage.setItem(`jeysports_${key}`, JSON.stringify(defaultData[key]))
    return defaultData[key]
  } catch {
    return defaultData[key] || []
  }
}

function setStore(key, data) {
  localStorage.setItem(`jeysports_${key}`, JSON.stringify(data))
}

export function getAll(key) {
  return getStore(key)
}

export function add(key, item) {
  const data = getStore(key)
  const newItem = { ...item, id: Date.now() }
  const updated = [...data, newItem]
  setStore(key, updated)
  return updated
}

export function update(key, id, changes) {
  const data = getStore(key)
  const updated = data.map((item) => (item.id === id ? { ...item, ...changes } : item))
  setStore(key, updated)
  return updated
}

export function remove(key, id) {
  const data = getStore(key)
  const updated = data.filter((item) => item.id !== id)
  setStore(key, updated)
  return updated
}
