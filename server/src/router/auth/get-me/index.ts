import { trpc } from '../../../lib/trpc';
import { toClientMe } from '../../../lib/user';

export const getMeTRPCRouter = trpc.procedure.query(({ ctx }) => {
  return { me: ctx.me && toClientMe(ctx.me) };
});
