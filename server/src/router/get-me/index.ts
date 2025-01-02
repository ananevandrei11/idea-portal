import { pick } from 'lodash';
import { trpc } from '../../lib/trpc';

export const getMeTRPCRouter = trpc.procedure.query(({ ctx }) => {
  return { me: ctx.me && pick(ctx.me, ['id', 'nick']) };
});
