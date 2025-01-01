import { ideas } from '../../lib/ideas';
import { trpc } from '../../lib/trpc';
import { createIdeaTRPCInput } from './input';

export const createIdeaTRPCRoute = trpc.procedure.input(createIdeaTRPCInput).mutation(({ input }) => {
  if (ideas.find((i) => i.nick === input.nick)) {
    throw new Error('Nick already exists');
  }
  ideas.unshift(input);
  return true;
});
