# Zapsanar

Vitrina de tónicos y tintes naturales. Una sola pantalla, sin scroll: los
módulos y los productos se recorren en carrusel.

## Estructura

```
src/
  App.tsx                 Lienzo de 100dvh, navegación entre módulos y teclado
  data/sitio.ts           Marca, WhatsApp, redes, ciudad
  data/productos.ts       Catálogo (lo único que se edita a diario)
  components/
    Inicio.tsx            Portada
    Productos.tsx         Carrusel del catálogo
    TarjetaProducto.tsx   Tarjeta individual
    FichaProducto.tsx     Ficha ampliada de un producto
    Ritual.tsx            Proceso de elaboración
    Contacto.tsx          Cierre y pedidos
    ArteBotanico.tsx      Ilustración SVG por producto
    Fondo.tsx / Marca.tsx Atmósfera y logotipo
```

## Desarrollo

```bash
npm install
npm run dev
```

`npm run lint` corre el chequeo de tipos.

## Cómo editar el contenido

### Cambiar el número de WhatsApp

En `src/data/sitio.ts`, campo `whatsapp`: formato internacional, solo dígitos.
Para México es `52` + `1` + lada + número. Ese mismo archivo tiene el correo,
Instagram y la ciudad.

### Agregar o cambiar un producto

En `src/data/productos.ts`. Cada producto necesita:

| Campo          | Qué es                                                     |
| -------------- | ---------------------------------------------------------- |
| `id`           | Identificador único, sin espacios                          |
| `nombre`       | Nombre comercial                                           |
| `planta`       | Nombre botánico, va en cursiva bajo el nombre              |
| `familia`      | `tonico` o `tinte`, alimenta el filtro                     |
| `esencia`      | Una sola frase, es lo primero que se lee                   |
| `beneficios`   | Exactamente tres                                           |
| `modoUso`      | Instrucción corta                                          |
| `presentacion` | Envase y contenido                                         |
| `arte`         | `ramas`, `hoja`, `flor`, `gota` o `raiz`                   |
| `tono`         | `[color claro, color profundo]` de la ilustración          |

### Poner fotos reales en lugar de las ilustraciones

1. Guarda la imagen en `public/productos/` (por ejemplo `romero.jpg`).
2. Agrega la línea `foto: 'productos/romero.jpg'` a ese producto.

Mientras un producto no tenga `foto`, se dibuja su ilustración botánica. Se
puede ir migrando de uno en uno. Conviene que las fotos sean cuadradas o
verticales y con fondo claro.

## Publicar

El sitio se despliega solo a GitHub Pages con cada `push` a `main`, mediante
`.github/workflows/deploy.yml`.

Configuración inicial, una sola vez:

1. Sube el repositorio a GitHub.
2. En el repositorio: Settings → Pages → Build and deployment → Source:
   **GitHub Actions**.
3. El primer push a `main` publica el sitio en
   `https://<usuario>.github.io/<repositorio>/`.

Con dominio propio, cambia `VITE_BASE` a `/` en el workflow y agrega el dominio
en Settings → Pages.

## Decisiones de diseño

- **Sin scroll.** `html` tiene `overflow: hidden`. Todo cabe en el alto de la
  ventana; el recorrido es horizontal.
- **Navegación.** Flechas izquierda y derecha recorren el contexto activo
  (productos dentro del catálogo, módulos fuera de él). Flechas arriba y abajo
  siempre cambian de módulo. La rueda del ratón hace lo mismo que las flechas
  horizontales. En táctil se desliza con el dedo.
- **Gestos con `onPanEnd`, no con `drag`.** `drag` captura el puntero en
  pantallas táctiles y el toque sobre una tarjeta nunca llegaría a abrir su
  ficha.
- **Cremas translúcidas.** La clase `.vidrio` mezcla color con transparencia y
  desenfoque en lugar de usar bloques sólidos.
- **Animaciones sobrias.** Transiciones largas y suaves, sin rebotes. Se
  desactivan solas si el sistema pide menos movimiento.
