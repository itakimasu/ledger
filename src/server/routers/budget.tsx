import { router, procedure } from '../trpc';
import type { Prisma } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { prisma } from '../prisma';

const defaultList = {
    id: true,
    name: true,
    budget: true,
    spending: true
}

export const budgetRouter = router({
    listAll: procedure
        .query(async() =>{
            const budgets = await prisma.budgetList.findMany({
                select: defaultList,
                where: {}
            });
            return {
                budget: budgets
            };
        }),
    increaseSpending: procedure
        .input(
          z.object({
            id: z.number(),
            spending: z.number(),
          })
        )
        .mutation(async ({ input }) => {
          const updatedBudget = await prisma.budgetList.update({
            where: { id: input.id },
            data: {
              spending: {
                increment: input.spending,
              },
            },
            select: defaultList,
          });
          return updatedBudget;
        }),
})