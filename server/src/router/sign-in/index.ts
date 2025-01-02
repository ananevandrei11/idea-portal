import { trpc } from '../../lib/trpc';
import { getPasswordHash } from '../../utils/getPasswordHash';
import { signInTRPCInput } from './input';

export const signInUserTRPCRoute = trpc.procedure.input(signInTRPCInput).mutation(async ({ input, ctx }) => {
  const user = await ctx.prisma.user.findFirst({
    where: {
      nick: input.nick,
      password: getPasswordHash(input.password),
    },
  });
  if (!user) {
    throw new Error('Wrong nick or password');
  }
  return true;
});
