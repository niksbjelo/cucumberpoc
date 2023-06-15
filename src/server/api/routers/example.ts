import { z } from "zod";
import { env } from "~/env.mjs";
import { cucumber } from "~/server/features/runCucumber";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      console.log(env.BACKEND_BROWSERLESS);
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  runCrawl: publicProcedure
    .input(
      z.object({
        site: z.string(),
        tag: z.union([z.string(), z.undefined()]),
      }),
    )
    .mutation(async ({ input }) => {
      const { site, tag } = input;
      console.log(site, tag);

      return cucumber.api[site]?.(tag);
    }),
});
