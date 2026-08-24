import { motion } from 'framer-motion'
import FotoProducto from './FotoProducto'
import Insignias from './Insignias'
import type { Producto } from '../data/productos'
import { ETIQUETAS } from '../data/familias'

interface Props {
  producto: Producto
  /** Posicion respecto a la tarjeta centrada: 0 es la activa, negativo va antes */
  distancia: number
  ancho: number
  onClick: () => void
}

export default function TarjetaProducto({ producto, distancia, ancho, onClick }: Props) {
  const activa = distancia === 0
  const [claro] = producto.tono

  return (
    <motion.button
      type="button"
      onClick={onClick}
      style={{ width: ancho, transformStyle: 'preserve-3d' }}
      animate={{
        scale: activa ? 1 : 0.82,
        // Las que quedan mas lejos del centro se apagan mas: el ojo sabe
        // cuantas quedan sin tener que leer el contador.
        opacity: activa ? 1 : Math.max(0.16, 0.46 - (Math.abs(distancia) - 1) * 0.15),
        // Giro tipo vitrina: las de la izquierda miran a la derecha y al reves.
        rotateY: activa ? 0 : distancia < 0 ? 17 : -17,
        filter: activa ? 'blur(0px)' : 'blur(2px)',
      }}
      whileTap={{ scale: activa ? 0.97 : 0.82 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="vidrio group relative flex h-full shrink-0 flex-col items-center overflow-hidden rounded-[30px] px-4 pb-4 pt-3 text-left sin-arrastre"
      aria-label={producto.nombre}
      aria-current={activa}
    >
      {/* Velo del color de la planta: cada tarjeta trae el suyo, y por eso el
          carrusel deja de ser una fila de rectangulos iguales. */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5"
        style={{ background: `linear-gradient(to top, ${claro}, ${claro}00)` }}
        animate={{ opacity: activa ? 0.8 : 0.45 }}
        transition={{ duration: 0.65 }}
      />

      <span className="versalita relative self-start text-savia">
        {ETIQUETAS[producto.familia]}
      </span>

      {/* La planta manda: se lleva todo el alto que sobre de la tarjeta */}
      <FotoProducto
        foto={producto.foto}
        tono={producto.tono}
        alt={producto.nombre}
        flotando={activa}
        className="relative min-h-0 w-full flex-1 py-1"
      />

      <div className="relative w-full text-center">
        <h3 className="text-[clamp(1.05rem,1.6vw,1.45rem)] leading-tight text-tinta">
          {producto.nombre}
        </h3>
        <p className="mt-0.5 text-xs text-tinta-suave">{producto.esencia}</p>
      </div>

      <Insignias necesidades={producto.necesidades} compactas className="relative mt-2 justify-center" />

      {/* Solo aparece en la tarjeta activa: invita a abrir la ficha */}
      <motion.span
        animate={{ opacity: activa ? 1 : 0, y: activa ? 0 : 6 }}
        transition={{ duration: 0.4 }}
        className="versalita relative mt-2 rounded-full border border-savia-claro/70 bg-white/50 px-4 py-1.5 text-savia"
      >
        Ver ficha
      </motion.span>
    </motion.button>
  )
}
