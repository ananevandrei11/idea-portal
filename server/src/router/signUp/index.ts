import crypto from 'crypto';
import { trpc } from '../../lib/trpc';
import { signUpTRPCInput } from './input';

export const createIdeaTRPCRoute = trpc.procedure.input(signUpTRPCInput).mutation(async ({ input, ctx }) => {
  const exUser = await ctx.prisma.user.findUnique({
    where: {
      nick: input.nick,
    },
  });
  if (exUser) {
    throw new Error('User with this nick already exists');
  }
  await ctx.prisma.user.create({
    data: {
      ...input,
      password: crypto.createHash('sha256').update(input.password).digest('hex'),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
  return true;
});
