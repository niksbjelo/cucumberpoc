import { z } from "zod";
import { createEnv } from "@t3-oss/env-nextjs";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    BACKEND_BROWSERLESS_URL: z.string(),
    BACKEND_BROWSERLESS_TOKEN: z.string(),
    BACKEND_BROWSERLESS: z.string(),
    NODE_ENV: z.enum(["development", "test", "production"]),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string().min(1),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    BACKEND_BROWSERLESS_URL: process.env.BACKEND_BROWSERLESS_URL,
    BACKEND_BROWSERLESS_TOKEN: process.env.BACKEND_BROWSERLESS_TOKEN,
    BACKEND_BROWSERLESS: process.env.BACKEND_BROWSERLESS,
    NODE_ENV: process.env.NODE_ENV,
    // NEXT_PUBLIC_CLIENTVAR: process.env.NEXT_PUBLIC_CLIENTVAR,
  },
});
