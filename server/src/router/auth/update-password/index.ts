import { ExpectedError } from '../../../lib/error';
import { trpcLoggedProcedure } from '../../../lib/trpc';
import { getPasswordHash } from '../../../utils/getPasswordHash';
import { updatePasswordTRPCInput } from './input';

export const updatePasswordTRPCRoute = trpcLoggedProcedure
  .input(updatePasswordTRPCInput)
  .mutation(async ({ input, ctx }) => {
    if (!ctx.me) {
      throw new Error('UNAUTHORIZED');
    }
    if (ctx.me.password !== getPasswordHash(input.oldPassword)) {
      throw new ExpectedError('Wrong old password');
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
