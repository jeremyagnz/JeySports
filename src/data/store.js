// Simple localStorage-backed data store

const defaultData = {
  jugadores: [
    { id: 1, nombre: 'Carlos Rodríguez', posicion: 'Pitcher', equipo: 'Leones', dorsal: 35 },
    { id: 2, nombre: 'Miguel Torres', posicion: 'Catcher', equipo: 'Águilas', dorsal: 12 },
    { id: 3, nombre: 'Juan Pérez', posicion: 'Primera Base', equipo: 'Leones', dorsal: 23 },
    { id: 4, nombre: 'Andrés Ruiz', posicion: 'Shortstop', equipo: 'Tigres', dorsal: 7 },
    { id: 5, nombre: 'Luis García', posicion: 'Jardinero Central', equipo: 'Lobos', dorsal: 14 },
    { id: 6, nombre: 'Roberto Sánchez', posicion: 'Segunda Base', equipo: 'Águilas', dorsal: 4 },
  ],
  equipos: [
    { id: 1, nombre: 'Leones', ciudad: 'Quito', fundacion: 2005, escudo: '🦁' },
    { id: 2, nombre: 'Águilas', ciudad: 'Guayaquil', fundacion: 2010, escudo: '🦅' },
    { id: 3, nombre: 'Tigres', ciudad: 'Cuenca', fundacion: 1998, escudo: '🐯' },
    { id: 4, nombre: 'Lobos', ciudad: 'Ambato', fundacion: 2015, escudo: '🐺' },
  ],
  partidos: [
    { id: 1, local: 'Leones', visitante: 'Águilas', fecha: '2026-03-15', hora: '15:00', estadio: 'Estadio Nacional', resultado: '' },
    { id: 2, local: 'Tigres', visitante: 'Lobos', fecha: '2026-03-16', hora: '17:00', estadio: 'Estadio del Sur', resultado: '' },
    { id: 3, local: 'Águilas', visitante: 'Tigres', fecha: '2026-03-22', hora: '16:00', estadio: 'Estadio Costa', resultado: '5-3' },
    { id: 4, local: 'Lobos', visitante: 'Leones', fecha: '2026-03-23', hora: '18:00', estadio: 'Estadio Norte', resultado: '1-7' },
  ],
  clasificacion: [
    { id: 1, equipo: 'Leones', j: 2, g: 2, p: 0, pct: '1.000', gb: '-', rf: 10, rc: 4 },
    { id: 2, equipo: 'Tigres', j: 1, g: 1, p: 0, pct: '1.000', gb: '0.5', rf: 5, rc: 3 },
    { id: 3, equipo: 'Águilas', j: 2, g: 1, p: 1, pct: '.500', gb: '1', rf: 8, rc: 8 },
    { id: 4, equipo: 'Lobos', j: 2, g: 0, p: 2, pct: '.000', gb: '2', rf: 4, rc: 12 },
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
