import { ideas } from '../../lib/ideas';
import { trpc } from '../../lib/trpc';
import { createIdeaTRPCInput } from './input';

export const createIdeaTRPCRoute = trpc.procedure.input(createIdeaTRPCInput).mutation(({ input }) => {
  ideas.unshift(input);
  return true;
});
