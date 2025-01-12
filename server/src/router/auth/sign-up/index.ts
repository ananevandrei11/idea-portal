import { sendWelcomeEmail } from '../../../lib/email';
import { ExpectedError } from '../../../lib/error';
import { trpcLoggedProcedure } from '../../../lib/trpc';
import { getPasswordHash } from '../../../utils/getPasswordHash';
import { signJWT } from '../../../utils/signJWT';
import { signUpTRPCInput } from './input';

export const signUpUserTRPCRoute = trpcLoggedProcedure.input(signUpTRPCInput).mutation(async ({ input, ctx }) => {
  const exUser = await ctx.prisma.user.findUnique({
    where: {
      nick: input.nick,
    },
  });
  if (exUser) {
    throw new ExpectedError('User with this nick already exists');
  }
  const exUserEmail = await ctx.prisma.user.findUnique({
    where: {
      email: input.email,
    },
  });
  if (exUserEmail) {
    throw new ExpectedError('User with this email already exists');
  }
  const user = await ctx.prisma.user.create({
    data: {
      nick: input.nick,
      password: getPasswordHash(input.password),
      email: input.email,
    },
  });
  await sendWelcomeEmail({ user });
  const token = signJWT(user.id);
  return { token };
});
