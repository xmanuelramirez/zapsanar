import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Fondo from './components/Fondo'
import Marca from './components/Marca'
import Inicio from './components/Inicio'
import Productos from './components/Productos'
import Uso from './components/Uso'
import Contacto from './components/Contacto'
import FichaProducto from './components/FichaProducto'
import { productos } from './data/productos'
import type { Filtro } from './data/familias'

const MODULOS = ['Inicio', 'Productos', 'Uso', 'Contacto'] as const
const PRODUCTOS = 1

export default function App() {
  const [modulo, setModulo] = useState(0)
  const [filtro, setFiltro] = useState<Filtro>('todos')
  const [indice, setIndice] = useState(0)
  const [ficha, setFicha] = useState(false)
  const bloqueo = useRef(false)

  const visibles = useMemo(
    () => (filtro === 'todos' ? productos : productos.filter((p) => p.familia === filtro)),
    [filtro],
  )

  const cambiarFiltro = useCallback((f: Filtro) => {
    setFiltro(f)
    setIndice(0)
  }, [])

  const irA = useCallback((n: number) => {
    setModulo(Math.max(0, Math.min(n, MODULOS.length - 1)))
  }, [])

  const mover = useCallback(
    (paso: 1 | -1) => {
      if (modulo === PRODUCTOS && !ficha) {
        // Dentro del catalogo, izquierda y derecha recorren productos.
        setIndice((v) => Math.max(0, Math.min(v + paso, visibles.length - 1)))
        return
      }
      if (ficha) {
        setIndice((v) => (v + paso + visibles.length) % visibles.length)
        return
      }
      irA(modulo + paso)
    },
    [modulo, ficha, visibles.length, irA],
  )

  // Teclado: flechas horizontales navegan el contexto activo, las verticales
  // siempre cambian de modulo.
  useEffect(() => {
    const alPulsar = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && ficha) {
        setFicha(false)
        return
      }
      if (e.key === 'ArrowRight') mover(1)
      if (e.key === 'ArrowLeft') mover(-1)
      if (!ficha && (e.key === 'ArrowDown' || e.key === 'PageDown')) irA(modulo + 1)
      if (!ficha && (e.key === 'ArrowUp' || e.key === 'PageUp')) irA(modulo - 1)
    }
    window.addEventListener('keydown', alPulsar)
    return () => window.removeEventListener('keydown', alPulsar)
  }, [mover, irA, modulo, ficha])

  // La rueda no hace scroll: avanza el carrusel del contexto activo.
  useEffect(() => {
    const alRodar = (e: WheelEvent) => {
      if (bloqueo.current) return
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY
      if (Math.abs(delta) < 12) return
      bloqueo.current = true
      window.setTimeout(() => (bloqueo.current = false), 620)
      mover(delta > 0 ? 1 : -1)
    }
    window.addEventListener('wheel', alRodar, { passive: true })
    return () => window.removeEventListener('wheel', alRodar)
  }, [mover])

  // Si el filtro deja fuera al producto abierto, el indice se recorta.
  useEffect(() => {
    if (indice > visibles.length - 1) setIndice(Math.max(0, visibles.length - 1))
  }, [indice, visibles.length])

  const productoActual = visibles[indice]

  return (
    <div className="relative flex h-[100dvh] w-full flex-col overflow-hidden bg-lienzo">
      <Fondo />

      <header className="relative z-20 flex h-[4.5rem] shrink-0 items-center justify-between px-[5vw]">
        <button onClick={() => irA(0)} aria-label="Ir al inicio">
          <Marca />
        </button>

        <nav className="hidden items-center gap-1 md:flex">
          {MODULOS.map((m, i) => (
            <button
              key={m}
              onClick={() => {
                setFicha(false)
                irA(i)
              }}
              className="relative px-4 py-2 text-sm tracking-wide transition-colors duration-300"
              style={{ color: modulo === i ? 'var(--color-savia)' : 'var(--color-tinta-suave)' }}
            >
              {m}
              {modulo === i && (
                <motion.span
                  layoutId="subrayado-modulo"
                  className="absolute inset-x-3 -bottom-0.5 h-px bg-savia"
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
            </button>
          ))}
        </nav>
      </header>

      <main className="relative z-10 min-h-0 flex-1 overflow-hidden">
        {/* Gesto de modulo. En el catalogo se desactiva para no competir con
            el deslizamiento de productos. */}
        <motion.div
          className="h-full w-full"
          onPanEnd={(_, info) => {
            if (modulo === PRODUCTOS) return
            if (info.offset.x < -70) irA(modulo + 1)
            if (info.offset.x > 70) irA(modulo - 1)
          }}
        >
        <motion.div
          className="flex h-full w-full"
          animate={{ x: `-${modulo * 100}%` }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <Seccion nombre="Inicio">
            <Inicio irAProductos={() => irA(PRODUCTOS)} />
          </Seccion>

          <Seccion nombre="Productos">
            <Productos
              visibles={visibles}
              indice={indice}
              setIndice={setIndice}
              filtro={filtro}
              setFiltro={cambiarFiltro}
              abrirFicha={() => setFicha(true)}
            />
          </Seccion>

          <Seccion nombre="Uso">
            <Uso activo={modulo === 2} />
          </Seccion>

          <Seccion nombre="Contacto">
            <Contacto activo={modulo === 3} />
          </Seccion>
        </motion.div>
        </motion.div>
      </main>

      <footer className="relative z-20 flex h-[4rem] shrink-0 items-center justify-between px-[5vw]">
        <span className="versalita hidden text-tinta-suave md:block">
          {modulo === PRODUCTOS ? 'Desliza o usa las flechas' : 'Usa las flechas para avanzar'}
        </span>

        <div className="flex items-center gap-2">
          {MODULOS.map((m, i) => (
            <button
              key={m}
              onClick={() => {
                setFicha(false)
                irA(i)
              }}
              aria-label={m}
              className="h-1.5 rounded-full transition-all duration-500"
              style={{
                width: modulo === i ? 30 : 8,
                background:
                  modulo === i
                    ? 'var(--color-savia)'
                    : 'color-mix(in srgb, var(--color-arena) 95%, transparent)',
              }}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <BotonModulo
            direccion="izq"
            deshabilitado={modulo === 0}
            onClick={() => irA(modulo - 1)}
          />
          <BotonModulo
            direccion="der"
            deshabilitado={modulo === MODULOS.length - 1}
            onClick={() => irA(modulo + 1)}
          />
        </div>
      </footer>

      <AnimatePresence>
        {ficha && productoActual && (
          <FichaProducto
            producto={productoActual}
            onCerrar={() => setFicha(false)}
            onAnterior={() => mover(-1)}
            onSiguiente={() => mover(1)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

function Seccion({ nombre, children }: { nombre: string; children: React.ReactNode }) {
  return (
    <section className="h-full w-full shrink-0" aria-label={nombre}>
      {children}
    </section>
  )
}

function BotonModulo({
  direccion,
  deshabilitado,
  onClick,
}: {
  direccion: 'izq' | 'der'
  deshabilitado: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      disabled={deshabilitado}
      aria-label={direccion === 'izq' ? 'Módulo anterior' : 'Módulo siguiente'}
      className="vidrio flex h-9 w-9 items-center justify-center rounded-full text-tinta-suave transition-all duration-300 hover:text-savia disabled:opacity-30"
    >
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path
          d={direccion === 'izq' ? 'M15 5 L8 12 L15 19' : 'M9 5 L16 12 L9 19'}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}
