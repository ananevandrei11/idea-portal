import { trpc } from '../../lib/trpc';
import { createIdeaTRPCInput } from './input';

export const createIdeaTRPCRoute = trpc.procedure.input(createIdeaTRPCInput).mutation(async ({ input, ctx }) => {
  const exIdea = await ctx.prisma.idea.findUnique({
    where: {
      nick: input.nick,
    },
  });
  if (exIdea) {
    throw new Error('Nick already exists');
  }
  await ctx.prisma.idea.create({
    data: {
      ...input,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
  return true;
});
