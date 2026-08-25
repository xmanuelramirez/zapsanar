import { motion } from 'framer-motion'
import { enlaceWhatsapp, sitio } from '../data/sitio'

const SELLOS = ['Sin aditivos', 'Sin conservantes', 'Maceración lenta']

interface Props {
  activo: boolean
  irAProductos: () => void
}

export default function Inicio({ activo, irAProductos }: Props) {
  // Entra por partes y en orden de lectura. Un solo bloque que aparece de golpe
  // es justo lo que hacia que la portada se sintiera una imagen fija.
  const entrada = (orden: number) => ({
    initial: false as const,
    animate: { opacity: activo ? 1 : 0, y: activo ? 0 : 18 },
    transition: {
      duration: 0.7,
      delay: activo ? orden * 0.08 : 0,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  })

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* La foto del taller es el fondo entero de la portada en escritorio. En
          movil, donde una imagen tan apaisada se recortaria hasta perderla a
          ella, vuelve a ser una banda arriba con el texto debajo. */}
      <motion.img
        src={`${import.meta.env.BASE_URL}taller.webp`}
        alt="El taller de Zapsanar: las tinturas madre se preparan a mano entre hierbas colgadas a secar"
        draggable={false}
        initial={false}
        animate={{ opacity: activo ? 1 : 0, scale: activo ? 1 : 1.03 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="sin-arrastre absolute inset-x-0 top-0 h-[38dvh] w-full object-cover object-[74%_30%] md:inset-0 md:h-full md:object-[58%_46%]"
        style={{ filter: 'saturate(0.94)' }}
      />

      {/* Velo crema. En escritorio entra por la izquierda, que es donde va el
          texto; en movil cierra el pie de la banda. Ademas de asegurar la
          lectura, es lo que cose la fotografia con el lienzo. */}
      <div
        className="pointer-events-none absolute inset-0 hidden md:block"
        style={{
          background:
            'linear-gradient(to right, var(--color-crema) 0%, color-mix(in srgb, var(--color-crema) 84%, transparent) 28%, transparent 60%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[40dvh] md:hidden"
        style={{
          background:
            'linear-gradient(to bottom, transparent 58%, var(--color-lienzo) 100%)',
        }}
      />

      <div className="relative z-10 flex h-full max-w-xl flex-col justify-center px-[6vw] pt-[36dvh] md:max-w-none md:w-[50%] md:pt-0">
        <motion.p {...entrada(0)} className="versalita text-savia">
          Tinturas madre · {sitio.zona}
        </motion.p>

        <motion.h1
          {...entrada(1)}
          className="mt-2 text-[clamp(2.1rem,5.2vw,4.6rem)] leading-[1.02] text-tinta md:mt-3"
        >
          La esencia de
          <br />
          la naturaleza
        </motion.h1>

        <motion.p
          {...entrada(2)}
          className="mt-2.5 max-w-md text-[clamp(0.85rem,1.25vw,1.1rem)] leading-relaxed text-tinta-suave md:mt-5"
        >
          {sitio.descripcion}
        </motion.p>

        <motion.div
          {...entrada(3)}
          className="mt-4 flex flex-wrap items-center gap-2.5 md:mt-7 md:gap-3"
        >
          <button
            onClick={irAProductos}
            className="rounded-full bg-savia px-6 py-3 text-sm tracking-wide text-white transition-all duration-300 hover:bg-savia-hondo md:px-8 md:py-4"
          >
            Ver los productos
          </button>
          <a
            href={enlaceWhatsapp()}
            target="_blank"
            rel="noopener noreferrer"
            className="vidrio rounded-full px-6 py-3 text-sm tracking-wide text-tinta transition-all duration-300 hover:border-savia-claro md:px-8 md:py-4"
          >
            Escribir por WhatsApp
          </a>
        </motion.div>

        {/* Los sellos en pastilla y no sueltos: como texto plano se perdian
            contra el fondo, y ahora ademas van sobre una fotografia. */}
        <motion.div {...entrada(4)} className="mt-4 flex flex-wrap gap-1.5 md:mt-8 md:gap-2">
          {SELLOS.map((t) => (
            <span
              key={t}
              className="vidrio versalita-fina rounded-full px-3.5 py-2 text-tinta-suave md:px-4 md:py-2.5"
            >
              {t}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
