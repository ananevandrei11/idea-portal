import { trpc } from '../../lib/trpc';
import { updateIdeaTRPCInput } from './input';

export const updateIdeaTRPCRoute = trpc.procedure.input(updateIdeaTRPCInput).mutation(async ({ input, ctx }) => {
  if (!ctx.me) {
    throw new Error('Unauthorized');
  }
  const { ideaId, ...inputData } = input;
  const idea = await ctx.prisma.idea.findUnique({
    where: {
      id: ideaId,
    },
  });
  if (!idea) {
    throw new Error('NOT_FOUND');
  }
  if (idea.nick !== input.nick) {
    const exIdea = await ctx.prisma.idea.findUnique({
      where: {
        nick: input.nick,
      },
    });
    if (exIdea) {
      throw new Error('Nick already exists');
    }
  }
  await ctx.prisma.idea.update({
    where: {
      id: ideaId,
    },
    data: {
      ...inputData,
      updatedAt: new Date(),
    },
  });
  return true;
});
