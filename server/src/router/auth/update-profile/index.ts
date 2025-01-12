import { ExpectedError } from '../../../lib/error';
import { trpcLoggedProcedure } from '../../../lib/trpc';
import { toClientMe } from '../../../lib/user';
import { updateProfileTRPCInput } from './input';

export const updateProfileTRPCRoute = trpcLoggedProcedure
  .input(updateProfileTRPCInput)
  .mutation(async ({ input, ctx }) => {
    if (!ctx.me) {
      throw new Error('UNAUTHORIZED');
    }
    if (ctx.me.nick !== input.nick) {
      const exUser = await ctx.prisma.user.findUnique({
        where: {
          nick: input.nick,
        },
      });
      if (exUser) {
        throw new ExpectedError('Nick already exists');
      }
    }
    const updateUser = await ctx.prisma.user.update({
      where: {
        id: ctx.me.id,
      },
      data: input,
    });
    ctx.me = updateUser;
    return toClientMe(updateUser);
  });
