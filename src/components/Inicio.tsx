import { motion } from 'framer-motion'
import FotoProducto from './FotoProducto'
import { enlaceWhatsapp, sitio } from '../data/sitio'

// Foto real del frasco de la marca. Vive en public/productos/.
const PORTADA = 'productos/frasco.png'

export default function Inicio({ irAProductos }: { irAProductos: () => void }) {
  return (
    <div className="grid h-full w-full grid-cols-1 items-center gap-3 px-[6vw] md:grid-cols-[1.05fr_1fr] md:gap-10">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="order-2 max-w-xl md:order-1"
      >
        <p className="versalita text-savia">Tinturas madre · {sitio.zona}</p>

        <h1 className="mt-2 text-[clamp(1.9rem,5.4vw,4.4rem)] leading-[1.04] text-tinta md:mt-3">
          La esencia de
          <br />
          la naturaleza
        </h1>

        <p className="mt-3 max-w-md text-[clamp(0.88rem,1.25vw,1.05rem)] leading-relaxed text-tinta-suave md:mt-4">
          {sitio.descripcion}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-3 md:mt-7">
          <button
            onClick={irAProductos}
            className="rounded-full bg-savia px-7 py-3 text-sm tracking-wide text-white transition-all duration-300 hover:bg-savia-hondo"
          >
            Ver los productos
          </button>
          <a
            href={enlaceWhatsapp()}
            target="_blank"
            rel="noopener noreferrer"
            className="vidrio rounded-full px-7 py-3 text-sm tracking-wide text-tinta transition-all duration-300 hover:border-savia-claro"
          >
            Escribir por WhatsApp
          </a>
        </div>

        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-tinta-suave md:mt-9 md:gap-x-8">
          {['Sin aditivos', 'Sin conservantes', 'Maceración lenta'].map((t) => (
            <span key={t} className="versalita">
              {t}
            </span>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="order-1 h-[28dvh] md:order-2 md:h-[74dvh]"
      >
        <FotoProducto
          foto={PORTADA}
          tono={['#F3EDE1', '#8A7A5E']}
          alt="Frasco de tintura madre Zapsanar"
          flotando
          className="h-full w-full"
        />
      </motion.div>
    </div>
  )
}
