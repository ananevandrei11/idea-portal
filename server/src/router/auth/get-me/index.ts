import { trpcLoggedProcedure } from '../../../lib/trpc';
import { toClientMe } from '../../../lib/user';

export const getMeTRPCRouter = trpcLoggedProcedure.query(({ ctx }) => {
  return { me: ctx.me && toClientMe(ctx.me) };
});
