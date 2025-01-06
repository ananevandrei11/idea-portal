import { trpc } from '../../../lib/trpc';
import { canBlockIdeas } from '../../../utils/can';
import { blockIdeaTRPCInput } from './input';

export const blockIdeaTRPCRoute = trpc.procedure.input(blockIdeaTRPCInput).mutation(async ({ input, ctx }) => {
  if (!ctx.me) {
    throw new Error('Unauthorized');
  }
  if (!canBlockIdeas(ctx.me)) {
    throw new Error('Permissions Denied');
  }
  const { ideaId } = input;
  const idea = await ctx.prisma.idea.findUnique({
    where: {
      id: ideaId,
    },
  });
  if (!idea) {
    throw new Error('NOT_FOUND');
  }
  await ctx.prisma.idea.update({
    where: {
      id: ideaId,
    },
    data: {
      blockedAt: new Date(),
    },
  });
  return true;
});
