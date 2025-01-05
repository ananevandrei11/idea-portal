import { trpc } from '../../../lib/trpc';
import { toClientMe } from '../../../lib/user';
import { updateProfileTRPCInput } from './input';

export const updateProfileTRPCRoute = trpc.procedure.input(updateProfileTRPCInput).mutation(async ({ input, ctx }) => {
  if (!ctx.me) {
    throw new Error('Unauthorized');
  }
  if (ctx.me.nick !== input.nick) {
    const exUser = await ctx.prisma.idea.findUnique({
      where: {
        nick: input.nick,
      },
    });
    if (exUser) {
      throw new Error('Nick already exists');
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
