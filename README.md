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
| `familia`      | `tintura`, `aceite` o `cuidado`, alimenta el filtro        |
| `beneficios`   | Exactamente tres, uno por línea                            |
| `aplicacion`   | Una sola frase                                             |
| `oral`         | `true` si se toma: activa la advertencia de embarazo       |
| `foto`         | Ruta dentro de `public/`, por ejemplo `productos/ruda.png` |
| `presentacion` | Opcional. Si falta, no se dibuja ese recuadro              |
| `tono`         | `[color claro, color profundo]` del halo y la sombra       |

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
