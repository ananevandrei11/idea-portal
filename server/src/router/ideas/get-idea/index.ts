import { z } from 'zod';
import { trpc } from '../../../lib/trpc';

export const getIdeaTRPCRoute = trpc.procedure
  .input(
    z.object({
      ideaNick: z.string(),
    })
  )
  .query(async ({ input, ctx }) => {
    const idea = await ctx.prisma.idea.findUnique({
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
      },
    });
    return { idea };
  });
