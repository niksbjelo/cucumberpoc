import { z } from "zod";
import { env } from "~/env.mjs";
import { runCrawl } from "~/server/features/conf/step-definitions/olocal_step";
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
  getTitleFromMusicProduction: publicProcedure.mutation(() => {
    return "g,dspoig,dspg"
  }),
  runCrawl: publicProcedure.mutation(() => {
    return runCrawl()
  }),
});
