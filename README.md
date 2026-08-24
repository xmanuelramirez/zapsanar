# Zapsanar

Vitrina de tinturas madre, aceites y productos de cuidado. Una sola pantalla,
sin scroll: los módulos y los productos se recorren en carrusel.

## Estructura

```
src/
  App.tsx                 Lienzo de 100dvh, navegación entre módulos y teclado
  data/sitio.ts           Marca, WhatsApp, zona, advertencia
  data/productos.ts       Catálogo (lo único que se edita a diario)
  data/familias.ts        Nombres de las familias y de los filtros
  components/
    Inicio.tsx            Portada
    Productos.tsx         Carrusel del catálogo
    TarjetaProducto.tsx   Tarjeta individual
    FichaProducto.tsx     Ficha ampliada de un producto
    FotoProducto.tsx      Planta suspendida: halo, sombra y vaivén
    Uso.tsx               Dosis y pauta común de las tinturas
    Contacto.tsx          Cierre y pedidos
    Fondo.tsx / Marca.tsx Atmósfera y logotipo
public/productos/         PNG de cada producto, fondo transparente
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
Colombia es `57` + el número. Ahí mismo están la zona de envíos y la
advertencia legal.

`instagram` y `correo` están vacíos a propósito: mientras no tengan valor, ese
bloque no se dibuja en el módulo de contacto. Basta con llenarlos para que
aparezca.

### Agregar o cambiar un producto

En `src/data/productos.ts`. Cada producto necesita:

| Campo          | Qué es                                                    |
| -------------- | --------------------------------------------------------- |
| `id`           | Identificador único, sin espacios                          |
| `nombre`       | Nombre comercial                                           |
| `esencia`      | Dos o tres palabras que lo definen                         |
| `familia`      | `tintura`, `aceite` o `cuidado`. Es la etiqueta de la tarjeta |
| `necesidades`  | Para qué se busca. Alimenta filtros e insignias. Ver abajo  |
| `beneficios`   | Exactamente tres, uno por línea                            |
| `aplicacion`   | Una sola frase                                             |
| `oral`         | `true` si se toma: activa la advertencia de embarazo       |
| `foto`         | Ruta dentro de `public/`, por ejemplo `productos/ruda.png` |
| `presentacion` | Opcional. Si falta, no se dibuja ese recuadro              |
| `tono`         | `[color claro, color profundo]` del halo y la sombra       |

### Necesidades: filtros e insignias

Están en `src/data/necesidades.ts`: `mente`, `digestion`, `dolor`, `piel`,
`cabello` y `defensas`. Cumplen dos funciones a la vez: alimentan los filtros
del catálogo y se dibujan como insignias en cada tarjeta y ficha.

**El orden importa.** La primera es la principal y sale llena de verde y más
grande; las otras quedan en segundo plano. Máximo tres, y algunas plantas
tienen solo una: el orégano es un especialista y eso también informa.

Se asignan leyendo la lista completa de propiedades de la planta en el catálogo
en PDF, no solo los tres beneficios que muestra la ficha. Una planta hace
bastante más de lo que caben en tres líneas, y las insignias son justamente lo
que deja ver ese alcance. La principal debería coincidir con el subtítulo que
le da el catálogo: si la menta es "Analgésica y antiinflamatoria", su insignia
principal es Dolor aunque su primer beneficio hable de digestión.

Si se agrega una necesidad nueva, hay que darle también su texto en
`NECESIDADES` (el nombre del botón y de la insignia) y en `DESCRIPCIONES` (la
línea que aparece bajo el título al filtrar).

### Fotos

Las imágenes salen del catálogo en PDF de la marca. Van en `public/productos/`
como PNG de 620x620 con fondo transparente, pesan entre 14 y 121 KB cada una.

Para que una foto nueva se vea igual que las demás necesita fondo transparente
y la planta centrada. Si solo hay una fotografía con fondo, se puede enmascarar
en círculo difuminado, que es lo que se hizo con orégano, cola de caballo y
aceite antiedad.

Pendiente: `shampoo-natural` y `tonico-natural` comparten `cabello.png` porque
el catálogo original usa la misma foto para los dos.

## Publicar

El sitio vive en GitHub Pages, servido desde el propio repositorio. Es gratis
mientras el repositorio sea público, que es el caso, y no hace falta cuenta en
ningún otro servicio.

`.github/workflows/deploy.yml` compila y publica con cada `push` a `main`. La
configuración del repositorio ya está hecha: Settings → Pages, con Source en
"GitHub Actions". `.node-version` fija Node 24 para esos builds.

URL: https://xmanuelramirez.github.io/zapsanar/

### Por qué `base` no es "/"

Un sitio de proyecto de GitHub Pages vive dentro de una subcarpeta con el
nombre del repositorio. Vite necesita ese prefijo o los assets se piden a la
raíz del dominio y salen 404. El workflow lo pasa como `VITE_BASE=/<repo>/` y
`vite.config.ts` lo lee; en local queda en `/` para que `npm run dev` funcione
sin configurar nada.

Las tres imágenes que se cargan desde JavaScript (`Fondo`, `FotoProducto` y la
tira de `Contacto`) anteponen `import.meta.env.BASE_URL`. Una imagen nueva
tiene que hacer lo mismo o se romperá solo en producción.

Para reproducir en local lo que se publica:

```bash
VITE_BASE=/zapsanar/ npm run build
npm run preview
```

### Dominio propio

Con un dominio propio el sitio pasa a servirse desde la raíz, así que hay que
quitar el prefijo: poner el dominio en Settings → Pages → Custom domain, crear
`public/CNAME` con ese dominio y cambiar el workflow para que `VITE_BASE` sea
`/`.

El sitio estuvo un tiempo en Cloudflare Workers. Esa configuración vivía en
`wrangler.jsonc` y sigue en el historial de git.

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
- **Volumen sin 3D.** Las plantas son PNG planos. Lo que les da cuerpo es el
  halo de su propio color, una sombra proyectada que vive separada de la imagen
  y un vaivén de siete segundos. Al separar la sombra, esta se queda en el piso
  mientras la planta sube.
- **Cremas translúcidas.** La clase `.vidrio` mezcla color con transparencia y
  desenfoque en lugar de usar bloques sólidos.
- **La pauta va una sola vez.** Todas las tinturas comparten dosis y ciclo, así
  que eso vive en el módulo Uso y no se repite en las quince fichas.
- **Advertencia visible.** El catálogo original marca que no se use en embarazo
  ni lactancia. Esa línea acompaña a cada producto de vía oral, al módulo Uso y
  al de contacto.
