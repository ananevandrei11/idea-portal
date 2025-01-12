import { type User } from '@prisma/client';
import { pick } from 'lodash';

export function toClientMe(user: User) {
  return pick(user, ['id', 'nick', 'name', 'email', 'permissions', 'avatar']);
}
