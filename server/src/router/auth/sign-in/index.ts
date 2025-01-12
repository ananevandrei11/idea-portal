import { ExpectedError } from '../../../lib/error';
import { trpcLoggedProcedure } from '../../../lib/trpc';
import { getPasswordHash } from '../../../utils/getPasswordHash';
import { signJWT } from '../../../utils/signJWT';
import { signInTRPCInput } from './input';

export const signInUserTRPCRoute = trpcLoggedProcedure.input(signInTRPCInput).mutation(async ({ input, ctx }) => {
  const user = await ctx.prisma.user.findFirst({
    where: {
      nick: input.nick,
      password: getPasswordHash(input.password),
    },
  });
  if (!user) {
    throw new ExpectedError('Wrong nick or password');
  }
  const token = signJWT(user.id);
  return { token };
});
