import { trpc } from '../../lib/trpc';

export const getIdeasTRPCRoute = trpc.procedure.query(async ({ ctx }) => {
  const ideas = await ctx.prisma.idea.findMany({
    select: {
      name: true,
      nick: true,
      id: true,
      description: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return { ideas };
});
