import { type AppContext } from '../lib/context';
import { env } from '../lib/env';
import { getPasswordHash } from '../utils/getPasswordHash';

export const presetDB = async (ctx: AppContext) => {
  await ctx.prisma.user.upsert({
    where: {
      nick: 'admin',
    },
    create: {
      nick: 'admin',
      password: getPasswordHash(env.INITIAL_ADMIN_PASSWORD),
      permissions: ['ALL'],
    },
    update: {
      permissions: ['ALL'],
    },
  });
};
