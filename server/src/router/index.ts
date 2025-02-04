import { type inferRouterOutputs, type inferRouterInputs } from '@trpc/server';
import { createTrpcRouter } from '../lib/trpc';
import { getMeTRPCRouter } from './auth/get-me';
import { signInUserTRPCRoute } from './auth/sign-in';
import { signUpUserTRPCRoute } from './auth/sign-up';
import { updatePasswordTRPCRoute } from './auth/update-password';
import { updateProfileTRPCRoute } from './auth/update-profile';
import { blockIdeaTRPCRoute } from './ideas/block-idea';
import { createIdeaTRPCRoute } from './ideas/create-idea';
import { getIdeaTRPCRoute } from './ideas/get-idea';
import { getIdeasTRPCRoute } from './ideas/get-ideas';
import { setIdeaLikeIdeaTRPCRoute } from './ideas/set-idea-like';
import { updateIdeaTRPCRoute } from './ideas/update-idea';

export const trpcRouter = createTrpcRouter({
  getIdeas: getIdeasTRPCRoute,
  getIdea: getIdeaTRPCRoute,
  createIdea: createIdeaTRPCRoute,
  updateIdea: updateIdeaTRPCRoute,
  signUp: signUpUserTRPCRoute,
  signIn: signInUserTRPCRoute,
  getMe: getMeTRPCRouter,
  updateProfile: updateProfileTRPCRoute,
  updatePassword: updatePasswordTRPCRoute,
  setIdeaLike: setIdeaLikeIdeaTRPCRoute,
  blockIdea: blockIdeaTRPCRoute,
});

export type TRPCRouter = typeof trpcRouter;
export type TrpcRouterInput = inferRouterInputs<TRPCRouter>;
export type TrpcRouterOutput = inferRouterOutputs<TRPCRouter>;
