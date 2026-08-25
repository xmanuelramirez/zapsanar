import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Taller from './Taller'

interface Props {
  /** Par [claro, profundo] del contexto activo: la planta abierta o el modulo */
  tono: [string, string]
  /** Foto del contexto activo. Se usa desenfocada como masa de color del fondo */
  foto: string
}

// Motas de polen. Posicion y ritmo fijos: si fueran aleatorias cambiarian en
// cada render y el fondo nunca se sentiria el mismo lugar.
const POLEN = [
  { x: 14, y: 26, d: 5, dur: 26 },
  { x: 31, y: 68, d: 3, dur: 34 },
  { x: 52, y: 18, d: 4, dur: 30 },
  { x: 68, y: 74, d: 6, dur: 38 },
  { x: 83, y: 38, d: 3, dur: 28 },
  { x: 92, y: 62, d: 4, dur: 44 },
]

const MASCARA = 'radial-gradient(circle, #000 0%, transparent 70%)'

/**
 * Atmosfera del lienzo. Lo que llena la pantalla es la propia planta ampliada y
 * desenfocada: una masa organica de su color, no una mancha inventada. Encima
 * van las auroras del tono y el grano. Todo queda muy por debajo del contenido.
 */
export default function Fondo({ tono, foto }: Props) {
  const [claro, hondo] = tono
  const quieto = useReducedMotion() ?? false

  // El color tarda mas que el carrusel a proposito: el fondo acompana, no salta.
  const tinte = { duration: 1.4, ease: 'easeInOut' } as const

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Planta gigante y desenfocada. Es una sola capa estatica: se rasteriza
          una vez y no se vuelve a tocar hasta que cambia de producto. */}
      <AnimatePresence mode="popLayout">
        <motion.img
          key={foto}
          src={`${import.meta.env.BASE_URL}${foto}`}
          alt=""
          aria-hidden="true"
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 0.26, scale: 1 }}
          // Sale mas rapido de lo que entra: al recorrer el catalogo con las
          // flechas se apilarian varias capas desenfocadas, que es cara.
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="absolute -right-[16vw] top-1/2 h-[105vh] w-auto max-w-none -translate-y-1/2"
          style={{ filter: 'blur(42px) saturate(135%)', willChange: 'opacity' }}
        />
      </AnimatePresence>

      {/* Mancha calida de base, siempre presente */}
      <motion.div
        className="absolute -left-[20vw] -top-[24vh] h-[78vh] w-[78vh] rounded-full"
        style={{
          background:
            'radial-gradient(circle, color-mix(in srgb, var(--color-crema-2) 96%, transparent) 0%, transparent 66%)',
        }}
        animate={quieto ? {} : { x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ duration: 34, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Aurora del tono claro de la planta */}
      <motion.div
        className="absolute -bottom-[26vh] -left-[10vw] h-[86vh] w-[86vh] rounded-full opacity-80"
        style={{ maskImage: MASCARA, WebkitMaskImage: MASCARA }}
        animate={
          quieto
            ? { backgroundColor: claro }
            : { backgroundColor: claro, x: [0, 30, 0], y: [0, -20, 0] }
        }
        transition={{
          backgroundColor: tinte,
          x: { duration: 42, repeat: Infinity, ease: 'easeInOut' },
          y: { duration: 42, repeat: Infinity, ease: 'easeInOut' },
        }}
      />

      {/* Eco del tono profundo, diluido, para que el color tenga fondo */}
      <motion.div
        className="absolute left-[34vw] top-[44vh] h-[60vh] w-[60vh] rounded-full opacity-[0.2]"
        style={{ maskImage: MASCARA, WebkitMaskImage: MASCARA }}
        animate={
          quieto
            ? { backgroundColor: hondo }
            : { backgroundColor: hondo, x: [0, 24, 0], y: [0, -28, 0] }
        }
        transition={{
          backgroundColor: tinte,
          x: { duration: 50, repeat: Infinity, ease: 'easeInOut' },
          y: { duration: 50, repeat: Infinity, ease: 'easeInOut' },
        }}
      />

      {!quieto &&
        POLEN.map((p) => (
          <motion.span
            key={`${p.x}-${p.y}`}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              height: p.d,
              width: p.d,
              background: 'color-mix(in srgb, var(--color-savia) 34%, transparent)',
            }}
            animate={{ y: [0, -70, 0], x: [0, 22, 0], opacity: [0, 0.75, 0] }}
            transition={{ duration: p.dur, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}

      <Taller />

      <div className="grano absolute inset-0" />
    </div>
  )
}
