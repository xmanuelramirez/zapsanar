import { motion, useReducedMotion } from 'framer-motion'
import Manojo from './Manojo'

/**
 * El taller detras del lienzo: manojos de hierba puestos a secar colgando del
 * techo y una tabla cruzando el pie con plantas encima. Todo dibujado en vector
 * y en movimiento, no recortes de fotografia pegados, que se leian como iconos.
 */

const VERDE = ['#4C7A5A', '#5E8C68', '#3F6B4E', '#7BA38A']
const SECO = ['#A08B5C', '#B49B6C', '#8C7647', '#C2A97B']
const OLIVA = ['#6B7F4E', '#7D9160', '#5A6B41', '#8FA06F']

// Duraciones sin multiplos comunes: si coincidieran, los manojos se mecerian
// todos a la vez y pareceria un metronomo en lugar de una corriente de aire.
const COLGADOS = [
  { id: 'a', x: 13, alto: 24, tallos: 9, apertura: 0.95, colores: VERDE, dur: 7.3, giro: 2.6, movil: true },
  { id: 'b', x: 20, alto: 18, tallos: 7, apertura: 0.7, colores: SECO, dur: 9.1, giro: 3.2, movil: false },
  { id: 'c', x: 33, alto: 21, tallos: 11, apertura: 1.15, colores: OLIVA, dur: 8.2, giro: 2.2, movil: false },
  { id: 'd', x: 70, alto: 19, tallos: 8, apertura: 0.85, colores: VERDE, dur: 10.4, giro: 2.9, movil: true },
  { id: 'e', x: 81, alto: 25, tallos: 10, apertura: 1.05, colores: OLIVA, dur: 6.7, giro: 2.4, movil: false },
  { id: 'f', x: 93, alto: 16, tallos: 6, apertura: 0.6, colores: SECO, dur: 11.3, giro: 3.5, movil: false },
]

// De pie sobre la tabla. Van en los margenes: el centro del pie lo ocupa la
// barra de modulos del movil y ahi solo estorbarian.
const DE_PIE = [
  { id: 'p1', x: 5, alto: 9, tallos: 7, apertura: 0.8, colores: VERDE },
  { id: 'p2', x: 13, alto: 7, tallos: 5, apertura: 0.55, colores: OLIVA },
  { id: 'p3', x: 87, alto: 7, tallos: 5, apertura: 0.6, colores: SECO },
  { id: 'p4', x: 95, alto: 9.5, tallos: 8, apertura: 0.9, colores: VERDE },
]

export default function Taller({ visible }: { visible: boolean }) {
  const quieto = useReducedMotion() ?? false

  return (
    <motion.div
      className="absolute inset-0"
      initial={false}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    >
      {COLGADOS.map((m) => (
        <motion.div
          key={m.id}
          className={`absolute top-0 -translate-x-1/2 ${m.movil ? '' : 'hidden md:block'}`}
          style={{ left: `${m.x}%`, transformOrigin: 'top center' }}
          animate={quieto ? {} : { rotate: [-m.giro, m.giro, -m.giro] }}
          transition={{ duration: m.dur, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Manojo
            alto={m.alto}
            tallos={m.tallos}
            apertura={m.apertura}
            colores={m.colores}
            style={{ opacity: 0.6 }}
          />
        </motion.div>
      ))}

      {/* La repisa. Solo en escritorio: en movil el contenido ocupa el ancho
          completo y no queda margen donde ponerla sin ensuciar. */}
      <div className="absolute inset-x-0 bottom-[3.25rem] hidden md:block">
        {DE_PIE.map((m) => (
          <div
            key={m.id}
            className="absolute bottom-0 -translate-x-1/2"
            style={{ left: `${m.x}%` }}
          >
            {/* El mismo manojo boca abajo: los tallos abren hacia arriba desde
                la base y se lee como un ramo de pie. */}
            <Manojo
              alto={m.alto}
              tallos={m.tallos}
              apertura={m.apertura}
              colores={m.colores}
              conCuerda={false}
              style={{ opacity: 0.5, transform: 'rotate(180deg)' }}
            />
          </div>
        ))}
        <div
          className="h-[5px] w-full"
          style={{
            background: 'linear-gradient(to bottom, #C9A87C 0%, #A8834F 45%, #8A6A3E 100%)',
            boxShadow: '0 7px 16px -8px rgba(53,48,42,0.5)',
            opacity: 0.45,
          }}
        />
      </div>
    </motion.div>
  )
}
