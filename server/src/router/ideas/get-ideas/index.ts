import { omit } from 'lodash';
import { trpcLoggedProcedure } from '../../../lib/trpc';
import { getIdeasTRPCInput } from './input';

export const getIdeasTRPCRoute = trpcLoggedProcedure.input(getIdeasTRPCInput).query(async ({ input, ctx }) => {
  const normalizedSearch = input.search ? input.search.trim().replace(/[\s\n\t]/g, ' & ') : undefined;
  const rawIdeas = await ctx.prisma.idea.findMany({
    select: {
      name: true,
      nick: true,
      id: true,
      description: true,
      serialNumber: true,
      _count: {
        select: {
          ideasLikes: true,
        },
      },
    },
    where: {
      blockedAt: null,
      ...(normalizedSearch && {
        OR: [
          {
            name: {
              search: normalizedSearch,
            },
          },
          {
            description: {
              search: normalizedSearch,
            },
          },
          {
            text: {
              search: normalizedSearch,
            },
          },
        ],
      }),
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

  const nextIdea = rawIdeas.at(input.limit);
  const nextCursor = nextIdea?.serialNumber;
  const rawIdeasExpectNext = rawIdeas.slice(0, input.limit);
  const ideasExceptNext = rawIdeasExpectNext.map((idea) => ({
    ...omit(idea, ['_count']),
    likesCount: idea._count.ideasLikes,
  }));
  return { ideas: ideasExceptNext, nextCursor };
});
