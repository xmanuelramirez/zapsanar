import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import TarjetaProducto from './TarjetaProducto'
import type { Producto } from '../data/productos'
import { DESCRIPCIONES, NECESIDADES, type Filtro } from '../data/necesidades'

const SEPARACION = 20

interface Props {
  visibles: Producto[]
  indice: number
  setIndice: (n: number) => void
  filtro: Filtro
  setFiltro: (f: Filtro) => void
  abrirFicha: () => void
}

/**
 * Ancho de tarjeta segun el viewport. En movil la tarjeta se lleva casi todo el
 * ancho: es la pantalla donde mas se va a ver y la planta tiene que leerse sin
 * esfuerzo. Aun asi se deja asomar la siguiente, que es lo que dice que hay mas.
 */
function calcularAncho() {
  const w = window.innerWidth
  if (w < 640) return Math.min(w * 0.76, 330)
  return Math.min(Math.max(w * 0.26, 260), 390)
}

export default function Productos({
  visibles,
  indice,
  setIndice,
  filtro,
  setFiltro,
  abrirFicha,
}: Props) {
  const pista = useRef<HTMLDivElement>(null)
  const [medida, setMedida] = useState({ ancho: 300, visible: 0 })

  useEffect(() => {
    const medir = () =>
      setMedida((v) => {
        const ancho = calcularAncho()
        const visible = pista.current?.clientWidth ?? 0
        return v.ancho === ancho && v.visible === visible ? v : { ancho, visible }
      })
    medir()
    const observador = new ResizeObserver(medir)
    if (pista.current) observador.observe(pista.current)
    return () => observador.disconnect()
  }, [])

  const { ancho, visible } = medida
  const paso = ancho + SEPARACION
  const actual = visibles[indice]

  // La tarjeta activa se centra, pero solo mientras haya carrusel a los dos
  // lados. En el primer producto centrarla dejaba media pantalla en blanco, asi
  // que en los extremos la pista se pega al borde. Si el filtro deja tan pocos
  // productos que caben enteros, se centra el conjunto.
  const total = visibles.length * paso - SEPARACION
  const centrada = -indice * paso - ancho / 2
  const desplazamiento =
    visible === 0
      ? centrada
      : total <= visible
        ? -total / 2
        : Math.max(visible / 2 - total, Math.min(centrada, -visible / 2))

  return (
    <div className="flex h-full w-full flex-col gap-1 px-[5vw] py-1">
      <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-1">
        <div className="min-w-0">
          <span className="versalita text-savia">Catálogo</span>
          {/* En movil el titulo se calla: el alto que ocupa lo necesita la planta */}
          <h2 className="mt-1 hidden text-[clamp(1.4rem,2.8vw,2.3rem)] leading-tight text-tinta sm:block">
            Lo que prepara Zapsanar
          </h2>
          {/* Para "Todo" sobra: la descripcion repetiria el titulo */}
          {filtro !== 'todos' && (
            <p className="mt-0.5 text-xs text-tinta-suave">{DESCRIPCIONES[filtro]}</p>
          )}
        </div>

        {/* En movil los filtros no se apilan: se deslizan en una sola fila, que
            es el gesto que ya trae la pantalla. */}
        <div className="sin-barra -mx-[5vw] w-screen overflow-x-auto px-[5vw] sm:mx-0 sm:w-auto sm:overflow-visible sm:px-0">
          <div className="vidrio flex w-max gap-1 rounded-3xl p-1 sm:ml-auto sm:flex-wrap sm:justify-end">
            {(Object.keys(NECESIDADES) as Filtro[]).map((f) => (
              <button
                key={f}
                onClick={() => setFiltro(f)}
                className="relative shrink-0 rounded-full px-3 py-1.5 text-xs tracking-wide transition-colors duration-300 sm:px-4"
                style={{ color: filtro === f ? '#fff' : 'var(--color-tinta-suave)' }}
                aria-pressed={filtro === f}
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
      </div>

      {/* Carrusel */}
      <div ref={pista} className="escena relative min-h-0 flex-1 overflow-hidden">
        {/* Capa de gesto. Se usa onPanEnd y no drag: drag captura el puntero
            en tactil y el tap sobre la tarjeta nunca llegaria a dispararse. */}
        <motion.div
          className="absolute inset-0"
          onPanEnd={(_, info) => {
            if (info.offset.x < -50) setIndice(Math.min(indice + 1, visibles.length - 1))
            if (info.offset.x > 50) setIndice(Math.max(indice - 1, 0))
          }}
        >
          <motion.div
            className="absolute left-1/2 top-1/2 flex h-[94%] -translate-y-1/2"
            style={{ gap: SEPARACION, transformStyle: 'preserve-3d' }}
            animate={{ x: desplazamiento }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {visibles.map((p, i) => (
              <TarjetaProducto
                key={p.id}
                producto={p}
                distancia={i - indice}
                ancho={ancho}
                onClick={() => (i === indice ? abrirFicha() : setIndice(i))}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Pie del carrusel */}
      <div className="flex items-center justify-between gap-4">
        <p className="min-w-0 truncate text-sm text-tinta-suave">
          {actual ? actual.beneficios[0] : 'No hay productos para esta necesidad.'}
        </p>

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
