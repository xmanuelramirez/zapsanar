/**
 * Un manojo de hierba dibujado, no recortado de una foto. Los tallos salen en
 * abanico desde el atado y las hojas se colocan siguiendo la tangente de cada
 * tallo, que es lo que evita que parezcan pegadas encima.
 *
 * La geometria se calcula, no se escribe a mano: asi cada manojo es distinto
 * cambiando cuatro numeros, y ninguno depende del azar, que cambiaria en cada
 * render y haria que el manojo nunca fuera el mismo.
 */

interface Props {
  /** Alto del dibujo, en vh */
  alto: number
  tallos: number
  /** Apertura del abanico, en radianes */
  apertura: number
  colores: string[]
  /** La cuerda de la que cuelga. En los manojos de pie no va. */
  conCuerda?: boolean
  className?: string
  style?: React.CSSProperties
}

const ANCHO = 100
const LARGO = 150

type Punto = { x: number; y: number }

const enT = (p0: Punto, p1: Punto, p2: Punto, t: number): Punto => {
  const u = 1 - t
  return {
    x: u * u * p0.x + 2 * u * t * p1.x + t * t * p2.x,
    y: u * u * p0.y + 2 * u * t * p1.y + t * t * p2.y,
  }
}

const tangenteEn = (p0: Punto, p1: Punto, p2: Punto, t: number): Punto => {
  const u = 1 - t
  return {
    x: 2 * u * (p1.x - p0.x) + 2 * t * (p2.x - p1.x),
    y: 2 * u * (p1.y - p0.y) + 2 * t * (p2.y - p1.y),
  }
}

export default function Manojo({
  alto,
  tallos,
  apertura,
  colores,
  conCuerda = true,
  className,
  style,
}: Props) {
  const cx = ANCHO / 2
  const atado = LARGO * 0.11
  const piezas = []

  for (let i = 0; i < tallos; i++) {
    const t = tallos === 1 ? 0 : i / (tallos - 1) - 0.5
    const ang = t * apertura
    // Los tallos de los bordes cuelgan mas cortos: un abanico perfectamente
    // parejo se lee como un peine, no como una planta.
    const largo = (LARGO - atado) * (0.99 - Math.abs(t) * 0.34)
    const p0 = { x: cx, y: atado }
    const p2 = { x: cx + Math.sin(ang) * largo, y: atado + Math.cos(ang) * largo }
    const p1 = { x: cx + Math.sin(ang) * largo * 0.3, y: atado + largo * 0.56 }
    const color = colores[i % colores.length]
    const grosor = 1.5 - Math.abs(t) * 0.5

    piezas.push(
      <path
        key={`tallo-${i}`}
        d={`M ${p0.x} ${p0.y} Q ${p1.x} ${p1.y} ${p2.x} ${p2.y}`}
        stroke={color}
        strokeWidth={grosor}
        strokeLinecap="round"
        fill="none"
      />,
    )

    for (let k = 0; k < 8; k++) {
      const th = 0.3 + (k / 7) * 0.64
      const p = enT(p0, p1, p2, th)
      const g = tangenteEn(p0, p1, p2, th)
      const gradosTallo = (Math.atan2(g.y, g.x) * 180) / Math.PI
      const lado = k % 2 === 0 ? 1 : -1
      // Hojas mas grandes a media altura y pequenas en el atado y en la punta.
      // Si crecen hacia arriba se apelmazan en una mancha oscura bajo el nudo.
      const merma = 0.66 + 0.46 * Math.sin(Math.PI * th)
      const rx = 4.9 * merma
      const ry = 1.9 * merma
      const cxHoja = p.x + Math.cos(((gradosTallo + lado * 52) * Math.PI) / 180) * rx * 0.85
      const cyHoja = p.y + Math.sin(((gradosTallo + lado * 52) * Math.PI) / 180) * rx * 0.85

      piezas.push(
        <ellipse
          key={`hoja-${i}-${k}`}
          cx={cxHoja}
          cy={cyHoja}
          rx={rx}
          ry={ry}
          fill={color}
          transform={`rotate(${gradosTallo + lado * 52} ${cxHoja} ${cyHoja})`}
        />,
      )
    }
  }

  return (
    <svg
      viewBox={`0 0 ${ANCHO} ${LARGO}`}
      style={{ height: `${alto}vh`, width: 'auto', ...style }}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {conCuerda && (
        <line
          x1={cx}
          y1={0}
          x2={cx}
          y2={atado}
          stroke="color-mix(in srgb, var(--color-tinta-suave) 55%, transparent)"
          strokeWidth={0.9}
        />
      )}
      {piezas}
      {/* El atado: sin el, los tallos parecen brotar de la nada */}
      <rect
        x={cx - 2.7}
        y={atado - 2}
        width={5.4}
        height={4}
        rx={1.2}
        fill="color-mix(in srgb, var(--color-tinta-suave) 60%, transparent)"
      />
    </svg>
  )
}
