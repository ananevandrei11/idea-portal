import { omit } from 'lodash';
import { z } from 'zod';
import { trpc } from '../../../lib/trpc';
import { hasPermission } from '../../../utils/can';

export const getIdeaTRPCRoute = trpc.procedure
  .input(
    z.object({
      ideaNick: z.string(),
    })
  )
  .query(async ({ input, ctx }) => {
    const rawIdea = await ctx.prisma.idea.findUnique({
      where: {
        nick: input.ideaNick,
      },
      include: {
        user: {
          select: {
            id: true,
            nick: true,
            name: true,
          },
        },
        ideasLikes: {
          select: {
            id: true,
          },
          where: {
            userId: ctx.me?.id,
          },
        },
        _count: {
          select: {
            ideasLikes: true,
          },
        },
      },
    });

    if (rawIdea?.blockedAt && !hasPermission(ctx.me, 'ALL')) {
      throw new Error('Idea is blocked');
    }

    const isLikedByMe = !!rawIdea?.ideasLikes.length;
    const likesCount = rawIdea?._count.ideasLikes || 0;
    const idea = rawIdea && { ...omit(rawIdea, ['ideasLikes', '_count']), isLikedByMe, likesCount };

    return { idea };
  });
