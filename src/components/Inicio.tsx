import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ArteBotanico from './ArteBotanico'
import { productos } from '../data/productos'
import { enlaceWhatsapp, sitio } from '../data/sitio'

const destacados = ['tonico-romero', 'tinte-henna', 'tonico-manzanilla']
  .map((id) => productos.find((p) => p.id === id))
  .filter((p): p is (typeof productos)[number] => Boolean(p))

export default function Inicio({ irAProductos }: { irAProductos: () => void }) {
  const [i, setI] = useState(0)

  // Rotacion lenta del arte: el unico movimiento automatico de la portada.
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % destacados.length), 6500)
    return () => clearInterval(t)
  }, [])

  const actual = destacados[i]

  return (
    <div className="grid h-full w-full grid-cols-1 items-center gap-3 px-[6vw] md:grid-cols-[1.05fr_1fr] md:gap-10">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="order-2 max-w-xl md:order-1"
      >
        <p className="versalita text-savia">Lotes pequeños · {sitio.ciudad}</p>

        <h1 className="mt-2 text-[clamp(1.9rem,5.4vw,4.4rem)] leading-[1.04] text-tinta md:mt-3">
          Plantas que el
          <br />
          cabello reconoce
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
          {['Sin amoniaco', 'Sin siliconas', 'Hecho a mano'].map((t) => (
            <span key={t} className="versalita">
              {t}
            </span>
          ))}
        </div>
      </motion.div>

      <div className="relative order-1 flex h-[28dvh] items-center justify-center md:order-2 md:h-[74dvh]">
        <AnimatePresence mode="wait">
          <motion.div
            key={actual.id}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex h-full w-full flex-col items-center justify-center"
          >
            <ArteBotanico
              arte={actual.arte}
              tono={actual.tono}
              id={`inicio-${actual.id}`}
              className="h-full w-auto max-w-full"
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute bottom-0 flex items-center gap-2">
          {destacados.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => setI(idx)}
              aria-label={p.nombre}
              className="h-1.5 rounded-full transition-all duration-500"
              style={{
                width: idx === i ? 26 : 6,
                background:
                  idx === i
                    ? 'var(--color-savia)'
                    : 'color-mix(in srgb, var(--color-arena) 90%, transparent)',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
