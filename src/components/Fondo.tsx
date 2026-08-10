import { motion } from 'framer-motion'

/**
 * Atmosfera del lienzo: manchas de crema y verde muy diluidas que respiran.
 * Nunca compiten con el contenido, solo evitan que el blanco se sienta plano.
 */
export default function Fondo() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -left-[18vw] -top-[22vh] h-[70vh] w-[70vh] rounded-full"
        style={{
          background:
            'radial-gradient(circle, color-mix(in srgb, var(--color-crema-2) 90%, transparent) 0%, transparent 68%)',
        }}
        animate={{ x: [0, 26, 0], y: [0, 18, 0] }}
        transition={{ duration: 34, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-[26vh] -right-[14vw] h-[78vh] w-[78vh] rounded-full"
        style={{
          background:
            'radial-gradient(circle, color-mix(in srgb, var(--color-savia-claro) 22%, transparent) 0%, transparent 66%)',
        }}
        animate={{ x: [0, -24, 0], y: [0, -16, 0] }}
        transition={{ duration: 42, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute left-[42vw] top-[52vh] h-[46vh] w-[46vh] rounded-full"
        style={{
          background:
            'radial-gradient(circle, color-mix(in srgb, var(--color-arena) 45%, transparent) 0%, transparent 70%)',
        }}
        animate={{ x: [0, 18, 0], y: [0, -22, 0] }}
        transition={{ duration: 50, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}
