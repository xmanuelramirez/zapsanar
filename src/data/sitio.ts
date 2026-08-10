// Configuracion editable del sitio. Todo lo que cambia sin tocar componentes
// vive aqui.

export const sitio = {
  marca: 'Zapsanar',
  lema: 'Tónicos y tintes naturales',
  descripcion:
    'Fórmulas vivas de romero, ortiga y flores, preparadas en lotes pequeños para el cabello y el cuero cabelludo.',

  // Numero de WhatsApp en formato internacional, solo digitos.
  // Ejemplo Mexico: 52 + LADA + numero.
  whatsapp: '5214771234567',

  // Texto base del mensaje. {producto} se reemplaza con el nombre del producto.
  mensajeWhatsapp: 'Hola Zapsanar, me interesa {producto}. ¿Me pueden dar información?',

  instagram: 'https://instagram.com/zapsanar',
  correo: 'hola@zapsanar.com',
  ciudad: 'León, Guanajuato',
} as const

export function enlaceWhatsapp(producto?: string): string {
  const texto = sitio.mensajeWhatsapp.replace(
    '{producto}',
    producto ?? 'sus productos',
  )
  return `https://wa.me/${sitio.whatsapp}?text=${encodeURIComponent(texto)}`
}
