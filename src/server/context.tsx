import type * as trpcNext from '@trpc/server/adapters/next';
import { PrismaClient } from "@prisma/client";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface CreateContextOptions {
  // session: Session | null
}

/**
 * Inner function for `createContext` where we create the context.
 * This is useful for testing when we don't want to mock Next.js' request/response
 */
export async function createContextInner(_opts: CreateContextOptions) {
    const prisma = new PrismaClient();

    return { prisma };;
}

export type Context = Awaited<ReturnType<typeof createContextInner>>;

export async function createContext(
    opts: trpcNext.CreateNextContextOptions,
  ): Promise<Context> {
    // for API-response caching see https://trpc.io/docs/caching
  
    return await createContextInner({});
  }