# Sanguchon

Landing page oficial de **Sanguchon**, sanguchería de barrio en San Miguel, Santiago. El sitio combina fuego real, hamburguesas de autor y una experiencia visual editorial con Astro, React y Tailwind CSS.

![Sanguchon — burger de autor](public/images/products/burger-hero.webp)

## Qué incluye

- Hero de marca con CTA directo a la carta.
- Splash screen animado con el logo de Sanguchon.
- Grilla responsive de Best Sellers con fotografías reales.
- Sección interactiva **El Milagro**, con despiece de la hamburguesa y ensamblaje al hacer scroll.
- Calendario Santoral dinámico: muestra el santo del día, permite cambiar de mes y centra automáticamente la fecha actual.
- Secciones de historia, feedback, ubicación con Google Maps y footer navegable.
- Tema oscuro de marca con acentos fuego, queso y brioche.
- Imágenes optimizadas en WebP y cabeceras de seguridad para hosting compatible.

## Galería de producto

| Best Sellers | El Milagro | Promo Santoral |
|:---:|:---:|:---:|
| ![Best Sellers](public/images/products/hamburguesas.webp) | ![Anatomía de hamburguesa](public/images/anatomy/pan-brioche-top.webp) | ![Si estás de santo](public/images/promos/si-estas-de-santo.webp) |

## Stack tecnológico

- [Astro 7](https://astro.build/) para el sitio estático y sus componentes `.astro`.
- [React 19](https://react.dev/) para las islas interactivas.
- [Tailwind CSS 4](https://tailwindcss.com/) mediante `@tailwindcss/vite`.
- [Framer Motion](https://www.framer.com/motion/) para la anatomía de la hamburguesa.
- TypeScript para datos y componentes React tipados.
- Sharp para optimización y transformación de imágenes.

## Estructura del proyecto

```text
.
├── public/
│   ├── _headers                  # Cabeceras CSP y hardening del hosting
│   ├── images/
│   │   ├── anatomy/              # Capas del despiece interactivo
│   │   ├── products/              # Fotos de hamburguesas y productos
│   │   ├── promos/               # Gráficas promocionales
│   │   └── venue/                # Local, terraza y ambiente
│   ├── menu-san-guchon.pdf       # Carta descargable
│   └── favicon.*
├── src/
│   ├── assets/logo-san-guchon.svg
│   ├── components/
│   │   ├── landing/              # Secciones de la landing
│   │   ├── react/                # Islas React hidratadas en cliente
│   │   ├── Footer.astro
│   │   ├── Navbar.astro
│   │   └── Splash.astro
│   ├── data/
│   │   ├── menu.ts               # Productos, precios e imágenes
│   │   ├── santoral.ts           # Datos del calendario santoral
│   │   └── site-info.ts          # URLs y datos de contacto
│   ├── layouts/BaseLayout.astro
│   ├── pages/index.astro
│   └── styles/global.css         # Tokens, responsive y animaciones
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## Datos y contenido

Los datos editables están separados de la presentación:

- `src/data/menu.ts`: nombre, descripción, precio, etiqueta e imagen de cada producto.
- `src/data/santoral.ts`: nombres por fecha en formato `MM-DD`.
- `src/data/site-info.ts`: dirección, horarios, Instagram, formulario de feedback, Google Maps y carta.

Para agregar una hamburguesa, edita `menu.ts` y coloca la imagen optimizada dentro de `public/images/products/`.

## Instalación y desarrollo

Requisitos: Node.js `>=22.12.0`.

```bash
npm install
npm run dev
```

El servidor queda disponible en `http://localhost:4321`.

Para una compilación de producción:

```bash
npm run build
npm run preview
```

El resultado estático se genera en `dist/`.

## Responsive y rendimiento

- La composición parte desde móvil y escala con breakpoints de Tailwind.
- Las imágenes usan WebP, `loading="lazy"` y `decoding="async"` cuando corresponde.
- Las islas React se hidratan solo donde existe interacción (`client:load` o `client:visible`).
- `prefers-reduced-motion` reduce las animaciones para usuarios que lo solicitan.
- El scroll de recarga vuelve al Hero y no conserva anclas accidentales.

## Seguridad antes de publicar

- No se guardan API keys, tokens ni credenciales en el repositorio.
- `.gitignore` excluye todas las variantes `.env` salvo `.env.example`.
- `public/_headers` añade CSP, HSTS, protección contra framing, MIME sniffing, permisos sensibles y política de referrer en Netlify/Cloudflare Pages.
- `npm audit --omit=dev --audit-level=high` debe ejecutarse antes de cada release.
- La protección DDoS debe configurarse en el CDN/WAF (por ejemplo, Cloudflare); una landing estática no puede mitigar tráfico volumétrico desde el navegador.

## Flujo de trabajo

```bash
git switch main
git pull --ff-only
npm install
npm run build
git status
git add .
git commit -m "describe el cambio"
git push origin main
```

## Licencia y contacto

Contenido, marca, fotografías y carta pertenecen a Sanguchon. Para feedback de la experiencia utiliza el formulario enlazado desde la sección **Feedback** de la landing.
