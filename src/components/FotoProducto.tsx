import { motion } from 'framer-motion'

interface Props {
  foto: string
  tono: [string, string]
  alt: string
  /** Levanta la planta del lienzo con sombra y un vaiven muy lento */
  flotando?: boolean
  className?: string
}

/**
 * La planta recortada, suspendida sobre un halo de su propio color. La sombra
 * proyectada y el vaiven son lo que le dan volumen: sin ellos el PNG se lee
 * pegado al fondo.
 */
export default function FotoProducto({
  foto,
  tono,
  alt,
  flotando = false,
  className,
}: Props) {
  const [claro, hondo] = tono

  return (
    <div className={`relative flex items-center justify-center ${className ?? ''}`}>
      {/* Halo: da fondo a la planta sin encerrarla en una caja */}
      <div
        className="pointer-events-none absolute aspect-square h-[86%] rounded-full"
        style={{
          background: `radial-gradient(circle, ${claro} 0%, ${claro}00 68%)`,
        }}
      />

      {/* Sombra en el piso, separada de la imagen para que no la siga al flotar */}
      <motion.div
        className="pointer-events-none absolute bottom-[6%] h-[5%] w-[46%] rounded-[50%]"
        style={{ background: `radial-gradient(ellipse, ${hondo}44 0%, ${hondo}00 70%)` }}
        animate={flotando ? { scaleX: [1, 0.9, 1], opacity: [1, 0.75, 1] } : {}}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.img
        src={`${import.meta.env.BASE_URL}${foto}`}
        alt={alt}
        draggable={false}
        className="relative h-full w-auto max-w-full object-contain sin-arrastre"
        style={{ filter: `drop-shadow(0 14px 18px ${hondo}33)` }}
        animate={flotando ? { y: [0, -10, 0] } : { y: 0 }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}
