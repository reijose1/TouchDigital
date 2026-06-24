import React, { useRef, useState, useCallback } from 'react';
import emailjs from '@emailjs/browser';

/**
 * Defines the possible states for user feedback messages.
 * Using a discriminated union for type-safe feedback rendering.
 */
interface FeedbackState {
  /** Type of feedback (success or error) */
  type: 'success' | 'error';
  /** Message to display to the user */
  message: string;
}

/**
 * ContactForm — React component integrating EmailJS for email submissions.
 * Handles asynchronous submission, basic validation, loading/error states,
 * and provides clear user feedback.
 *
 * Implements:
 * - component-blueprint.md Section 5 (exact structure)
 * - code-standards.md Section 5 (defensive programming)
 * - code-standards.md Section 6 (accessibility & semantic HTML)
 *
 * @returns {JSX.Element} A form with name, email, and message fields
 */
export const ContactForm: React.FC = () => {
  /** Reference to the actual form DOM node for EmailJS serialization */
  const formRef = useRef<HTMLFormElement>(null);

  /** Loading state to prevent duplicate submissions */
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /** User feedback state (null = no feedback shown) */
  const [feedback, setFeedback] = useState<FeedbackState | null>(null);

  /** Active language state */
  const [lang, setLang] = useState<string>('es');

  // Sync language with html lang attribute dynamically
  React.useEffect(() => {
    const currentLang = document.documentElement.getAttribute('lang') || 'es';
    setLang(currentLang);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'lang') {
          const updatedLang = document.documentElement.getAttribute('lang') || 'es';
          setLang(updatedLang);
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['lang'],
    });

    return () => observer.disconnect();
  }, []);

  /** Translation strings map */
  const t = {
    es: {
      nameLabel: 'Nombre completo',
      namePlaceholder: 'Tu nombre completo',
      emailLabel: 'Correo electrónico',
      emailPlaceholder: 'tu@email.com',
      messageLabel: 'Mensaje',
      messagePlaceholder: 'Cuéntanos sobre tu proyecto...',
      submitBtn: '🚀 Enviar Mensaje',
      submittingBtn: '⏳ Enviando...',
      successMsg: '✅ ¡Mensaje enviado con éxito! Te responderé pronto.',
      errorRef: '❌ Referencia del formulario no encontrada. Por favor, recarga la página.',
      errorGeneral: '❌ ¡Ups! Algo salió mal. Por favor, inténtalo de nuevo en un momento.',
    },
    en: {
      nameLabel: 'Full Name',
      namePlaceholder: 'Your full name',
      emailLabel: 'Email Address',
      emailPlaceholder: 'your@email.com',
      messageLabel: 'Message',
      messagePlaceholder: 'Tell us about your project...',
      submitBtn: '🚀 Send Message',
      submittingBtn: '⏳ Sending...',
      successMsg: '✅ Message sent successfully! I will reply soon.',
      errorRef: '❌ Form reference not found. Please reload the page.',
      errorGeneral: '❌ Oops! Something went wrong. Please try again in a moment.',
    },
  }[lang === 'en' ? 'en' : 'es'];

  /**
   * Handles the asynchronous submission of the contact form.
   */
  const sendEmail = useCallback(
    async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
      e.preventDefault();

      if (!formRef.current) {
        setFeedback({
          type: 'error',
          message: t.errorRef,
        });
        return;
      }

      setIsLoading(true);
      setFeedback(null);

      try {
        const result = await emailjs.sendForm(
          import.meta.env.PUBLIC_EMAILJS_SERVICE_ID,
          import.meta.env.PUBLIC_EMAILJS_TEMPLATE_ID,
          formRef.current,
          import.meta.env.PUBLIC_EMAILJS_PUBLIC_KEY,
        );

        if (result.status === 200) {
          setFeedback({
            type: 'success',
            message: t.successMsg,
          });
          formRef.current.reset();
        } else {
          throw new Error(`Unexpected status: ${result.status}`);
        }
      } catch (error: unknown) {
        setFeedback({
          type: 'error',
          message: t.errorGeneral,
        });
        console.error('EmailJS Service Error:', error);
      } finally {
        setIsLoading(false);
      }
    },
    [t],
  );

  /** Shared input styles for consistency */
  const inputStyles: React.CSSProperties = {
    width: '100%',
    padding: '14px 18px',
    borderRadius: '12px',
    border: '2px solid rgba(59, 34, 68, 0.15)',
    background: 'rgba(255, 255, 255, 0.9)',
    fontFamily: 'var(--font-body)',
    fontSize: '16px',
    color: 'var(--color-text-main)',
    transition: 'border-color 150ms ease-out, box-shadow 150ms ease-out',
    outline: 'none',
  };

  return (
    <form
      ref={formRef}
      onSubmit={sendEmail}
      style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
      noValidate
    >
      {/* Name Field */}
      <div>
        <label
          htmlFor="user_name"
          style={{
            display: 'block',
            marginBottom: '6px',
            fontFamily: 'var(--font-heading)',
            fontSize: '14px',
            fontWeight: 600,
            color: 'var(--color-primary-nude)',
            letterSpacing: '0.03em',
          }}
        >
          {t.nameLabel}
        </label>
        <input
          type="text"
          id="user_name"
          name="user_name"
          required
          placeholder={t.namePlaceholder}
          aria-required="true"
          style={inputStyles}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = 'var(--color-accent-honeysuckle)';
            e.currentTarget.style.boxShadow = '0 0 0 4px rgba(194, 82, 112, 0.15)';
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'rgba(59, 34, 68, 0.15)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        />
      </div>

      {/* Email Field */}
      <div>
        <label
          htmlFor="user_email"
          style={{
            display: 'block',
            marginBottom: '6px',
            fontFamily: 'var(--font-heading)',
            fontSize: '14px',
            fontWeight: 600,
            color: 'var(--color-primary-nude)',
            letterSpacing: '0.03em',
          }}
        >
          {t.emailLabel}
        </label>
        <input
          type="email"
          id="user_email"
          name="user_email"
          required
          placeholder={t.emailPlaceholder}
          aria-required="true"
          style={inputStyles}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = 'var(--color-accent-honeysuckle)';
            e.currentTarget.style.boxShadow = '0 0 0 4px rgba(194, 82, 112, 0.15)';
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'rgba(59, 34, 68, 0.15)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        />
      </div>

      {/* Message Field */}
      <div>
        <label
          htmlFor="message"
          style={{
            display: 'block',
            marginBottom: '6px',
            fontFamily: 'var(--font-heading)',
            fontSize: '14px',
            fontWeight: 600,
            color: 'var(--color-primary-nude)',
            letterSpacing: '0.03em',
          }}
        >
          {t.messageLabel}
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          placeholder={t.messagePlaceholder}
          aria-required="true"
          style={{ ...inputStyles, resize: 'vertical', minHeight: '120px' }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = 'var(--color-accent-honeysuckle)';
            e.currentTarget.style.boxShadow = '0 0 0 4px rgba(194, 82, 112, 0.15)';
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'rgba(59, 34, 68, 0.15)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        />
      </div>

      {/* Submit Button with Loading State */}
      <button
        type="submit"
        disabled={isLoading}
        aria-busy={isLoading}
        style={{
          width: '100%',
          padding: '16px 24px',
          borderRadius: '999px',
          border: 'none',
          background: isLoading
            ? 'rgba(194, 82, 112, 0.6)'
            : 'var(--color-accent-honeysuckle)',
          color: '#fff',
          fontFamily: 'var(--font-heading)',
          fontWeight: 700,
          fontSize: '16px',
          letterSpacing: '0.05em',
          cursor: isLoading ? 'not-allowed' : 'pointer',
          transition: 'transform 150ms ease-out, box-shadow 150ms ease-out, background 150ms ease-out',
          transform: isLoading ? 'none' : undefined,
        }}
        onMouseEnter={(e) => {
          if (!isLoading) {
            e.currentTarget.style.transform = 'scale(1.03)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(194, 82, 112, 0.4)';
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        {isLoading ? t.submittingBtn : t.submitBtn}
      </button>

      {/* Feedback Area */}
      {feedback && (
        <p
          role="status"
          aria-live="polite"
          style={{
            textAlign: 'center',
            marginTop: '0.5rem',
            fontSize: '15px',
            fontWeight: 500,
            fontFamily: 'var(--font-body)',
            color: feedback.type === 'success'
              ? '#22c55e'
              : '#ef4444',
          }}
        >
          {feedback.message}
        </p>
      )}
    </form>
  );
};

export default ContactForm;
