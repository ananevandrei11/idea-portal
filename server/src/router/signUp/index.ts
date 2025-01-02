import { trpc } from '../../lib/trpc';
import { getPasswordHash } from '../../utils/getPasswordHash';
import { signJWT } from '../../utils/signJWT';
import { signUpTRPCInput } from './input';

export const signUpUserTRPCRoute = trpc.procedure.input(signUpTRPCInput).mutation(async ({ input, ctx }) => {
  const exUser = await ctx.prisma.user.findUnique({
    where: {
      nick: input.nick,
    },
  });
  if (exUser) {
    throw new Error('User with this nick already exists');
  }
  const user = await ctx.prisma.user.create({
    data: {
      nick: input.nick,
      password: getPasswordHash(input.password),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
  const token = signJWT(user.id);
  return { token };
});
