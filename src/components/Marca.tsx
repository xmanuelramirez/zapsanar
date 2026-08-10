import { sitio } from '../data/sitio'

/** Logotipo: hoja trazada en una linea sobre el nombre de la marca. */
export default function Marca({ compacta = false }: { compacta?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <svg
        viewBox="0 0 40 40"
        className={compacta ? 'h-7 w-7' : 'h-9 w-9'}
        aria-hidden="true"
      >
        <path
          d="M20 35 C 20 22, 26 10, 35 5 C 36 18, 30 30, 20 35 Z"
          fill="color-mix(in srgb, var(--color-savia) 22%, transparent)"
          stroke="var(--color-savia)"
          strokeWidth="1.3"
        />
        <path
          d="M20 35 C 20 22, 14 10, 5 5 C 4 18, 10 30, 20 35 Z"
          fill="color-mix(in srgb, var(--color-arena) 55%, transparent)"
          stroke="var(--color-savia)"
          strokeOpacity="0.55"
          strokeWidth="1.1"
        />
        <line x1="20" y1="36" x2="20" y2="20" stroke="var(--color-savia)" strokeWidth="1.2" />
      </svg>
      <div className="leading-none">
        <div
          className={`font-display tracking-[0.18em] text-tinta ${compacta ? 'text-lg' : 'text-xl'}`}
        >
          {sitio.marca.toUpperCase()}
        </div>
        {!compacta && (
          <div className="versalita mt-1 text-tinta-suave">{sitio.lema}</div>
        )}
      </div>
    </div>
  )
}
