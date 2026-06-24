```markdown
# 📘 BRAND GUIDELINES & UI/UX SPECIFICATIONS
## Educational Ecosystem: Learning Touch
**Version:** 1.0 | **Purpose:** System Context for Generative AI and UI/UX Development Agents.

---

## 1. BRAND IDENTITY (BRAND CORE)

* **Company Name (Brand):** Learning Touch
* **Legal/Trade Descriptor:** Touch Digital & Creative Consulting
* **Expanded Service Definition:** "We are a hybrid creative-tech ecosystem. We don't just educate; we **build** websites, produce **audiovisual advertising assets**, manage **social media ecosystems**, and craft **multi-format educational resources** (Reels, Video Classes, Interactive Ebooks, Print, and Audio)."
* **Updated Mission / Value Proposition:** "We help individuals and businesses transform their ideas into high-impact digital experiences, omnichannel advertising, and adaptive learning ecosystems—all accessible with a single click."
* **Tone of Voice:** Technological yet deeply human, accessible, expert, inspiring, and structured.
* **Brand Archetype:** The Sage + The Magician (Transformation through technological knowledge and AI).
* **Language Requirements:** The primary language for all resources, copy, and content is **Spanish**. However, the design, architecture, and development must always account for and include a bilingual structure, providing a version or a clear UI language toggle to switch seamlessly between Spanish and English.

---

## 2. COLOR SYSTEM (DESIGN TOKENS)

The palette is based on an elegant contrast between dark, deep tones (Lilac) and warm/light tones (Nude and Honeysuckle), conveying a humanized technological feel.

### CSS Variables (For direct use in web development):
```css
:root {
  /* Primary Colors */
  --color-primary-lilac: #3b2244;      /* RGB: 59, 34, 68   | CMYK: 13, 50, 0, 73 */
  --color-primary-nude: #cdbbb0;       /* RGB: 205, 187, 176| CMYK: 0, 9, 14, 20  */
  
  /* Accent & Secondary Colors */
  --color-accent-honeysuckle: #c25270; /* RGB: 194, 82, 112 | CMYK: 0, 58, 42, 24 */
  --color-secondary-cognac: #856c71;   /* RGB: 133, 108, 113| CMYK: 0, 19, 15, 48 */

  /* Backgrounds & Surfaces */
  --color-bg-dark: var(--color-primary-lilac);
  --color-bg-light: #f8f5f3; /* Ultra-light derivative of Nude for web backgrounds */
  --color-surface-cards: #ffffff;
  
  /* Text Colors */
  --color-text-main: var(--color-primary-lilac);
  --color-text-inverse: var(--color-primary-nude);
  --color-text-muted: var(--color-secondary-cognac);
}

```

**Usage Rules for AI Agents:**

* **Main Web Backgrounds:** Use `--color-bg-light` or pure White for maximum readability, or `--color-primary-lilac` for immersive "Dark Mode" sections (e.g., Hero sections).
* **Call to Actions (Buttons/Links):** Use `--color-accent-honeysuckle` for maximum conversion and contrast.
* **Text over Lilac:** ALWAYS use `--color-primary-nude` or White. NEVER use black text over the Lilac background.

## 2.5. MOTION & INTERACTION TOKENS (Micro-interactions)

La animación funcional es parte de nuestra identidad visual. No es decorativa; guía al usuario y da retroalimentación.

* **Duration Tokens (Duración):**
  * *Micro-interactions (Hover, Focus, Toggle):* `150ms` (Easing: ease-out).
  * *State Transitions (Open/Close modals, mobile menu):* `300ms` (Easing: cubic-bezier(0.4, 0, 0.2, 1)).
  * *Scroll/Entrance Reveals (Fade-up, Parallax):* `600ms` a `900ms` (Easing: cubic-bezier(0.22, 1, 0.36, 1) - "Expo Out").

* **Scroll-Driven Storytelling:**
  * Los elementos deben aparecer mediante `Fade-up` (opacity 0 -> 1, translateY(20px) -> 0) al hacer scroll.
  * Las secciones alternas (Lilac/Nude) deben tener un efecto de "Parallax suave" en sus fondos para dar profundidad.

* **Hover States (Elementos interactivos):**
  * **Botón Primario:** Al hacer hover, debe escalar ligeramente (`transform: scale(1.03)`) y aumentar su `box-shadow` (profundidad).
  * **Tarjetas (Cards):** Al hacer hover, deben elevarse (`transform: translateY(-8px)`) y mostrar un borde sutil con `--color-accent-honeysuckle`.
  * **Enlaces de navegación:** Subrayado animado de izquierda a derecha (usando `::after` con `transform: scaleX(0)` a `scaleX(1)`).

* **Accesibilidad de Movimiento:**
  * Respetar estrictamente `@media (prefers-reduced-motion: reduce)` para desactivar TODAS las animaciones de scroll y parallax, manteniendo solo las transiciones de estado funcionales.

---

## 3. TYPOGRAPHY SYSTEM

The system uses four fonts to create hierarchy and dynamism.

* **Typography 1 (Display / Maximum Emphasis): Bebas Neue Pro**
* *Usage:* Only for giant headings (H1), large numbers, or Hero Banners.
* *Rules:* UPPERCASE only. Short phrases (1 to 5 words). Apply negative tracking (`letter-spacing: -0.05em`) for a compact effect. Suggested size: >64px.


* **Typography 2 (UI / Components / Secondary Headings): DM Sans**
* *Usage:* Buttons, navigation menus, subheadings (H2, H3), product cards.
* *Rules:* Geometric and clean. Excellent for modern digital interfaces.


* **Typography 3 (Body Text / Long-form Reading): Inter**
* *Usage:* Paragraphs (p), descriptions, blog articles.
* *Rules:* Optimized for screen readability. Regular (400) for base text, Medium (500) for emphasis.


* **Typography 4 (Support / Fallback): Arimo**
* *Usage:* Formal printed documents or as a web-safe fallback if Inter fails to load.

### 3.5. Type Scale & Hierarchy (Modular Scale 1.250 - Major Third)

Aplica estos tamaños estrictos para mantener la coherencia visual en todos los dispositivos:

| Rol | Font Family | Tamaño (Desktop) | Tamaño (Mobile) | Weight | Letter-spacing |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Display (Hero H1)** | Bebas Neue Pro | `clamp(64px, 8vw, 120px)` | `clamp(48px, 12vw, 64px)` | 700 | `-0.03em` |
| **Heading 2 (Títulos de sección)** | DM Sans | `clamp(36px, 4vw, 52px)` | `clamp(28px, 6vw, 36px)` | 700 | `-0.02em` |
| **Heading 3 (Subtítulos de Cards)** | DM Sans | `clamp(22px, 2.5vw, 32px)` | `20px` | 600 | `0` |
| **Body Large (Descripciones)** | Inter | `20px` | `18px` | 400 | `0.01em` |
| **Body Regular (Párrafos)** | Inter | `clamp(16px, 1.2vw, 18px)` | `15px` | 400 | `0.02em` |
| **Small Text (Metadata, fechas)** | Inter | `14px` | `12px` | 400 | `0.05em` |
| **Buttons & UI Labels** | DM Sans | `16px` | `14px` | 600 | `0.08em` (Uppercase) |

*Regla de oro:* El texto largo (Blog, Ebooks) usará exclusivamente Inter con un line-height de `1.6` para máxima legibilidad. Los títulos usarán line-height `1.1` (compactos).

---

## 4. VISUAL SYSTEM & ART DIRECTION (VISUAL ASSETS)

### 4.1. Photography (Lifestyle)

* **Subjects:** Total inclusivity (children, teenagers, university students, corporate professionals, ethnic diversity).
* **Context:** Warm, well-lit spaces (modern offices, home studios, bright classrooms, or warm nighttime setups).
* **Action:** Always interacting with technology (tablets, dual monitors, touch tables, mice). Faces should look focused, smiling, or collaborative.
* **UI Integration in Photos:** Screens depicted in the photos must show "Artificial Intelligence" interfaces, node graphs, or neural networks using the brand's color palette (Lilac and Honeysuckle).

### 4.2. Graphic Shapes & Patterns (Brand Shapes)

* **Style:** Organic shapes (fluid blobs/stains) combined with hard geometries (squares, triangles) and halftone patterns (dots, wavy lines, freehand strokes).
* **UI Implementation:** Use these elements as background watermarks (opacity 0.05 to 0.1), absolute decorators in web container corners, or `clip-path` masks for images.

### 4.3. Logo and UI Behavior

* **Structure:** Isotype (Concentric circle with a center dot, symbolizing the "Touch" and the expansion of knowledge) + Typographic Logotype ("Learning Touch") + Descriptor ("Consultant and Assistance").
* **Versions:**
* *Negative:* Isotype and text in Nude (#cdbbb0) over a Lilac background (#3b2244).
* *Positive:* Isotype and text in Lilac over a Nude or White background.


* **Favicon / App Icon:** Exclusively the Isotype (concentric circle).

### 4.4. Navigation Architecture & Narrative Flow

* **Primary Navigation (Header):**
  * **Layout:** Mega Menú desplegable para el apartado "Servicios". Al hacer hover/click en "Servicios", debe desplegarse un panel visual con iconos y descripciones cortas de: *Web Development*, *Advertising Assets*, *Social Media Management*, *Multi-format Content (Audio/Video/Print)*.
  * **Sticky Behavior:** El header debe ser `sticky` con un `backdrop-filter: blur(20px)` (Glassmorphism sutil) al hacer scroll para mantener la navegación siempre accesible sin perder el contexto visual.

* **Layout Narrative (La "Historia" de la Homepage):**
  Para mantener el interés, la landing page debe seguir este flujo argumental:
  1. **Hero (Impacto):** Lilac oscuro + Isotype animado (rotación lenta) + H1 con Bebas y el CTA principal.
  2. **Trust Signals (Prueba Social):** Fondo Nude/Blanco. Mostrar métricas (Proyectos entregados, Clientes satisfechos, Países) con números grandes en Bebas Neue.
  3. **Services (El "Qué"):** Layout en grid asimétrico (tipo Pinterest) con tarjetas visuales que muestren mockups de cada servicio.
  4. **Portfolio/Work (El "Cómo"):** Fondo Lilac. Slideshow o Carrusel inmersivo a pantalla completa mostrando trabajos previos en Reels, Ebooks, y Webs.
  5. **CTA Final (Conversión):** Fondo blanco con la forma orgánica de la marca de fondo y un formulario escueto (solo nombre, email y mensaje).

---

## 5. UI/UX DESIGN SPECIFICATIONS (SPEC-DRIVEN RULES)

Direct instructions for frontend code generation (Tailwind/CSS) or component design:

### 5.1. Borders & Shapes (Border Radius)

* Interactive elements (buttons, cards) must balance technology (sharp edges) with humanity (rounded edges).
* **Cards:** `border-radius: 16px;` (`rounded-2xl` or `rounded-xl` in Tailwind).
* **Buttons:** "Pill" style buttons (completely rounded, `rounded-full`) or slightly softened corners (`border-radius: 8px;`).
* **Shadows (Elevation):** Soft, wide shadows tinted with the Lilac color to provide depth without looking muddy. E.g.: `box-shadow: 0 10px 30px rgba(59, 34, 68, 0.08);`

### 5.2. Key Components

* **Primary Button (Primary CTA):**
* Background: `--color-accent-honeysuckle`
* Text: White or `--color-primary-nude` (Always check contrast ratio).
* Typography: DM Sans, Bold, Uppercase optional.


* **Secondary Button:**
* Style: Outline.
* Border and Text: `--color-primary-lilac`.


* **Module Container (UI Pane):**
* Subtle "Glassmorphism" interfaces. Dark panels (Lilac) with slight transparency to overlay on photographic backgrounds.

### 5.3. Component States & Accessibility (WCAG 2.1 AA)

* **Focus States (Teclado):**
  * Todos los elementos interactivos (botones, inputs, enlaces) DEBEN tener un `outline: 3px solid --color-accent-honeysuckle` y `outline-offset: 4px` cuando estén en `:focus-visible`. NUNCA uses `outline: none` sin reemplazo.

* **Contrast Ratios (Verificación estricta):**
  * Texto principal (Lilac) sobre fondo Nude/Blanco -> Ratio > 8:1 (Aprobado).
  * Texto Honeysuckle sobre fondo Lilac -> Ratio > 5.5:1 (Aprobado).
  * **Advertencia:** Nunca uses `--color-secondary-cognac` para textos pequeños (<16px) sobre fondos Nude, el ratio cae a 3.5:1 (No apto). Usa Cognac exclusivamente para textos decorativos o de gran tamaño.

* **Loaders & Skeleton Screens:**
  * Para contenido dinámico (portafolio, blog), implementar Skeleton Screens con un gradiente animado (Shimmer effect) usando Lilac con opacidad 0.1 como base.

---

## 6. PROMPT DIRECTIVES FOR AI AGENTS

**When acting as a web coder, copywriter, or UI designer for Learning Touch, you MUST obey these mandatory rules:**

1. **Strict Color Palette:** NEVER invent colors outside the palette defined in Section 2. Use the exact Hexadecimal codes provided.
2. **Typography Logic:** If generating HTML/CSS, include Google Fonts links for `DM Sans`, `Inter`, `Arimo`, and use a condensed fallback if `Bebas Neue` is unavailable. Assign H1, H2, and p classes exactly as indicated in Section 3.
3. **UI Layouts:** Utilize spacious interface designs (abundant *whitespace*). Alternate pure white background sections with Lilac background sections (Dark mode) to break visual monotony.
4. **Imagery Placement:** When structuring image placeholders (`<img>`), add descriptive `alt` attributes that reflect the lifestyle defined in Section 4.1 (e.g., `alt="Young smiling woman learning with artificial intelligence on her laptop"`).
5. **Graphic Accents:** When writing advanced CSS, suggest or implement pseudo-elements (`::before`, `::after`) or SVG backgrounds to include the organic shapes and dot patterns described in Section 4.2.
6. **Tone & Copywriting:** Any auto-generated text must maintain the core promise: "Learn without limits" through accessible AI.
7. **Bilingual Implementation:** Always build navigation bars, footers, and content structures with Internationalization (i18n) in mind. Ensure the primary output is in Spanish, but provide the necessary HTML/UI scaffolding (like a Language Switcher dropdown) to easily toggle to English.
8. **Motion & Animation Generation:** Cuando generes CSS/JS, DEBES incluir `@keyframes` para elementos flotantes (como las burbujas orgánicas) con movimientos suaves y aleatorios. Aplica siempre `will-change: transform` para optimizar rendimiento.
9. **Mega Menu Logic:** Al construir el header, incluye la lógica de hovering para el Mega Menú de servicios, utilizando `opacity` y `transform: translateY(-10px)` para la entrada/salida.
10. **Storytelling Scroll:** Al generar las secciones, añade atributos `data-aos` (o lógica nativa de Intersection Observer) para que los títulos y tarjetas activen su animación de entrada al aparecer en el viewport.
11. **Performance First:** Todo asset gráfico (SVG, WebP) debe estar optimizado. Instruye el uso de `loading="lazy"` en imágenes y `decoding="async"`. El sitio debe obtener 90+ en Lighthouse.
12. **Bilingual scaffolding (Reforzado):** Al generar el HTML, estructura las etiquetas con atributos `lang="es"` y `lang="en"` en sus respectivas vistas, y asegura que el switch de idioma esté siempre visible en la esquina superior derecha del header.

```

```