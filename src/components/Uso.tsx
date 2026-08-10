import { motion } from 'framer-motion'
import { sitio } from '../data/sitio'

interface Paso {
  n: string
  titulo: string
  texto: string
  icono: 'gotero' | 'vaso' | 'calendario' | 'masaje'
}

// La pauta es la misma para todas las tinturas, asi que vive aqui y no se
// repite en cada ficha.
const pasos: Paso[] = [
  {
    n: '01',
    titulo: 'Sublingual',
    texto: '5 a 10 gotas bajo la lengua, directo del gotero.',
    icono: 'gotero',
  },
  {
    n: '02',
    titulo: 'En agua',
    texto: 'O bien 15 a 20 gotas en medio vaso de agua.',
    icono: 'vaso',
  },
  {
    n: '03',
    titulo: 'Siete y siete',
    texto: 'Siete días seguidos, siete de pausa, y se retoma.',
    icono: 'calendario',
  },
  {
    n: '04',
    titulo: 'Uso externo',
    texto: 'Masajeando la cabeza para caspa y seborrea.',
    icono: 'masaje',
  },
]

export default function Uso({ activo }: { activo: boolean }) {
  return (
    <div className="flex h-full w-full flex-col justify-center gap-6 px-[6vw]">
      <div className="max-w-xl">
        <span className="versalita text-savia">Cómo se toma</span>
        <h2 className="mt-1 text-[clamp(1.6rem,3.4vw,2.8rem)] leading-tight text-tinta">
          Unas gotas,
          <br />
          con constancia
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
        {pasos.map((p, i) => (
          <motion.div
            key={p.n}
            initial={false}
            animate={{ opacity: activo ? 1 : 0, y: activo ? 0 : 16 }}
            transition={{
              duration: 0.6,
              delay: activo ? i * 0.09 : 0,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="vidrio flex flex-col gap-3 rounded-[24px] p-4 md:p-6"
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-2xl text-savia-claro">{p.n}</span>
              <Icono tipo={p.icono} />
            </div>
            <h3 className="text-[clamp(1rem,1.6vw,1.35rem)] leading-tight text-tinta">
              {p.titulo}
            </h3>
            <p className="text-[0.8rem] leading-snug text-tinta-suave">{p.texto}</p>
          </motion.div>
        ))}
      </div>

      <p className="max-w-2xl text-[0.78rem] leading-snug text-tierra">
        {sitio.advertencia}
      </p>
    </div>
  )
}

function Icono({ tipo }: { tipo: Paso['icono'] }) {
  const comun = {
    className: 'h-7 w-7',
    fill: 'none',
    stroke: 'var(--color-savia)',
    strokeWidth: 1.2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    viewBox: '0 0 32 32',
    'aria-hidden': true,
  }

  if (tipo === 'gotero')
    return (
      <svg {...comun}>
        <path d="M14 4 h4 v10 h-4 z" />
        <path d="M13 14 h6 v10 a3 3 0 0 1 -6 0 z" />
        <path d="M16 26 v3" />
        <circle cx="16" cy="30" r="1.4" />
      </svg>
    )

  if (tipo === 'vaso')
    return (
      <svg {...comun}>
        <path d="M9 6 h14 l-2 21 a2 2 0 0 1 -2 2 h-6 a2 2 0 0 1 -2 -2 z" />
        <path d="M10 16 c 3 2 9 -2 12 0" />
      </svg>
    )

  if (tipo === 'calendario')
    return (
      <svg {...comun}>
        <rect x="5" y="8" width="22" height="19" rx="3" />
        <path d="M5 14 h22 M11 5 v6 M21 5 v6" />
        <circle cx="12" cy="20" r="1.2" />
        <circle cx="20" cy="20" r="1.2" />
      </svg>
    )

  return (
    <svg {...comun}>
      <path d="M16 27 c -6 -4 -10 -8 -10 -13 a5 5 0 0 1 10 -2 a5 5 0 0 1 10 2 c0 5 -4 9 -10 13 z" />
    </svg>
  )
}
