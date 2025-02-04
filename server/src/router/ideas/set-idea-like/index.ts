import { ExpectedError } from '../../../lib/error';
import { trpcLoggedProcedure } from '../../../lib/trpc';
import { setIdeaLikeIdeaTRPCInput } from './input';

export const setIdeaLikeIdeaTRPCRoute = trpcLoggedProcedure
  .input(setIdeaLikeIdeaTRPCInput)
  .mutation(async ({ input, ctx }) => {
    if (!ctx.me) {
      throw new Error('UNAUTHORIZED');
    }
    const { ideaId, isLikedByMe } = input;
    const idea = await ctx.prisma.idea.findUnique({
      where: {
        id: ideaId,
      },
    });
    if (!idea) {
      throw new ExpectedError('Idea not found');
    }
    if (isLikedByMe) {
      await ctx.prisma.ideaLike.upsert({
        where: {
          ideaId_userId: {
            ideaId,
            userId: ctx.me.id,
          },
        },
        create: {
          userId: ctx.me.id,
          ideaId,
        },
        update: {},
      });
    } else {
      await ctx.prisma.ideaLike.delete({
        where: {
          ideaId_userId: {
            ideaId,
            userId: ctx.me.id,
          },
        },
      });
    }

    const likesCount = await ctx.prisma.ideaLike.count({
      where: {
        ideaId,
      },
    });

    return {
      idea: {
        id: idea.id,
        likesCount,
        isLikedByMe,
      },
    };
  });
