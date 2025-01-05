import { trpc } from '../../../lib/trpc';
import { getIdeasTRPCInput } from './input';

export const getIdeasTRPCRoute = trpc.procedure.input(getIdeasTRPCInput).query(async ({ input, ctx }) => {
  const ideas = await ctx.prisma.idea.findMany({
    select: {
      name: true,
      nick: true,
      id: true,
      description: true,
      serialNumber: true,
    },
    orderBy: [
      {
        createdAt: 'desc',
      },
      {
        serialNumber: 'desc',
      },
    ],
    cursor: input.cursor
      ? {
          serialNumber: input.cursor,
        }
      : undefined,
    take: input.limit + 1,
  });
  const nextIdea = ideas.at(input.limit);
  const nextCursor = nextIdea?.serialNumber;
  const ideasExpectNext = ideas.slice(0, input.limit);
  return { ideas: ideasExpectNext, nextCursor };
});
