import { sitio } from '../data/sitio'

/**
 * Marca corta sobre el nombre. El simbolo es el logotipo oficial de Zapsanar;
 * la palabra se deja como texto vivo y no como parte de la imagen, para que se
 * vea nitida a cualquier tamano y la lean los lectores de pantalla.
 */
export default function Marca({ compacta = false }: { compacta?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <img
        src={`${import.meta.env.BASE_URL}marca-zapsanar.png`}
        alt=""
        aria-hidden="true"
        draggable={false}
        className={`sin-arrastre shrink-0 ${compacta ? 'h-8 w-8' : 'h-9 w-9 md:h-11 md:w-11'}`}
      />
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
