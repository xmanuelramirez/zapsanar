// Catalogo de Zapsanar. Los datos salen del catalogo en PDF de la marca.
//
// Para agregar un producto: pon su PNG en `public/productos/` y agrega una
// entrada aqui. La foto es obligatoria; conviene que sea un recorte con fondo
// transparente para que flote igual que las demas.

import type { Necesidad } from './necesidades'

export type Familia = 'tintura' | 'aceite' | 'cuidado'

export interface Producto {
  id: string
  nombre: string
  /** Subtitulo del catalogo: define al producto en dos o tres palabras */
  esencia: string
  familia: Familia
  /** Para que se busca. Cada una tiene que leerse en los beneficios */
  necesidades: Necesidad[]
  /** Exactamente tres, cada uno de una linea */
  beneficios: [string, string, string]
  /** Una sola frase */
  aplicacion: string
  /** Se toma por via oral: activa la advertencia de embarazo y lactancia */
  oral: boolean
  foto: string
  presentacion?: string
  /** Par de colores del halo detras de la foto: [claro, profundo] */
  tono: [string, string]
}

export const productos: Producto[] = [
  {
    id: 'tintura-romero',
    nombre: 'Tintura de Romero',
    esencia: 'Oxigenador cerebral',
    familia: 'tintura',
    necesidades: ['mente', 'defensas', 'cabello'],
    beneficios: [
      'Potencia la memoria y la concentración',
      'Mejora la circulación sanguínea',
      'Reduce el estrés y la fatiga mental',
    ],
    aplicacion: '5 a 10 gotas sublinguales, siete días seguidos.',
    oral: true,
    foto: 'productos/romero.png',
    presentacion: 'Frasco de vidrio 30 ml',
    tono: ['#DCE8DA', '#4C7A5A'],
  },
  {
    id: 'tintura-manzanilla',
    nombre: 'Tintura de Manzanilla',
    esencia: 'Calmante y antiespasmódica',
    familia: 'tintura',
    necesidades: ['mente', 'digestion', 'dolor'],
    beneficios: [
      'Alivia la digestión pesada',
      'Calma dolores menstruales',
      'Favorece un sueño reparador',
    ],
    aplicacion: '5 a 10 gotas sublinguales, siete días seguidos.',
    oral: true,
    foto: 'productos/manzanilla.png',
    presentacion: 'Frasco de vidrio 30 ml',
    tono: ['#FBF0D8', '#C8A24A'],
  },
  {
    id: 'tintura-valeriana',
    nombre: 'Tintura de Valeriana',
    esencia: 'Relajante natural',
    familia: 'tintura',
    necesidades: ['mente', 'dolor'],
    beneficios: [
      'Induce un sueño profundo',
      'Reduce la ansiedad y las palpitaciones',
      'Relaja los músculos y calma calambres',
    ],
    aplicacion: '5 a 10 gotas sublinguales antes de dormir.',
    oral: true,
    foto: 'productos/valeriana.png',
    presentacion: 'Frasco de vidrio 30 ml',
    tono: ['#EFE7F0', '#8E7BA6'],
  },
  {
    id: 'tintura-calendula',
    nombre: 'Tintura de Caléndula',
    esencia: 'Cicatrizante',
    familia: 'tintura',
    necesidades: ['piel', 'digestion', 'dolor'],
    beneficios: [
      'Desinflama irritaciones de la piel',
      'Ayuda con la acidez y la indigestión',
      'Alivia y regula el dolor menstrual',
    ],
    aplicacion: '5 a 10 gotas sublinguales, o diluida para gárgaras.',
    oral: true,
    foto: 'productos/calendula.png',
    presentacion: 'Frasco de vidrio 30 ml',
    tono: ['#FBE6D2', '#D08A3E'],
  },
  {
    id: 'tintura-ruda',
    nombre: 'Tintura de Ruda',
    esencia: 'Antiespasmódica',
    familia: 'tintura',
    necesidades: ['digestion', 'dolor', 'mente'],
    beneficios: [
      'Reduce espasmos y cólicos abdominales',
      'Regula el ciclo menstrual',
      'Mejora la digestión y los gases',
    ],
    aplicacion: '5 a 10 gotas sublinguales, siete días seguidos.',
    oral: true,
    foto: 'productos/ruda.png',
    presentacion: 'Frasco de vidrio 30 ml',
    tono: ['#EDF0D4', '#8A9A3C'],
  },
  {
    id: 'tintura-menta',
    nombre: 'Tintura de Menta',
    esencia: 'Analgésica y antiinflamatoria',
    familia: 'tintura',
    necesidades: ['dolor', 'digestion', 'defensas'],
    beneficios: [
      'Calma náuseas, gases y espasmos',
      'Descongestiona las vías respiratorias',
      'Alivia el dolor de cabeza',
    ],
    aplicacion: '5 a 10 gotas sublinguales, siete días seguidos.',
    oral: true,
    foto: 'productos/menta.png',
    presentacion: 'Frasco de vidrio 30 ml',
    tono: ['#DCEDE4', '#3E8168'],
  },
  {
    id: 'tintura-ortiga',
    nombre: 'Tintura de Ortiga',
    esencia: 'Antiinflamatoria y nutricional',
    familia: 'tintura',
    necesidades: ['defensas', 'cabello', 'dolor'],
    beneficios: [
      'Purifica la sangre y aporta minerales',
      'Diurética, protege hígado y riñón',
      'Frena la caída del cabello y la caspa',
    ],
    aplicacion: '5 a 10 gotas sublinguales, siete días seguidos.',
    oral: true,
    foto: 'productos/ortiga.png',
    presentacion: 'Frasco de vidrio 30 ml',
    tono: ['#DEE9D6', '#3F6B4E'],
  },
  {
    id: 'tintura-cola-de-caballo',
    nombre: 'Tintura de Cola de Caballo',
    esencia: 'Remineralizante y diurética',
    familia: 'tintura',
    necesidades: ['defensas', 'cabello', 'dolor'],
    beneficios: [
      'Diurética, apoya en infecciones urinarias',
      'Remineraliza huesos, uñas y cabello',
      'Libera el exceso de ácido úrico',
    ],
    aplicacion: '5 a 10 gotas sublinguales, siete días seguidos.',
    oral: true,
    foto: 'productos/cola-de-caballo.png',
    presentacion: 'Frasco de vidrio 30 ml',
    tono: ['#DDEBDD', '#4F8464'],
  },
  {
    id: 'tintura-semilla-papaya',
    nombre: 'Tintura de Semilla de Papaya',
    esencia: 'Desparasitante',
    familia: 'tintura',
    necesidades: ['digestion', 'defensas'],
    beneficios: [
      'Elimina lombrices intestinales',
      'La papaína ayuda a digerir proteínas',
      'Alivia gases y cólicos',
    ],
    aplicacion: '20 a 30 gotas en agua, 30 minutos antes de comer.',
    oral: true,
    foto: 'productos/papaya.png',
    presentacion: 'Frasco de vidrio 30 ml',
    tono: ['#FCE3CD', '#DE7F3A'],
  },
  {
    id: 'aceite-zanadol',
    nombre: 'Aceite Zanadol',
    esencia: 'Antiespasmódico',
    familia: 'aceite',
    necesidades: ['dolor', 'mente'],
    beneficios: [
      'Alivia dolor de espalda, cuello y músculos',
      'Estimula la circulación',
      'Desinflama dolores reumáticos y articulares',
    ],
    aplicacion: 'Masajear la zona adolorida hasta absorber.',
    oral: false,
    foto: 'productos/zanadol.png',
    tono: ['#E3EAD9', '#5C7D45'],
  },
  {
    id: 'aceite-oregano',
    nombre: 'Aceite de Orégano',
    esencia: 'Antimicrobiano',
    familia: 'aceite',
    necesidades: ['defensas'],
    beneficios: [
      'Combate bacterias y hongos',
      'Descongestiona las vías respiratorias',
      'Antioxidante y antiinflamatorio',
    ],
    aplicacion: '5 a 10 gotas sublinguales, siete días seguidos.',
    oral: true,
    foto: 'productos/oregano.png',
    tono: ['#E4EDDA', '#57793F'],
  },
  {
    id: 'aceite-antiedad',
    nombre: 'Aceite Antiedad',
    esencia: 'A base de resveratrol',
    familia: 'aceite',
    necesidades: ['piel'],
    beneficios: [
      'Antioxidante, previene arrugas',
      'Mejora la elasticidad de la piel',
      'Ligero, no tapa los poros',
    ],
    aplicacion: 'Unas gotas sobre el rostro limpio, de noche.',
    oral: false,
    foto: 'productos/antiedad.png',
    tono: ['#F2E4D6', '#9B6B4A'],
  },
  {
    id: 'crema-calendula',
    nombre: 'Crema de Caléndula',
    esencia: 'Cicatrizante',
    familia: 'cuidado',
    necesidades: ['piel', 'dolor'],
    beneficios: [
      'Cierra heridas, raspones y úlceras',
      'Calma quemaduras, golpes y picaduras',
      'Hidrata la piel seca y sensible',
    ],
    aplicacion: 'Aplicar en la zona afectada dos veces al día.',
    oral: false,
    foto: 'productos/calendula.png',
    tono: ['#FBE6D2', '#D08A3E'],
  },
  {
    id: 'shampoo-natural',
    nombre: 'Shampoo Natural',
    esencia: 'Cabello saludable',
    familia: 'cuidado',
    necesidades: ['cabello'],
    beneficios: [
      'Equilibra el cuero cabelludo',
      'Libre de químicos agresivos',
      'Ideal para cuero cabelludo sensible',
    ],
    aplicacion: 'Masajear el cuero cabelludo y enjuagar.',
    oral: false,
    foto: 'productos/cabello.png',
    tono: ['#DEE9DC', '#4C7A5A'],
  },
  {
    id: 'tonico-natural',
    nombre: 'Tónico Natural',
    esencia: 'Fuerza desde la raíz',
    familia: 'cuidado',
    necesidades: ['cabello', 'piel'],
    beneficios: [
      'Estimula el crecimiento del cabello',
      'Controla la grasa del cuero cabelludo',
      'Previene la caída y da grosor',
    ],
    aplicacion: 'Aplicar en el cuero cabelludo, sin enjuagar.',
    oral: false,
    foto: 'productos/cabello.png',
    tono: ['#E6EEDF', '#5F8A5F'],
  },
]
