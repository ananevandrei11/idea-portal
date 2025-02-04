import { ExpectedError } from '../../../lib/error';
import { trpcLoggedProcedure } from '../../../lib/trpc';
import { canEditIdea } from '../../../utils/can';
import { updateIdeaTRPCInput } from './input';

export const updateIdeaTRPCRoute = trpcLoggedProcedure.input(updateIdeaTRPCInput).mutation(async ({ input, ctx }) => {
  if (!ctx.me) {
    throw new Error('UNAUTHORIZED');
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

  if (!canEditIdea(ctx.me, idea)) {
    throw new Error('NOT_YOUR_IDEA');
  }

  if (idea.nick !== input.nick) {
    const exIdea = await ctx.prisma.idea.findUnique({
      where: {
        nick: input.nick,
      },
    });
    if (exIdea) {
      throw new ExpectedError('Nick already exists');
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
