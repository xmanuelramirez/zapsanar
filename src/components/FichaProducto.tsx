import { motion } from 'framer-motion'
import ArteBotanico from './ArteBotanico'
import type { Producto } from '../data/productos'
import { enlaceWhatsapp } from '../data/sitio'

interface Props {
  producto: Producto
  onCerrar: () => void
  onAnterior: () => void
  onSiguiente: () => void
}

const suave = { duration: 0.55, ease: [0.22, 1, 0.36, 1] } as const

export default function FichaProducto({
  producto,
  onCerrar,
  onAnterior,
  onSiguiente,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="absolute inset-0 z-30 flex items-center justify-center px-[4vw]"
      style={{ background: 'color-mix(in srgb, #ffffff 72%, transparent)', backdropFilter: 'blur(6px)' }}
    >
      <motion.article
        initial={{ opacity: 0, y: 18, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.99 }}
        transition={suave}
        onPanEnd={(_, info) => {
          if (info.offset.x < -70) onSiguiente()
          if (info.offset.x > 70) onAnterior()
        }}
        className="vidrio-hondo relative grid h-[82dvh] w-full max-w-6xl grid-rows-[minmax(0,0.62fr)_minmax(0,1.38fr)] overflow-hidden rounded-[32px] md:h-[74dvh] md:grid-cols-[0.95fr_1.05fr] md:grid-rows-1"
      >
        {/* Cara visual */}
        <div
          className="relative flex min-h-0 items-center justify-center p-4"
          style={{
            background: `radial-gradient(ellipse at 50% 40%, ${producto.tono[0]}88 0%, transparent 70%)`,
          }}
        >
          {producto.foto ? (
            <img
              src={producto.foto}
              alt={producto.nombre}
              className="h-full w-auto max-w-full object-contain"
            />
          ) : (
            <ArteBotanico
              arte={producto.arte}
              tono={producto.tono}
              id={`ficha-${producto.id}`}
              className="h-full w-auto max-w-full"
            />
          )}
        </div>

        {/* Cara de texto: corta, jerarquizada */}
        <div className="flex min-h-0 flex-col justify-center gap-2.5 p-4 md:gap-4 md:p-9">
          <div>
            <span className="versalita text-savia">
              {producto.familia === 'tonico' ? 'Tónico capilar' : 'Tinte vegetal'}
            </span>
            <h2 className="mt-2 text-[clamp(1.7rem,3.2vw,2.9rem)] leading-tight text-tinta">
              {producto.nombre}
            </h2>
            <p className="mt-1 text-sm italic text-tinta-suave">{producto.planta}</p>
          </div>

          <p className="max-w-md text-[clamp(0.95rem,1.3vw,1.1rem)] leading-relaxed text-tinta">
            {producto.esencia}
          </p>

          <ul className="flex flex-col gap-2">
            {producto.beneficios.map((b) => (
              <li key={b} className="flex items-center gap-3 text-sm text-tinta-suave">
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: producto.tono[1] }}
                />
                {b}
              </li>
            ))}
          </ul>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Dato titulo="Modo de uso" cuerpo={producto.modoUso} />
            <Dato titulo="Presentación" cuerpo={producto.presentacion} />
          </div>

          <a
            href={enlaceWhatsapp(producto.nombre)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-flex w-fit items-center gap-2 rounded-full bg-savia px-7 py-3 text-sm tracking-wide text-white transition-colors duration-300 hover:bg-savia-hondo"
          >
            Pedir por WhatsApp
          </a>
        </div>

        {/* Controles */}
        <button
          onClick={onCerrar}
          aria-label="Cerrar ficha"
          className="vidrio absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full text-tinta-suave transition-colors duration-300 hover:text-savia"
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
