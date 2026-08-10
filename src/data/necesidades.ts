// El catalogo se filtra por lo que le pasa a quien compra, no por como se
// fabrica. La familia (tintura, aceite, cuidado) sigue visible en cada tarjeta.
//
// Regla al asignar: una necesidad solo se marca si se lee en alguno de los tres
// beneficios del producto. Si no, el filtro parece arbitrario.

export type Necesidad =
  | 'mente'
  | 'digestion'
  | 'dolor'
  | 'piel'
  | 'cabello'
  | 'defensas'

export type Filtro = 'todos' | Necesidad

export const NECESIDADES: Record<Filtro, string> = {
  todos: 'Todo',
  mente: 'Mente',
  digestion: 'Digestión',
  dolor: 'Dolor',
  piel: 'Piel',
  cabello: 'Cabello',
  defensas: 'Defensas',
}

/** Frase que acompana al filtro activo, para que la seleccion se explique sola. */
export const DESCRIPCIONES: Record<Filtro, string> = {
  todos: 'Todo lo que prepara Zapsanar',
  mente: 'Concentración, estrés, ansiedad y sueño',
  digestion: 'Digestión pesada, gases, cólicos y parásitos',
  dolor: 'Dolor muscular, articular, de cabeza y menstrual',
  piel: 'Heridas, irritaciones, resequedad y arrugas',
  cabello: 'Caída, grasa y cuero cabelludo sensible',
  defensas: 'Vías respiratorias, minerales y depuración',
}
