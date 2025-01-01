import { trpc } from '../lib/trpc';
import { createIdeaTRPCRoute } from './create-idea';
import { getIdeaTRPCRoute } from './get-idea';
import { getIdeasTRPCRoute } from './get-ideas';

export const trpcRouter = trpc.router({
  getIdeas: getIdeasTRPCRoute,
  getIdea: getIdeaTRPCRoute,
  createIdea: createIdeaTRPCRoute,
});

export type TRPCRouter = typeof trpcRouter;
