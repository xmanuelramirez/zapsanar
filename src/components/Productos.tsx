import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import TarjetaProducto from './TarjetaProducto'
import type { Producto } from '../data/productos'
import { DESCRIPCIONES, NECESIDADES, type Filtro } from '../data/necesidades'

const SEPARACION = 24

interface Props {
  visibles: Producto[]
  indice: number
  setIndice: (n: number) => void
  filtro: Filtro
  setFiltro: (f: Filtro) => void
  abrirFicha: () => void
}

/** Ancho de tarjeta segun el viewport: una y media en movil, tres en escritorio. */
function calcularAncho() {
  const w = window.innerWidth
  if (w < 640) return Math.min(w * 0.66, 280)
  return Math.min(Math.max(w * 0.21, 240), 340)
}

export default function Productos({
  visibles,
  indice,
  setIndice,
  filtro,
  setFiltro,
  abrirFicha,
}: Props) {
  const [ancho, setAncho] = useState(300)

  useEffect(() => {
    const medir = () => setAncho(calcularAncho())
    medir()
    window.addEventListener('resize', medir)
    return () => window.removeEventListener('resize', medir)
  }, [])

  const paso = ancho + SEPARACION
  const actual = visibles[indice]

  return (
    <div className="flex h-full w-full flex-col px-[5vw] py-2">
      <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-2">
        <div className="min-w-0">
          <span className="versalita text-savia">Catálogo</span>
          <h2 className="mt-1 text-[clamp(1.4rem,2.8vw,2.3rem)] leading-tight text-tinta">
            Lo que prepara Zapsanar
          </h2>
          {/* Para "Todo" sobra: la descripcion repetiria el titulo */}
          {filtro !== 'todos' && (
            <p className="mt-1 text-xs text-tinta-suave">{DESCRIPCIONES[filtro]}</p>
          )}
        </div>

        <div className="vidrio flex max-w-full flex-wrap justify-end gap-1 rounded-3xl p-1">
          {(Object.keys(NECESIDADES) as Filtro[]).map((f) => (
            <button
              key={f}
              onClick={() => setFiltro(f)}
              className="relative rounded-full px-3 py-1.5 text-xs tracking-wide transition-colors duration-300 sm:px-4"
              style={{ color: filtro === f ? '#fff' : 'var(--color-tinta-suave)' }}
            >
              {filtro === f && (
                <motion.span
                  layoutId="pastilla-filtro"
                  className="absolute inset-0 rounded-full bg-savia"
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
              <span className="relative">{NECESIDADES[f]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Carrusel */}
      <div className="relative min-h-0 flex-1 overflow-hidden">
        {/* Capa de gesto. Se usa onPanEnd y no drag: drag captura el puntero
            en tactil y el tap sobre la tarjeta nunca llegaria a dispararse. */}
        <motion.div
          className="absolute inset-0"
          onPanEnd={(_, info) => {
            if (info.offset.x < -60) setIndice(Math.min(indice + 1, visibles.length - 1))
            if (info.offset.x > 60) setIndice(Math.max(indice - 1, 0))
          }}
        >
          <motion.div
            className="absolute left-1/2 top-1/2 flex h-[min(56vh,440px)] -translate-y-1/2"
            style={{ gap: SEPARACION }}
            animate={{ x: -indice * paso - ancho / 2 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {visibles.map((p, i) => (
              <TarjetaProducto
                key={p.id}
                producto={p}
                activa={i === indice}
                ancho={ancho}
                onClick={() => (i === indice ? abrirFicha() : setIndice(i))}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Pie del carrusel */}
      <div className="flex items-center justify-between gap-4 pt-1">
        <div className="min-w-0">
          <p className="truncate text-sm text-tinta-suave">
            {actual ? actual.beneficios[0] : 'Sin productos en esta familia.'}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <span className="versalita text-tinta-suave">
            {String(indice + 1).padStart(2, '0')} / {String(visibles.length).padStart(2, '0')}
          </span>
          <Flecha
            direccion="izq"
            deshabilitada={indice === 0}
            onClick={() => setIndice(Math.max(indice - 1, 0))}
          />
          <Flecha
            direccion="der"
            deshabilitada={indice >= visibles.length - 1}
            onClick={() => setIndice(Math.min(indice + 1, visibles.length - 1))}
          />
        </div>
      </div>
    </div>
  )
}

/**
 * En movil el carrusel se arrastra con el dedo, asi que estas flechas se
 * ocultan: solo duplicarian las del pie de pagina.
 */
function Flecha({
  direccion,
  deshabilitada,
  onClick,
}: {
  direccion: 'izq' | 'der'
  deshabilitada: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      disabled={deshabilitada}
      aria-label={direccion === 'izq' ? 'Anterior' : 'Siguiente'}
      className="vidrio hidden h-10 w-10 items-center justify-center rounded-full text-tinta-suave transition-all duration-300 hover:text-savia disabled:opacity-35 sm:flex"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path
          d={direccion === 'izq' ? 'M15 5 L8 12 L15 19' : 'M9 5 L16 12 L9 19'}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}
