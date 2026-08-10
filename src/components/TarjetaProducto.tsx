import { motion } from 'framer-motion'
import ArteBotanico from './ArteBotanico'
import type { Producto } from '../data/productos'

interface Props {
  producto: Producto
  activa: boolean
  ancho: number
  onClick: () => void
}

export default function TarjetaProducto({ producto, activa, ancho, onClick }: Props) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      style={{ width: ancho }}
      animate={{
        scale: activa ? 1 : 0.88,
        opacity: activa ? 1 : 0.5,
        filter: activa ? 'blur(0px)' : 'blur(1.2px)',
      }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="vidrio group relative flex h-full shrink-0 flex-col items-center overflow-hidden rounded-[28px] p-5 text-left sin-arrastre"
      aria-label={producto.nombre}
    >
      <span className="versalita self-start text-savia">
        {producto.familia === 'tonico' ? 'Tónico' : 'Tinte'}
      </span>

      <div className="flex min-h-0 w-full flex-1 items-center justify-center py-2">
        {producto.foto ? (
          <img
            src={producto.foto}
            alt={producto.nombre}
            className="h-full w-auto max-w-full object-contain sin-arrastre"
            draggable={false}
          />
        ) : (
          <ArteBotanico
            arte={producto.arte}
            tono={producto.tono}
            id={`tarjeta-${producto.id}`}
            className="h-full w-auto max-w-full"
          />
        )}
      </div>

      <div className="w-full text-center">
        <h3 className="text-[clamp(1.1rem,1.7vw,1.5rem)] leading-tight text-tinta">
          {producto.nombre}
        </h3>
        <p className="mt-1 text-xs italic text-tinta-suave">{producto.planta}</p>
      </div>

      {/* Solo aparece en la tarjeta activa: invita a abrir la ficha */}
      <motion.span
        animate={{ opacity: activa ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        className="versalita mt-3 rounded-full border border-savia-claro/60 px-4 py-1.5 text-savia"
      >
        Ver ficha
      </motion.span>
    </motion.button>
  )
}
