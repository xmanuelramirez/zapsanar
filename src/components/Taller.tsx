import { motion, useReducedMotion } from 'framer-motion'

/**
 * El taller detras del lienzo: ramas puestas a secar colgando del techo y dos
 * repisas de madera en los margenes. Todo va en la capa de fondo, muy tenue,
 * para dar oficio a la pagina sin competir con el contenido.
 */

// Periodos deliberadamente distintos y sin multiplos comunes: si coincidieran,
// las cuatro ramas se mecerian como un metronomo.
const COLGADAS = [
  { id: 'romero', foto: 'productos/romero.png', x: 7, cuerda: 4, alto: 17, dur: 7.3, giro: 3.4, movil: true },
  { id: 'menta', foto: 'productos/menta.png', x: 22, cuerda: 9, alto: 12, dur: 9.1, giro: 2.6, movil: false },
  { id: 'ortiga', foto: 'productos/ortiga.png', x: 75, cuerda: 6, alto: 15, dur: 8.2, giro: 3, movil: true },
  { id: 'cola', foto: 'productos/cola-de-caballo.png', x: 90, cuerda: 11, alto: 19, dur: 10.4, giro: 2.2, movil: false },
]

// Plantas puestas sobre la tabla. Van en los margenes exteriores: el centro del
// pie lo ocupa la barra de modulos y ahi solo estorbarian.
const EN_REPISA = [
  { foto: 'productos/valeriana.png', x: 4, alto: 8 },
  { foto: 'productos/calendula.png', x: 12, alto: 6.5 },
  { foto: 'productos/oregano.png', x: 87, alto: 6.5 },
  { foto: 'productos/papaya.png', x: 95, alto: 8 },
]

export default function Taller() {
  const quieto = useReducedMotion() ?? false
  const base = import.meta.env.BASE_URL

  return (
    <>
      {COLGADAS.map((r) => (
        <div
          key={r.id}
          className={`absolute top-0 -translate-x-1/2 ${r.movil ? '' : 'hidden md:block'}`}
          style={{ left: `${r.x}%` }}
        >
          <motion.div
            className="flex flex-col items-center"
            style={{ transformOrigin: 'top center' }}
            animate={quieto ? {} : { rotate: [-r.giro, r.giro, -r.giro] }}
            transition={{ duration: r.dur, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* La cuerda */}
            <div
              className="w-px"
              style={{
                height: `${r.cuerda}vh`,
                background:
                  'linear-gradient(to bottom, transparent, color-mix(in srgb, var(--color-tinta-suave) 45%, transparent))',
              }}
            />
            <img
              src={`${base}${r.foto}`}
              alt=""
              aria-hidden="true"
              draggable={false}
              decoding="async"
              className="sin-arrastre w-auto opacity-45"
              style={{ height: `${r.alto}vh`, transform: 'rotate(180deg)' }}
            />
          </motion.div>
        </div>
      ))}

      {/* La repisa: una tabla rudimentaria cruzando el pie del lienzo, con unas
          plantas encima. Solo en escritorio; en movil el contenido ocupa todo el
          ancho y no queda margen donde ponerlas sin ensuciar. */}
      <div className="absolute inset-x-0 bottom-[3.25rem] hidden md:block">
        {EN_REPISA.map((p) => (
          <img
            key={p.foto}
            src={`${base}${p.foto}`}
            alt=""
            aria-hidden="true"
            draggable={false}
            decoding="async"
            className="sin-arrastre absolute bottom-0 w-auto -translate-x-1/2 opacity-35"
            style={{ height: `${p.alto}vh`, left: `${p.x}%` }}
          />
        ))}
        {/* Canto claro arriba y veta oscura abajo: es lo que la lee como tabla
            y no como una raya. */}
        <div
          className="h-[5px] w-full"
          style={{
            background: 'linear-gradient(to bottom, #C9A87C 0%, #A8834F 45%, #8A6A3E 100%)',
            boxShadow: '0 7px 16px -8px rgba(53,48,42,0.5)',
            opacity: 0.45,
          }}
        />
      </div>

    </>
  )
}
