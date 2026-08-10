// Catalogo de productos.
//
// Para sustituir el arte generado por una foto real:
//   1. Guarda la imagen en `public/productos/` (ej. romero.jpg)
//   2. Agrega `foto: 'productos/romero.jpg'` al producto
// Mientras no exista `foto`, se dibuja la ilustracion botanica de `arte`.

export type Arte = 'ramas' | 'hoja' | 'flor' | 'gota' | 'raiz'
export type Familia = 'tonico' | 'tinte'

export interface Producto {
  id: string
  nombre: string
  planta: string
  familia: Familia
  esencia: string
  beneficios: [string, string, string]
  modoUso: string
  presentacion: string
  arte: Arte
  /** Par de colores del arte: [claro, profundo] */
  tono: [string, string]
  foto?: string
}

export const productos: Producto[] = [
  {
    id: 'tonico-romero',
    nombre: 'Tónico de Romero',
    planta: 'Rosmarinus officinalis',
    familia: 'tonico',
    esencia: 'Despierta el folículo y devuelve fuerza a la raíz.',
    beneficios: ['Estimula el crecimiento', 'Fortalece la fibra', 'Refresca el cuero cabelludo'],
    modoUso: 'Rocía sobre el cuero cabelludo seco y masajea. Sin enjuague, día por medio.',
    presentacion: 'Frasco 120 ml',
    arte: 'ramas',
    tono: ['#DCE8DA', '#4C7A5A'],
  },
  {
    id: 'tonico-ortiga',
    nombre: 'Tónico de Ortiga',
    planta: 'Urtica dioica',
    familia: 'tonico',
    esencia: 'Equilibra la grasa y sostiene el cabello que se cae.',
    beneficios: ['Reduce la caída', 'Controla el exceso de grasa', 'Aporta minerales'],
    modoUso: 'Aplica por secciones después del lavado. Masajea dos minutos.',
    presentacion: 'Frasco 120 ml',
    arte: 'hoja',
    tono: ['#DEE9D6', '#3F6B4E'],
  },
  {
    id: 'tonico-manzanilla',
    nombre: 'Tónico de Manzanilla',
    planta: 'Matricaria chamomilla',
    familia: 'tonico',
    esencia: 'Aclara con luz de sol y calma la piel sensible.',
    beneficios: ['Realza tonos claros', 'Calma la irritación', 'Suaviza al peinar'],
    modoUso: 'Rocía de medios a puntas y deja secar al aire, de preferencia con luz natural.',
    presentacion: 'Frasco 120 ml',
    arte: 'flor',
    tono: ['#FBF0D8', '#C8A24A'],
  },
  {
    id: 'tonico-calendula',
    nombre: 'Tónico de Caléndula',
    planta: 'Calendula officinalis',
    familia: 'tonico',
    esencia: 'Repara el cuero cabelludo que arde o descama.',
    beneficios: ['Alivia la resequedad', 'Reduce la descamación', 'Regenera la piel'],
    modoUso: 'Aplica directo en la zona sensible, sin enjuague, hasta tres veces por semana.',
    presentacion: 'Frasco 120 ml',
    arte: 'flor',
    tono: ['#FBE6D2', '#D08A3E'],
  },
  {
    id: 'tonico-sabila',
    nombre: 'Tónico de Sábila',
    planta: 'Aloe vera',
    familia: 'tonico',
    esencia: 'Hidratación ligera que no apelmaza el rizo.',
    beneficios: ['Hidrata sin peso', 'Define la onda', 'Sella la cutícula'],
    modoUso: 'Sobre cabello húmedo, de medios a puntas. Peina y deja secar.',
    presentacion: 'Frasco 150 ml',
    arte: 'gota',
    tono: ['#DCEDE4', '#3E8168'],
  },
  {
    id: 'tinte-nogal',
    nombre: 'Tinte de Nogal',
    planta: 'Juglans regia',
    familia: 'tinte',
    esencia: 'Castaño profundo, sin amoniaco ni oxidantes.',
    beneficios: ['Cubre canas gradualmente', 'Tono castaño cálido', 'No reseca la fibra'],
    modoUso: 'Mezcla con agua tibia hasta formar pasta. Deja actuar 60 minutos y enjuaga.',
    presentacion: 'Polvo 100 g',
    arte: 'raiz',
    tono: ['#EADDCB', '#7A5233'],
  },
  {
    id: 'tinte-henna',
    nombre: 'Tinte de Henna',
    planta: 'Lawsonia inermis',
    familia: 'tinte',
    esencia: 'Cobrizo vivo que además engrosa el cabello.',
    beneficios: ['Tono cobrizo intenso', 'Da cuerpo y brillo', 'Cubre canas'],
    modoUso: 'Pasta con agua tibia y limón. Reposa 4 horas antes de aplicar. Actúa 90 minutos.',
    presentacion: 'Polvo 100 g',
    arte: 'hoja',
    tono: ['#F3DFC9', '#A6552C'],
  },
  {
    id: 'tinte-indigo',
    nombre: 'Tinte de Índigo',
    planta: 'Indigofera tinctoria',
    familia: 'tinte',
    esencia: 'Negro azulado que se aplica después de la henna.',
    beneficios: ['Oscurece sin químicos', 'Tono negro azulado', 'Compatible con henna'],
    modoUso: 'Aplica sobre cabello ya tratado con henna. Deja actuar 60 minutos.',
    presentacion: 'Polvo 100 g',
    arte: 'raiz',
    tono: ['#DEE2EC', '#3D4B6B'],
  },
  {
    id: 'tonico-lavanda',
    nombre: 'Tónico de Lavanda',
    planta: 'Lavandula angustifolia',
    familia: 'tonico',
    esencia: 'Aroma que baja el ritmo al final del día.',
    beneficios: ['Relaja el cuero cabelludo', 'Aroma prolongado', 'Equilibra el pH'],
    modoUso: 'Rocía antes de dormir y masajea con las yemas de los dedos.',
    presentacion: 'Frasco 120 ml',
    arte: 'ramas',
    tono: ['#E7E2F0', '#6C5E93'],
  },
]
