import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import FotoProducto from './FotoProducto'
import Insignias from './Insignias'
import type { Producto } from '../data/productos'
import { ETIQUETAS } from '../data/familias'
import { enlaceWhatsapp, sitio } from '../data/sitio'

interface Props {
  producto: Producto
  onCerrar: () => void
  onAnterior: () => void
  onSiguiente: () => void
}

const suave = { duration: 0.55, ease: [0.22, 1, 0.36, 1] } as const

// El texto entra en cascada detras de la planta. Asi se lee en orden en vez de
// caer todo junto, que es lo que hacia que la ficha se sintiera un volante.
const columna: Variants = {
  oculto: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.14 } },
}

const linea: Variants = {
  oculto: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: suave },
}

export default function FichaProducto({
  producto,
  onCerrar,
  onAnterior,
  onSiguiente,
}: Props) {
  const [claro, hondo] = producto.tono

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="absolute inset-0 z-30 flex items-center justify-center px-[3vw] md:px-[4vw]"
      style={{
        background: 'color-mix(in srgb, #ffffff 70%, transparent)',
        backdropFilter: 'blur(8px)',
      }}
      onClick={onCerrar}
    >
      <motion.article
        initial={{ opacity: 0, y: 26, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 14, scale: 0.98 }}
        transition={suave}
        onPanEnd={(_, info) => {
          if (info.offset.x < -70) onSiguiente()
          if (info.offset.x > 70) onAnterior()
        }}
        // El clic dentro no debe cerrar: solo el velo de atras cierra.
        onClick={(e) => e.stopPropagation()}
        className="vidrio-hondo relative grid h-[92dvh] w-full max-w-6xl grid-rows-[minmax(0,0.76fr)_minmax(0,1.24fr)] overflow-hidden rounded-[28px] md:h-[76dvh] md:grid-cols-[0.95fr_1.05fr] md:grid-rows-1 md:rounded-[32px]"
      >
        {/* Resplandor del color de la planta detras de la foto */}
        <div
          className="pointer-events-none absolute -left-[10%] -top-[20%] aspect-square w-[70%] rounded-full md:w-[45%]"
          style={{ background: `radial-gradient(circle, ${claro} 0%, ${claro}00 70%)` }}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.88, rotate: -3 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="relative min-h-0"
        >
          <FotoProducto
            foto={producto.foto}
            tono={producto.tono}
            alt={producto.nombre}
            flotando
            className="h-full w-full p-3 md:p-6"
          />
        </motion.div>

        {/* Cara de texto. En movil se deja desplazar por dentro: la ficha
            completa no cabe en un telefono sin encoger la letra al limite. El
            lienzo de la pagina sigue sin scroll. */}
        <motion.div
          variants={columna}
          initial="oculto"
          animate="visible"
          className="relative flex min-h-0 flex-col justify-start gap-2.5 overflow-y-auto p-5 md:justify-center md:gap-4 md:overflow-visible md:p-9"
        >
          <motion.div variants={linea}>
            <span className="versalita text-savia">{ETIQUETAS[producto.familia]}</span>
            <h2 className="mt-1.5 text-[clamp(1.7rem,3vw,2.7rem)] leading-tight text-tinta">
              {producto.nombre}
            </h2>
            <p className="mt-1 text-[clamp(0.92rem,1.3vw,1.1rem)] text-tinta-suave">
              {producto.esencia}
            </p>
          </motion.div>

          <motion.div variants={linea}>
            <Insignias necesidades={producto.necesidades} />
          </motion.div>

          <motion.ul variants={columna} className="flex flex-col gap-2">
            {producto.beneficios.map((b) => (
              <motion.li
                key={b}
                variants={linea}
                className="flex items-center gap-3 text-sm text-tinta"
              >
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: hondo }}
                />
                {b}
              </motion.li>
            ))}
          </motion.ul>

          <motion.div variants={linea} className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Dato titulo="Cómo se usa" cuerpo={producto.aplicacion} />
            {producto.presentacion && (
              <Dato titulo="Presentación" cuerpo={producto.presentacion} />
            )}
          </motion.div>

          {producto.oral && (
            <motion.p
              variants={linea}
              className="text-[0.72rem] leading-snug text-tierra"
            >
              {sitio.advertencia}
            </motion.p>
          )}

          <motion.div variants={linea} className="pie-pegado mt-auto md:mt-1">
            <a
              href={enlaceWhatsapp(producto.nombre)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-savia px-7 py-3.5 text-sm tracking-wide text-white transition-colors duration-300 hover:bg-savia-hondo md:w-fit"
            >
              Pedir por WhatsApp
            </a>
          </motion.div>
        </motion.div>

        {/* Controles */}
        <button
          onClick={onCerrar}
          aria-label="Cerrar ficha"
          className="vidrio absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full text-tinta-suave transition-colors duration-300 hover:text-savia md:right-4 md:top-4"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M5 5 L19 19 M19 5 L5 19" strokeLinecap="round" />
          </svg>
        </button>

        <FlechaFicha lado="izq" onClick={onAnterior} />
        <FlechaFicha lado="der" onClick={onSiguiente} />
      </motion.article>
    </motion.div>
  )
}

function Dato({ titulo, cuerpo }: { titulo: string; cuerpo: string }) {
  return (
    <div className="rounded-2xl border border-arena/60 bg-white/55 p-3">
      <div className="versalita text-tinta-suave">{titulo}</div>
      <p className="mt-1.5 text-[0.82rem] leading-snug text-tinta">{cuerpo}</p>
    </div>
  )
}

function FlechaFicha({ lado, onClick }: { lado: 'izq' | 'der'; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={lado === 'izq' ? 'Producto anterior' : 'Producto siguiente'}
      className={`vidrio absolute top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-tinta-suave transition-colors duration-300 hover:text-savia md:flex ${
        lado === 'izq' ? 'left-3' : 'right-3'
      }`}
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d={lado === 'izq' ? 'M15 5 L8 12 L15 19' : 'M9 5 L16 12 L9 19'} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  )
}
