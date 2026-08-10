import type { Necesidad } from '../data/necesidades'
import { NECESIDADES } from '../data/necesidades'

interface Props {
  /** Ordenadas: la primera es la principal */
  necesidades: Necesidad[]
  compactas?: boolean
  className?: string
}

/**
 * Muestra hasta tres necesidades por producto. La principal va llena y algo
 * mas grande; las otras dos quedan en segundo plano. Asi se ve de un vistazo
 * que una planta cubre mas de una cosa, sin que compitan entre si.
 *
 * No son botones a proposito: en la tarjeta irian anidadas dentro del boton de
 * la tarjeta, que no es HTML valido, y ademas se confundirian con los filtros.
 */
export default function Insignias({ necesidades, compactas = false, className }: Props) {
  const [principal, ...resto] = necesidades

  return (
    <div className={`flex flex-wrap items-center gap-1.5 ${className ?? ''}`}>
      <span
        className={`rounded-full bg-savia tracking-wide text-white ${
          compactas ? 'px-3 py-1 text-[0.68rem]' : 'px-4 py-1.5 text-[0.78rem]'
        }`}
      >
        {NECESIDADES[principal]}
      </span>

      {resto.map((n) => (
        <span
          key={n}
          className={`rounded-full border border-arena bg-white/55 tracking-wide text-tinta-suave ${
            compactas ? 'px-2 py-[3px] text-[0.6rem]' : 'px-3 py-1 text-[0.68rem]'
          }`}
        >
          {NECESIDADES[n]}
        </span>
      ))}
    </div>
  )
}
