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
    <div className="grid h-full w-full grid-cols-1 items-center gap-2 px-[6vw] md:grid-cols-[1.05fr_1fr] md:items-stretch md:gap-10">
      {/* En escritorio la columna se reparte de arriba abajo en vez de quedar
          centrada: asi ocupa el alto completo y la portada deja de verse como
          un bloque pequeno flotando en blanco. */}
      <div className="order-2 flex max-w-xl flex-col md:order-1 md:h-full md:justify-between md:py-[7vh]">
        <motion.p {...entrada(0)} className="versalita text-savia">
          Tinturas madre · {sitio.zona}
        </motion.p>

        <div>
          <motion.h1
            {...entrada(1)}
            className="mt-2 text-[clamp(2.1rem,6vw,5rem)] leading-[1.02] text-tinta md:mt-0"
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
            className="mt-4 flex flex-wrap items-center gap-2.5 md:mt-8 md:gap-3"
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
        </div>

        {/* Los sellos en pastilla y no sueltos: como texto plano se perdian
            contra el fondo y dejaban la esquina inferior vacia. */}
        <motion.div
          {...entrada(4)}
          className="mt-4 flex flex-wrap gap-1.5 md:mt-0 md:gap-2"
        >
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

      {/* La portada ya no es un frasco suelto sino el taller donde se preparan.
          La foto se funde con el lienzo por los bordes: como rectangulo pegado
          encima rompia la atmosfera del resto de la pagina. El encuadre baja un
          poco en escritorio para que quepan la cara y los frascos de la mesa. */}
      <motion.div
        initial={false}
        animate={{ opacity: activo ? 1 : 0, scale: activo ? 1 : 0.97 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative order-1 h-[34dvh] md:order-2 md:h-auto"
      >
        {/* Absoluta a proposito: en flujo, `h-full` contra una fila de altura
            automatica hace que la imagen caiga en su proporcion propia y estire
            la fila muy por encima del alto de la ventana. */}
        <img
          src={`${import.meta.env.BASE_URL}taller.webp`}
          alt="El taller de Zapsanar: las tinturas madre se preparan a mano entre hierbas colgadas a secar"
          draggable={false}
          className="foto-fundida sin-arrastre absolute inset-0 h-full w-full object-cover object-[50%_25%] md:object-[50%_38%]"
        />
      </motion.div>
    </div>
  )
}
