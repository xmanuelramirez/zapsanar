// Configuracion editable del sitio. Todo lo que cambia sin tocar componentes
// vive aqui.

export const sitio = {
  marca: 'Zapsanar',
  lema: 'El arte de sanar, naturalmente',
  descripcion:
    'Tinturas madre maceradas en alcohol, sin aditivos ni conservantes. Esencias puras de plantas para el bienestar diario.',

  // Numero de WhatsApp en formato internacional, solo digitos.
  // Colombia: 57 + numero.
  whatsapp: '573158159065',

  // Texto base del mensaje. {producto} se reemplaza con el nombre del producto.
  mensajeWhatsapp: 'Hola Zapsanar, me interesa {producto}. ¿Me pueden dar información?',

  // Se muestran solo si tienen valor. Dejar vacio lo que no exista todavia.
  instagram: '',
  correo: '',
  zona: 'Colombia',

  // Aparece en cada producto de via oral y en el modulo de uso.
  advertencia: 'No usar en embarazo ni lactancia. No sustituye un tratamiento médico.',
} as const

export function enlaceWhatsapp(producto?: string): string {
  const texto = sitio.mensajeWhatsapp.replace(
    '{producto}',
    producto ?? 'sus productos',
  )
  return `https://wa.me/${sitio.whatsapp}?text=${encodeURIComponent(texto)}`
}
