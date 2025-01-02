import jwt from 'jsonwebtoken';
import { env } from '../lib/env';

export function signJWT(userId: string) {
  return jwt.sign({ userId }, env.JWT_SECRET);
}
