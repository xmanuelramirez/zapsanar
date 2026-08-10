import type { Familia } from './productos'

/** Nombre en singular de cada familia, para la etiqueta de la tarjeta y la ficha. */
export const ETIQUETAS: Record<Familia, string> = {
  tintura: 'Tintura madre',
  aceite: 'Aceite',
  cuidado: 'Cuidado',
}

export type Filtro = 'todos' | Familia

/** Nombre en plural, para los filtros del catalogo. */
export const FILTROS: Record<Filtro, string> = {
  todos: 'Todo',
  tintura: 'Tinturas',
  aceite: 'Aceites',
  cuidado: 'Cuidado',
}
