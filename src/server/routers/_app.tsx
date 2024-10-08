import { z } from 'zod';
import { procedure, router } from '../trpc';
import { budgetRouter } from './budget';

export const appRouter = router({
  hello: procedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .query((opts) => {
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),
  budget: budgetRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;