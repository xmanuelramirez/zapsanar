import type { Arte } from '../data/productos'

interface Props {
  arte: Arte
  tono: [string, string]
  /** Identificador unico: evita que los gradientes de dos SVG choquen. */
  id: string
  className?: string
}

/**
 * Ilustracion generada por producto. Se usa mientras no haya foto real.
 * Todo es SVG: pesa nada, escala sin perder nitidez y toma el color del producto.
 */
export default function ArteBotanico({ arte, tono, id, className }: Props) {
  const [claro, hondo] = tono
  const gFondo = `fondo-${id}`
  const gPlanta = `planta-${id}`
  const gVidrio = `vidrio-${id}`

  return (
    <svg
      viewBox="0 0 400 520"
      className={className}
      role="presentation"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={gFondo} cx="50%" cy="38%" r="72%">
          <stop offset="0%" stopColor={claro} stopOpacity="0.95" />
          <stop offset="60%" stopColor={claro} stopOpacity="0.45" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={gPlanta} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={hondo} stopOpacity="0.92" />
          <stop offset="100%" stopColor={hondo} stopOpacity="0.68" />
        </linearGradient>
        <linearGradient id={gVidrio} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="45%" stopColor={claro} stopOpacity="0.5" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.7" />
        </linearGradient>
      </defs>

      {/* Halo de color */}
      <ellipse cx="200" cy="215" rx="185" ry="205" fill={`url(#${gFondo})`} />

      {/* Aro tenue que centra la composicion */}
      <circle
        cx="200"
        cy="215"
        r="148"
        fill="none"
        stroke={hondo}
        strokeOpacity="0.16"
        strokeWidth="1"
      />

      <g fill={`url(#${gPlanta})`} stroke={hondo} strokeOpacity="0.75" strokeWidth="1.1">
        {arte === 'ramas' && <Ramas />}
        {arte === 'hoja' && <Hojas />}
        {arte === 'flor' && <Flor hondo={hondo} claro={claro} />}
        {arte === 'gota' && <Gota />}
        {arte === 'raiz' && <Raiz hondo={hondo} />}
      </g>

      {/* Frasco: silueta de vidrio, muy sutil, ancla el producto */}
      <g opacity="0.9">
        <path
          d="M168 372 h64 v22 c0 6 4 9 9 13 14 11 21 26 21 44 v40 c0 12-9 21-21 21 h-82 c-12 0-21-9-21-21 v-40 c0-18 7-33 21-44 5-4 9-7 9-13z"
          fill={`url(#${gVidrio})`}
          stroke={hondo}
          strokeOpacity="0.45"
          strokeWidth="1.3"
        />
        <rect
          x="166"
          y="358"
          width="68"
          height="16"
          rx="6"
          fill={claro}
          fillOpacity="0.9"
          stroke={hondo}
          strokeOpacity="0.45"
          strokeWidth="1"
        />
        {/* Etiqueta */}
        <rect
          x="146"
          y="432"
          width="108"
          height="44"
          rx="4"
          fill="#ffffff"
          fillOpacity="0.72"
          stroke={hondo}
          strokeOpacity="0.14"
          strokeWidth="1"
        />
        <line x1="164" y1="448" x2="236" y2="448" stroke={hondo} strokeOpacity="0.3" strokeWidth="1.4" />
        <line x1="176" y1="460" x2="224" y2="460" stroke={hondo} strokeOpacity="0.18" strokeWidth="1.2" />
      </g>
    </svg>
  )
}

/* --- Variantes ------------------------------------------------------- */

/** Romero y lavanda: tallo con agujas pareadas. */
function Ramas() {
  const agujas = Array.from({ length: 11 }, (_, i) => {
    const y = 130 + i * 20
    const largo = 26 + Math.sin(i * 0.7) * 12
    return (
      <g key={i}>
        <path d={`M200 ${y} q-${largo} -6 -${largo + 14} -18`} fill="none" strokeWidth="4" strokeLinecap="round" />
        <path d={`M200 ${y + 8} q${largo} -6 ${largo + 14} -18`} fill="none" strokeWidth="4" strokeLinecap="round" />
      </g>
    )
  })
  return (
    <g>
      <path d="M200 118 L200 352" fill="none" strokeWidth="5" strokeLinecap="round" />
      {agujas}
    </g>
  )
}

/** Ortiga y henna: hojas dentadas, en pares espejo sobre el tallo. */
function Hojas() {
  const forma = (
    <>
      <path d="M0 0 C 34 -14 62 -52 66 -104 C 26 -100 -6 -66 -14 -34 C -18 -20 -12 -6 0 0 Z" />
      <path d="M0 0 C 22 -30 44 -66 60 -96" fill="none" strokeOpacity="0.45" strokeWidth="1.4" />
    </>
  )

  // El par se refleja con scale(-1 1): rotar 180 grados no da simetria.
  const par = (y: number, escala: number, giro: number) => (
    <g key={y}>
      <g transform={`translate(200 ${y}) rotate(${giro}) scale(${escala})`}>{forma}</g>
      <g transform={`translate(200 ${y}) scale(-1 1) rotate(${giro}) scale(${escala})`}>{forma}</g>
    </g>
  )

  return (
    <g>
      <path d="M200 128 L200 352" fill="none" strokeWidth="5" strokeLinecap="round" />
      {par(316, 0.95, -14)}
      {par(248, 0.82, -2)}
      {par(186, 0.62, 10)}
    </g>
  )
}

/** Manzanilla y calendula: flor radial. */
function Flor({ hondo, claro }: { hondo: string; claro: string }) {
  const petalos = Array.from({ length: 14 }, (_, i) => {
    const angulo = (360 / 14) * i
    return (
      <ellipse
        key={i}
        cx="200"
        cy="150"
        rx="13"
        ry="46"
        transform={`rotate(${angulo} 200 196)`}
        fill={claro}
        fillOpacity="0.9"
        stroke={hondo}
        strokeOpacity="0.45"
        strokeWidth="1.1"
      />
    )
  })
  return (
    <g>
      <path d="M200 196 L200 352" fill="none" strokeWidth="5" strokeLinecap="round" />
      <path d="M200 280 q-40 -12 -52 -46" fill="none" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M200 306 q42 -10 56 -44" fill="none" strokeWidth="3.5" strokeLinecap="round" />
      {petalos}
      <circle cx="200" cy="196" r="30" fill={hondo} fillOpacity="0.35" stroke={hondo} strokeOpacity="0.5" strokeWidth="1.4" />
      <circle cx="200" cy="196" r="17" fill={hondo} fillOpacity="0.75" stroke="none" />
    </g>
  )
}

/** Sabila: pencas carnosas y una gota. */
function Gota() {
  const penca = (giro: number, largo: number) => (
    <path
      key={giro}
      d={`M200 350 C ${200 - 30} ${350 - largo * 0.5}, ${200 - 12} ${350 - largo}, 200 ${350 - largo - 14} C ${200 + 12} ${350 - largo}, ${200 + 30} ${350 - largo * 0.5}, 200 350 Z`}
      transform={`rotate(${giro} 200 350)`}
      strokeWidth="1.2"
    />
  )
  return (
    <g>
      {penca(-38, 150)}
      {penca(38, 150)}
      {penca(-18, 190)}
      {penca(18, 190)}
      {penca(0, 218)}
      <path
        d="M200 96 C 216 122 228 138 228 152 a28 28 0 0 1 -56 0 c0-14 12-30 28-56 Z"
        fill="#ffffff"
        fillOpacity="0.9"
        strokeWidth="1.2"
      />
    </g>
  )
}

/** Nogal e indigo: raiz ramificada con fruto. */
function Raiz({ hondo }: { hondo: string }) {
  return (
    <g>
      <path d="M200 132 L200 350" fill="none" strokeWidth="5" strokeLinecap="round" />
      <path d="M200 214 C 160 226 138 254 130 292" fill="none" strokeWidth="3.4" strokeLinecap="round" />
      <path d="M200 246 C 240 258 262 286 270 322" fill="none" strokeWidth="3.4" strokeLinecap="round" />
      <path d="M200 286 C 172 296 158 318 154 344" fill="none" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M200 306 C 228 316 240 334 244 352" fill="none" strokeWidth="2.6" strokeLinecap="round" />
      <circle cx="200" cy="168" r="42" fill={hondo} fillOpacity="0.24" stroke={hondo} strokeOpacity="0.4" strokeWidth="1.4" />
      <path d="M200 126 C 178 148 178 188 200 210" fill="none" stroke={hondo} strokeOpacity="0.4" strokeWidth="1.4" />
      <path d="M200 126 C 222 148 222 188 200 210" fill="none" stroke={hondo} strokeOpacity="0.4" strokeWidth="1.4" />
    </g>
  )
}
