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
import type { Filtro } from './data/necesidades'

const MODULOS = ['Inicio', 'Productos', 'Uso', 'Contacto'] as const
type Modulo = (typeof MODULOS)[number]

// Los indices se derivan del nombre. Antes eran numeros sueltos repartidos por
// el archivo y reordenar un modulo los rompia en silencio.
const indiceDe = (m: Modulo) => MODULOS.indexOf(m)
const PRODUCTOS = indiceDe('Productos')

/**
 * Color de fondo de cada modulo. En el catalogo manda el tono de la planta que
 * se esta viendo; los demas modulos traen el suyo para que ninguno se sienta la
 * misma pantalla con otro texto.
 */
const AMBIENTES: Record<Modulo, { tono: [string, string]; foto: string }> = {
  Inicio: { tono: ['#F3EDE1', '#8A7A5E'], foto: 'productos/frasco.png' },
  Productos: { tono: ['#DCE8DA', '#4C7A5A'], foto: 'productos/romero.png' },
  Uso: { tono: ['#E4EEE6', '#4C7A5A'], foto: 'productos/menta.png' },
  Contacto: { tono: ['#FBE6D2', '#C98A63'], foto: 'productos/calendula.png' },
}

export default function App() {
  const [modulo, setModulo] = useState(0)
  const [filtro, setFiltro] = useState<Filtro>('todos')
  const [indice, setIndice] = useState(0)
  const [ficha, setFicha] = useState(false)
  const bloqueo = useRef(false)

  const visibles = useMemo(
    () =>
      filtro === 'todos'
        ? productos
        : productos.filter((p) => p.necesidades.includes(filtro)),
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
  const nombreModulo = MODULOS[modulo]
  const ambiente =
    modulo === PRODUCTOS && productoActual
      ? { tono: productoActual.tono, foto: productoActual.foto }
      : AMBIENTES[nombreModulo]

  const irAModulo = (i: number) => {
    setFicha(false)
    irA(i)
  }

  return (
    <div className="lienzo relative flex h-[100dvh] w-full flex-col overflow-hidden">
      <Fondo tono={ambiente.tono} foto={ambiente.foto} />

      <header className="relative z-20 flex h-14 shrink-0 items-center justify-between px-[5vw] md:h-[4.5rem]">
        <button onClick={() => irAModulo(0)} aria-label="Ir al inicio">
          <Marca />
        </button>

        <nav className="hidden items-center gap-1 md:flex">
          {MODULOS.map((m, i) => (
            <button
              key={m}
              onClick={() => irAModulo(i)}
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
              <Inicio activo={nombreModulo === 'Inicio'} irAProductos={() => irA(PRODUCTOS)} />
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
              <Uso activo={nombreModulo === 'Uso'} />
            </Seccion>

            <Seccion nombre="Contacto">
              <Contacto activo={nombreModulo === 'Contacto'} />
            </Seccion>
          </motion.div>
        </motion.div>
      </main>

      <footer className="relative z-20 flex h-14 shrink-0 items-center justify-between gap-2 px-[5vw] md:h-16">
        <span className="versalita hidden text-tinta-suave md:block">
          {modulo === PRODUCTOS ? 'Desliza o usa las flechas' : 'Usa las flechas para avanzar'}
        </span>

        {/* En movil los modulos van con nombre, no con puntos: un punto no dice
            a donde lleva y aqui no hay barra superior donde comprobarlo. */}
        <nav className="flex flex-1 items-center justify-center gap-0.5 md:hidden">
          {MODULOS.map((m, i) => (
            <button
              key={m}
              onClick={() => irAModulo(i)}
              className="versalita-fina relative flex h-11 items-center rounded-full px-2.5 transition-colors duration-300"
              style={{ color: modulo === i ? '#fff' : 'var(--color-tinta-suave)' }}
            >
              {modulo === i && (
                <motion.span
                  layoutId="pastilla-modulo"
                  className="absolute inset-0 rounded-full bg-savia"
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
              <span className="relative">{m}</span>
            </button>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {MODULOS.map((m, i) => (
            <button
              key={m}
              onClick={() => irAModulo(i)}
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

        <div className="hidden items-center gap-2 md:flex">
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
