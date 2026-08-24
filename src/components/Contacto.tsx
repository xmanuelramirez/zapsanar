import { motion } from 'framer-motion'
import { enlaceWhatsapp, sitio } from '../data/sitio'
import { productos, type Familia } from '../data/productos'
import { ETIQUETAS } from '../data/familias'

// Cuenta real del catalogo, no un numero escrito a mano: si se agrega un
// producto, esta linea se actualiza sola.
const RESUMEN = (['tintura', 'aceite', 'cuidado'] as Familia[]).map((f) => ({
  familia: f,
  n: productos.filter((p) => p.familia === f).length,
}))

// Una planta por foto: calendula y cabello se repiten en dos productos y en la
// tira se verian duplicadas.
const TIRA = productos.filter(
  (p, i, todos) => todos.findIndex((o) => o.foto === p.foto) === i,
)

export default function Contacto({ activo }: { activo: boolean }) {
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
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 px-[6vw] py-3 text-center md:gap-9 md:py-8">
      <motion.div {...entrada(0)} className="max-w-2xl shrink-0">
        <span className="versalita text-savia">Pedidos</span>
        <h2 className="mt-1.5 text-[clamp(2rem,4.8vw,3.6rem)] leading-[1.06] text-tinta">
          Cuéntanos qué
          <br />
          necesitas
        </h2>
        <p className="mx-auto mt-3 max-w-md text-[clamp(0.9rem,1.25vw,1.05rem)] leading-relaxed text-tinta-suave">
          Respondemos por WhatsApp y armamos el pedido contigo. Envíos en{' '}
          {sitio.zona}.
        </p>
      </motion.div>

      <motion.a
        {...entrada(1)}
        href={enlaceWhatsapp()}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex shrink-0 items-center gap-3 rounded-full bg-savia px-9 py-4 text-white transition-colors duration-300 hover:bg-savia-hondo"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.13h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.36c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.69 8.21-8.24 8.21Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.54.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.44.13-.15.17-.25.25-.42.08-.16.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.16 0-.43.06-.65.31-.22.25-.85.83-.85 2.03s.87 2.35.99 2.51c.12.16 1.71 2.61 4.14 3.66.58.25 1.03.4 1.38.51.58.19 1.11.16 1.53.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.11-.22-.17-.47-.29Z" />
        </svg>
        <span className="text-sm tracking-wide">Escribir por WhatsApp</span>
      </motion.a>

      {/* Lo que hay para pedir, en tres cifras. Dice de que tamano es el
          catalogo justo donde la persona decide si escribe. */}
      <motion.div
        {...entrada(2)}
        className="vidrio flex shrink-0 items-stretch gap-1 rounded-3xl px-2 py-2 md:gap-3 md:px-4"
      >
        {RESUMEN.map(({ familia, n }) => (
          <div key={familia} className="px-3 py-1 md:px-5">
            <div className="font-display text-[clamp(1.6rem,3vw,2.4rem)] leading-none text-savia">
              {n}
            </div>
            <div className="versalita-fina mt-1.5 text-tinta-suave">
              {ETIQUETAS[familia]}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Solo se muestran los canales que existen: ver src/data/sitio.ts */}
      {(sitio.instagram || sitio.correo) && (
        <motion.div
          {...entrada(3)}
          className="flex shrink-0 flex-wrap items-center justify-center gap-x-8 gap-y-3"
        >
          {sitio.instagram && (
            <Enlace href={sitio.instagram} etiqueta="Instagram" valor="@zapsanar" />
          )}
          {sitio.correo && (
            <Enlace href={`mailto:${sitio.correo}`} etiqueta="Correo" valor={sitio.correo} />
          )}
        </motion.div>
      )}

      {/* Tira de plantas: cierra la pantalla con el producto en vez de con
          aire. Es decoracion, por eso no tiene ningun gesto de boton. */}
      <div
        className="flex shrink-0 flex-wrap items-center justify-center gap-1.5 md:gap-3"
        aria-hidden="true"
      >
        {TIRA.map((p, i) => (
          <motion.span
            key={p.id}
            initial={false}
            animate={{
              opacity: activo ? 1 : 0,
              y: activo ? 0 : 14,
              scale: activo ? 1 : 0.85,
            }}
            transition={{
              duration: 0.6,
              delay: activo ? 0.35 + i * 0.04 : 0,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mota relative flex items-center justify-center rounded-full"
            style={{
              background: `radial-gradient(circle, ${p.tono[0]} 0%, ${p.tono[0]}00 72%)`,
            }}
          >
            <img
              src={`${import.meta.env.BASE_URL}${p.foto}`}
              alt=""
              draggable={false}
              decoding="async"
              className="h-[86%] w-[86%] object-contain sin-arrastre"
              style={{ filter: `drop-shadow(0 4px 6px ${p.tono[1]}33)` }}
            />
          </motion.span>
        ))}
      </div>

      <p className="max-w-md shrink-0 text-[0.72rem] leading-snug text-tinta-suave">
        {sitio.advertencia}
      </p>
    </div>
  )
}

function Enlace({ href, etiqueta, valor }: { href: string; etiqueta: string; valor: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-left transition-colors duration-300 hover:text-savia"
    >
      <div className="versalita text-tinta-suave">{etiqueta}</div>
      <div className="text-sm text-tinta">{valor}</div>
    </a>
  )
}
