import { z } from 'zod';

/**
 * Zod schema for validating required public environment variables.
 * Ensures EmailJS configuration is present at build time to prevent
 * runtime errors from missing credentials.
 *
 * @see https://docs.astro.build/en/guides/environment-variables/
 */
const envSchema = z.object({
  PUBLIC_EMAILJS_SERVICE_ID: z.string().min(1, 'PUBLIC_EMAILJS_SERVICE_ID is required'),
  PUBLIC_EMAILJS_TEMPLATE_ID: z.string().min(1, 'PUBLIC_EMAILJS_TEMPLATE_ID is required'),
  PUBLIC_EMAILJS_PUBLIC_KEY: z.string().min(1, 'PUBLIC_EMAILJS_PUBLIC_KEY is required'),
});

/**
 * Validated and typed environment variables.
 * Importing this module will throw a ZodError at build time
 * if any required variable is missing or empty.
 */
export const env = envSchema.parse({
  PUBLIC_EMAILJS_SERVICE_ID: import.meta.env.PUBLIC_EMAILJS_SERVICE_ID,
  PUBLIC_EMAILJS_TEMPLATE_ID: import.meta.env.PUBLIC_EMAILJS_TEMPLATE_ID,
  PUBLIC_EMAILJS_PUBLIC_KEY: import.meta.env.PUBLIC_EMAILJS_PUBLIC_KEY,
});
