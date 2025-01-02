import { trpc } from '../lib/trpc';
import { createIdeaTRPCRoute } from './create-idea';
import { getIdeaTRPCRoute } from './get-idea';
import { getIdeasTRPCRoute } from './get-ideas';
import { signInUserTRPCRoute } from './sign-in';
import { signUpUserTRPCRoute } from './signUp';

export const trpcRouter = trpc.router({
  getIdeas: getIdeasTRPCRoute,
  getIdea: getIdeaTRPCRoute,
  createIdea: createIdeaTRPCRoute,
  signUp: signUpUserTRPCRoute,
  signIn: signInUserTRPCRoute,
});

export type TRPCRouter = typeof trpcRouter;
