import { type inferRouterOutputs, type inferRouterInputs } from '@trpc/server';
import { trpc } from '../lib/trpc';
import { createIdeaTRPCRoute } from './create-idea';
import { getIdeaTRPCRoute } from './get-idea';
import { getIdeasTRPCRoute } from './get-ideas';
import { getMeTRPCRouter } from './get-me';
import { signInUserTRPCRoute } from './sign-in';
import { signUpUserTRPCRoute } from './signUp';
import { updateIdeaTRPCRoute } from './update-idea';

export const trpcRouter = trpc.router({
  getIdeas: getIdeasTRPCRoute,
  getIdea: getIdeaTRPCRoute,
  createIdea: createIdeaTRPCRoute,
  updateIdea: updateIdeaTRPCRoute,
  signUp: signUpUserTRPCRoute,
  signIn: signInUserTRPCRoute,
  getMe: getMeTRPCRouter,
});

export type TRPCRouter = typeof trpcRouter;
export type TrpcRouterInput = inferRouterInputs<TRPCRouter>;
export type TrpcRouterOutput = inferRouterOutputs<TRPCRouter>;
