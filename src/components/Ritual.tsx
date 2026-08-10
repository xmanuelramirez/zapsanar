import { motion } from 'framer-motion'

interface Paso {
  n: string
  titulo: string
  texto: string
  icono: 'cosecha' | 'macerado' | 'frasco' | 'ritual'
}

const pasos: Paso[] = [
  {
    n: '01',
    titulo: 'Cosecha',
    texto: 'Planta fresca, cortada en su punto y secada a la sombra.',
    icono: 'cosecha',
  },
  {
    n: '02',
    titulo: 'Macerado',
    texto: 'Semanas en reposo para que la planta suelte lo suyo, sin calor.',
    icono: 'macerado',
  },
  {
    n: '03',
    titulo: 'Envasado',
    texto: 'Lotes pequeños en vidrio ámbar, sin conservadores agresivos.',
    icono: 'frasco',
  },
  {
    n: '04',
    titulo: 'Tu ritual',
    texto: 'Unas gotas, masaje lento y constancia. El resto lo hace la planta.',
    icono: 'ritual',
  },
]

export default function Ritual({ activo }: { activo: boolean }) {
  return (
    <div className="flex h-full w-full flex-col justify-center gap-7 px-[6vw]">
      <div className="max-w-xl">
        <span className="versalita text-savia">El proceso</span>
        <h2 className="mt-1 text-[clamp(1.6rem,3.4vw,2.8rem)] leading-tight text-tinta">
          De la mata al frasco,
          <br />
          sin atajos
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

  if (tipo === 'cosecha')
    return (
      <svg {...comun}>
        <path d="M16 28 C 16 18, 20 10, 27 6 C 28 15, 23 24, 16 28 Z" />
        <path d="M16 28 C 15 21, 11 15, 5 12" />
      </svg>
    )

  if (tipo === 'macerado')
    return (
      <svg {...comun}>
        <path d="M9 5 h14 v4 l-4 5 v13 a2 2 0 0 1 -2 2 h-2 a2 2 0 0 1 -2 -2 v-13 l-4 -5 z" />
        <path d="M11 20 h10" />
        <circle cx="14" cy="24" r="1" />
        <circle cx="18" cy="22" r="1" />
      </svg>
    )

  if (tipo === 'frasco')
    return (
      <svg {...comun}>
        <path d="M13 4 h6 v4 c0 2 4 3 4 8 v12 a2 2 0 0 1 -2 2 h-10 a2 2 0 0 1 -2 -2 v-12 c0 -5 4 -6 4 -8 z" />
        <path d="M11 18 h10" />
      </svg>
    )

  return (
    <svg {...comun}>
      <circle cx="16" cy="16" r="11" />
      <path d="M16 8 v8 l5 3" />
    </svg>
  )
}
