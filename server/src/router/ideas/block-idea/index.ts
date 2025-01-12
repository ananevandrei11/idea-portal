import { sendIdeaBlockedEmail } from '../../../lib/email';
import { trpcLoggedProcedure } from '../../../lib/trpc';
import { canBlockIdeas } from '../../../utils/can';
import { blockIdeaTRPCInput } from './input';

export const blockIdeaTRPCRoute = trpcLoggedProcedure.input(blockIdeaTRPCInput).mutation(async ({ input, ctx }) => {
  if (!ctx.me) {
    throw new Error('UNAUTHORIZED');
  }
  if (!canBlockIdeas(ctx.me)) {
    throw new Error('Permissions Denied');
  }
  const { ideaId } = input;
  const idea = await ctx.prisma.idea.findUnique({
    where: {
      id: ideaId,
    },
    include: {
      user: true,
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
      blockedAt: idea.blockedAt ? null : new Date(),
    },
  });
  await sendIdeaBlockedEmail({ user: idea.user, idea });
  return true;
});
