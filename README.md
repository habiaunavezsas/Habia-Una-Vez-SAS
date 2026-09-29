# Había una vez…

Biblioteca web infantil e interactiva para leer, escuchar y descubrir cuentos. Incluye actividades educativas, videos, personajes, favoritos y logros de lectura.

## Funcionalidades

- Biblioteca de cuentos con filtros por categoría y búsqueda.
- Lector de cuentos por páginas.
- Audiocuentos y lectura mediante síntesis de voz.
- Videos y actividades interactivas.
- Sección para colorear y conocer personajes.
- Favoritos, progreso, puntos, compras y logros.
- Diseño responsive para móvil, tablet y escritorio.
- Aplicación instalable como PWA.
- Persistencia local mediante `localStorage`.
- Sincronización opcional de datos con Supabase.

## Ejecutar en local

El proyecto no necesita instalar dependencias. Debe abrirse desde un servidor local porque carga cuentos Markdown con `fetch`.

Con Python:

```bash
python -m http.server 8000
```

Después abre <http://localhost:8000> en el navegador.

También puedes usar la extensión **Live Server** de VS Code.

## Estructura principal

- `index.html`: estructura de la aplicación y modales.
- `styles.css`: estilos responsive y diseño visual.
- `app.js`: navegación, cuentos, actividades, autenticación y persistencia.
- `manifest.webmanifest`: configuración de la PWA.
- `sw.js`: service worker para recursos en caché.
- `supabase-config.js`: configuración de autenticación y almacenamiento remoto.
- `assets/cuentos/`: cuentos en formato Markdown.
- `assets/Descripciones/`: descripciones de los cuentos.
- `assets/imagenes cuentos/`: portadas e ilustraciones.

## Persistencia de datos

Sin iniciar sesión, favoritos, progreso y compras se guardan en el navegador mediante `localStorage`.

Con Supabase configurado y una sesión iniciada, compras y contenido personalizado se guardan en `user_data`. Los favoritos y los logros/progreso se guardan en la tabla dedicada `user_library_progress`, para que estén disponibles en cualquier dispositivo con la misma cuenta.

Para crear la tabla y sus políticas de seguridad, ejecuta una vez el archivo `supabase-library-progress.sql` completo en el SQL Editor de Supabase. La aplicación migra automáticamente los favoritos y el progreso antiguos de `user_data` sin reemplazar una fila que ya exista en la tabla nueva.

## Añadir cuentos

1. Crea un archivo `.md` dentro de `assets/cuentos/`.
2. Añade su nombre al arreglo `storyFiles` de `app.js`.
3. Añade las categorías en `storyCategoryMap`.
4. Añade la portada en `storyImageMap` si existe.
5. Recarga la aplicación desde el servidor local.

## Tecnologías

- HTML5
- CSS3
- JavaScript vanilla
- Markdown para el contenido
- Supabase opcional
- Web App Manifest y Service Worker
