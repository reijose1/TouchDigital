# 🧩 COMPONENT BLUEPRINT (UI Atomic Design)

**Golden Rule:** All components must strictly respect the CSS Variables defined in `design.md`.

---

## 1. MEGA MENU (Header Navigation)

* **Structure:** Logo (Isotype + Text) on the left. Navigation centered. Language Switcher and "Contact" CTA on the right.
* **Interaction:** On hover over "Services", a visual panel drops down with 4 columns (each service with a small SVG icon and brief description).
* **Style:** Subtle Glassmorphism (`backdrop-filter: blur(16px)`) on the sticky header.

## 2. BUTTONS (Variants)

* **Primary:** BG `--color-accent-honeysuckle`, White Text. Hover: `scale(1.02)` and enhanced shadow. Border: `rounded-full` (Pill).
* **Secondary (Outline):** Border `2px solid --color-primary-lilac`, Lilac Text. Hover: BG Lilac, Text Nude.
* **Sizes:** Large (padding: 16px 40px) for the Hero; Medium (12px 24px) for internal sections.

## 3. HERO COMPONENT (The Centerpiece)

* **Layout:** Flexbox or 2-column Grid. Left Column: Copy (H1, p, CTAs). Right Column: Relative container where the **`/assets/hero/click-coin.png`** image floats.
* **Animation:** The image must have an infinite float using Framer Motion (translation and rotation of ±2 degrees in a loop). Over the image, add a layer of "particles" (floating lilac dots) for that award-winning feel.

## 4. SERVICE CARD

* **Shape:** `rounded-2xl` with a soft shadow.
* **Content:** SVG Icon (top), Title (H3 in DM Sans), Short description (Inter).
* **Hover:** Elevation (`translateY(-8px)`) and a bottom border in Honeysuckle.

## 5. CONTACT FORM (React + EmailJS) - *BUILT WITH CLEAN CODE*

*Example of the exact expected structure. The AI must replicate this level of professionalism, typings, and documentation.*

```tsx
import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

/**
 * Defines the state shape of the contact form.
 * Extends HTML input attributes for strict reusability.
 */
interface ContactFormState {
  user_name: string;
  user_email: string;
  message: string;
}

/**
 * Contact form component utilizing EmailJS.
 * Manages asynchronous submission, loading states, and user feedback.
 * * @returns {JSX.Element} Rendered contact form with validation.
 */
export const ContactForm: React.FC = () => {
  // Reference to the actual form DOM node for EmailJS serialization
  const formRef = useRef<HTMLFormElement>(null);
  
  // State management for UI feedback
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  /**
   * Handles the asynchronous submission of the form.
   * Prevents default behavior, validates the DOM reference, and sends the email.
   * * @param {React.FormEvent<HTMLFormElement>} e - The submit event.
   * @returns {Promise<void>}
   */
  const sendEmail = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    // Defensive guard: ensure the form ref exists
    if (!formRef.current) {
      setFeedback('❌ Form reference not found. Please refresh.');
      return;
    }

    setIsLoading(true);
    setFeedback(null);

    try {
      // Invoke EmailJS using environment variables validated at build time
      const result = await emailjs.sendForm(
        import.meta.env.PUBLIC_EMAILJS_SERVICE_ID,
        import.meta.env.PUBLIC_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.PUBLIC_EMAILJS_PUBLIC_KEY
      );

      // Check API response status
      if (result.status === 200) {
        setFeedback('✅ Message sent successfully! I will get back to you shortly.');
        formRef.current.reset(); // Clear the form fields
      } else {
        throw new Error(`Unexpected API status: ${result.status}`);
      }
    } catch (error) {
      // User-friendly error message, while logging the technical details to console
      setFeedback('❌ Oops! Something went wrong. Please try again in a moment.');
      console.error('EmailJS Service Error:', error);
    } finally {
      setIsLoading(false); // Ensure the button is always re-enabled
    }
  };

  return (
    <form ref={formRef} onSubmit={sendEmail} className="space-y-4">
      {/* Name Field */}
      <div>
        <label htmlFor="user_name" className="block text-sm font-medium text-[--color-primary-lilac]">
          Full Name
        </label>
        <input
          type="text"
          id="user_name"
          name="user_name"
          required
          placeholder="Your full name"
          className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[--color-accent-honeysuckle]"
        />
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="user_email" className="block text-sm font-medium text-[--color-primary-lilac]">
          Email Address
        </label>
        <input
          type="email"
          id="user_email"
          name="user_email"
          required
          placeholder="you@example.com"
          className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[--color-accent-honeysuckle]"
        />
      </div>

      {/* Message Field */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-[--color-primary-lilac]">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          placeholder="Tell me about your project..."
          className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[--color-accent-honeysuckle]"
        />
      </div>

      {/* Submit Button with Loading State */}
      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-3 px-6 rounded-full text-white font-bold transition-all ${
          isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:scale-105 hover:shadow-lg'
        } bg-[--color-accent-honeysuckle]`}
      >
        {isLoading ? '⏳ Sending...' : '🚀 Send Message'}
      </button>

      {/* Feedback Area */}
      {feedback && <p className="text-center mt-2 text-sm font-medium">{feedback}</p>}
    </form>
  );
};

```

## 6. FOOTER COMPONENT (Elegant & Interactive)

* **Background:** `--color-primary-lilac` (dark mode) with a subtle top border or shadow separating it from the previous section.
* **Layout:** Responsive grid (4 columns on desktop, 2 on tablet, 1 on mobile).
* **Column 1 (Brand):** `brand-logo.png` (width: ~180px) + short description text in `--color-primary-nude`.
* **Column 2 (Quick Links):** Vertical list of links (Inicio, Servicios, Portafolio, Contacto). Font: DM Sans. Hover effect: text turns to `--color-accent-honeysuckle`.
* **Column 3 (Contact):** Display phone, email, and address with small icon SVGs (📞 ✉️ 📍) next to each. Text color: `--color-primary-nude`.
* **Column 4 (Social & Signature):** Social icons (YouTube, GitHub, LinkedIn) in a horizontal row. Icons should be white/grey, turning to `--color-accent-honeysuckle` on hover with a `scale(1.15)` effect. Below the icons, place the `signature.png` image (max-width: 120px, centered) with a small caption text: Diseñado y construido con pasión por Reinaldo Carrillo. (Font: Inter, size: 12px, opacity: 0.7).
* **Interactions (Micro-animations):** Social icons must have a bounce or scaling effect on hover. Quick links must slide slightly to the right on hover (`transform: translateX(4px)`).
* **Accessibility:** Ensure all social icons have `aria-label` attributes describing the destination (e.g., `aria-label="Visit our YouTube channel"`).