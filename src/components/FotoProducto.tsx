import { motion, useReducedMotion } from 'framer-motion'

interface Props {
  foto: string
  tono: [string, string]
  alt: string
  /** Levanta la planta del lienzo con sombra, halo que respira y vaiven */
  flotando?: boolean
  className?: string
}

/**
 * La planta recortada, suspendida sobre un halo de su propio color. La sombra
 * proyectada y el vaiven son lo que le dan volumen: sin ellos el PNG se lee
 * pegado al fondo. El halo y el anillo laten mas lento que el vaiven para que
 * el conjunto no parezca un solo pulso.
 */
export default function FotoProducto({
  foto,
  tono,
  alt,
  flotando = false,
  className,
}: Props) {
  const [claro, hondo] = tono
  const quieto = useReducedMotion() ?? false
  const anima = flotando && !quieto

  return (
    <div className={`relative flex items-center justify-center ${className ?? ''}`}>
      {/* Halo: da fondo a la planta sin encerrarla en una caja */}
      <motion.div
        className="pointer-events-none absolute aspect-square h-[92%] max-w-full rounded-full"
        style={{ background: `radial-gradient(circle, ${claro} 0%, ${claro}00 66%)` }}
        animate={anima ? { scale: [1, 1.09, 1], opacity: [0.85, 1, 0.85] } : {}}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Anillo que se abre y se desvanece: marca que la planta esta viva */}
      <motion.div
        className="pointer-events-none absolute aspect-square w-[84%] max-h-[84%] rounded-full border"
        style={{ borderColor: `${hondo}2e` }}
        animate={anima ? { scale: [0.94, 1.14, 0.94], opacity: [0, 0.9, 0] } : { opacity: 0 }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Sombra en el piso, separada de la imagen para que no la siga al flotar */}
      <motion.div
        className="pointer-events-none absolute bottom-[4%] h-[5%] w-[48%] rounded-[50%]"
        style={{ background: `radial-gradient(ellipse, ${hondo}4d 0%, ${hondo}00 70%)` }}
        animate={anima ? { scaleX: [1, 0.84, 1], opacity: [1, 0.6, 1] } : {}}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.img
        src={`${import.meta.env.BASE_URL}${foto}`}
        alt={alt}
        draggable={false}
        decoding="async"
        className="relative h-full w-auto max-w-full object-contain sin-arrastre"
        style={{ filter: `drop-shadow(0 20px 26px ${hondo}40)` }}
        animate={anima ? { y: [0, -16, 0], rotate: [-1.4, 1.4, -1.4] } : { y: 0, rotate: 0 }}
        transition={{
          y: { duration: 7, repeat: Infinity, ease: 'easeInOut' },
          // Distinto periodo que el vaiven: asi el giro nunca cae en el mismo
          // punto dos veces y el movimiento no se siente mecanico.
          rotate: { duration: 11, repeat: Infinity, ease: 'easeInOut' },
        }}
      />
    </div>
  )
}
