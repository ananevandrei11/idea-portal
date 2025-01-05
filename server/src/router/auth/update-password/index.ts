import { trpc } from '../../../lib/trpc';
import { getPasswordHash } from '../../../utils/getPasswordHash';
import { updatePasswordTRPCInput } from './input';

export const updatePasswordTRPCRoute = trpc.procedure
  .input(updatePasswordTRPCInput)
  .mutation(async ({ input, ctx }) => {
    if (!ctx.me) {
      throw new Error('Unauthorized');
    }
    if (ctx.me.password !== getPasswordHash(input.oldPassword)) {
      throw new Error('Wrong old password');
    }
    const updateUser = await ctx.prisma.user.update({
      where: {
        id: ctx.me.id,
      },
      data: {
        password: getPasswordHash(input.newPassword),
      },
    });
    ctx.me = updateUser;
    return true;
  });
