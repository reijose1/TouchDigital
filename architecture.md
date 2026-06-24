# 🏗️ ARCHITECTURE & TECHNICAL SPECIFICATION
## Project: Learning Touch (Touch Digital & Creative Consulting)
**Stack:** Astro (Static Site Generator) + Tailwind CSS + React (Islands) + Framer Motion.
**Deployment:** GitHub Pages (via `npm run build`).

---

## 0. CODE QUALITY TOOLS (Dev Dependencies)
To strictly enforce the rules defined in `code-standards.md`, the project must include the following development dependencies at installation:
- **ESLint:** `@typescript-eslint/eslint-plugin` & `eslint-plugin-astro` (for catching anti-patterns).
- **Prettier:** Standard configuration with `singleQuote: true` and `tabWidth: 2` (for automatic formatting).
- **TypeScript:** Strict configuration (`strict: true`, `noUncheckedIndexedAccess: true`).
- **Zod:** For runtime validation of environment variables (`env.ts`).
- **Husky + lint-staged:** (Recommended) To run formatters and linters automatically before every `git commit`.

---

## 1. PROJECT STRUCTURE (Folders & Files)
/
├── public/
│ ├── assets/
│ │ ├── hero/
│ │ │ └── click-coin.png (Main asset: "CLICK / APPRENTICED COIN")
│ │ ├── logos/
│ │ │ ├── header-logo.png (Horizontal logo for the header)
│ │ │ └── brand-logo.png (Full horizontal logo for the footer)
│ │ ├── footer/
│ │ │ └── signature.png (Author's signature - Reinaldo Carrillo)
│ │ └── portfolio/
│ │ ├── project-argon.jpg (AI in Argonoxide)
│ │ ├── project-cyber.jpg (AI & Cybersecurity)
│ │ ├── project-training.jpg (Corporate AI Training)
│ │ └── project-learn-ai.jpg (Learn with AI)
│ └── favicon.ico (Isotype of Learning Touch)
├── src/
│ ├── components/
│ │ ├── ui/
│ │ │ ├── Button.astro
│ │ │ ├── Card.astro
│ │ │ └── MegaMenu.astro
│ │ ├── sections/
│ │ │ ├── Hero.astro (Uses click-coin.png)
│ │ │ ├── Services.astro
│ │ │ ├── Portfolio.astro (Uses the 4 portfolio images)
│ │ │ ├── Contact.astro
│ │ │ └── Footer.astro (Logos, signature, contact, social)
│ │ └── react/
│ │ ├── AnimatedShape.tsx
│ │ └── ContactForm.tsx
│ ├── layouts/
│ │ └── BaseLayout.astro
│ ├── pages/
│ │ ├── index.astro
│ │ ├── services.astro
│ │ └── portfolio/
│ │ └── [slug].astro
│ ├── data/
│ │ ├── services.json
│ │ └── portfolio.json (Will contain the titles for the 4 images)
│ └── styles/
│ └── globals.css
├── .env
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json

## 2. ROUTING & NAVIGATION (Multi-lingual)
- **Spanish (Default):** `/`
- **English:** `/en` (Implement using `astro-i18next` or duplicated static routes).
- *Mandatory:* The language switcher must be placed in the header.

## 3. ENVIRONMENT VARIABLES (Sensitive Data)
Create a `.env` file and add:
PUBLIC_EMAILJS_SERVICE_ID=your_service_id_here
PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id_here
PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_here

## 4. BUILD COMMAND FOR GITHUB PAGES
In `package.json`:
```json
"scripts": {
  "dev": "astro dev",
  "build": "astro build",
  "preview": "astro preview"
}
The dist/ output will be pushed to the gh-pages branch (or configured in the repository settings).