import * as dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const zEnvNonemptyTrimmed = z.string().trim().min(1);

const zEnv = z.object({
  PORT: zEnvNonemptyTrimmed,
  DATABASE_URL: zEnvNonemptyTrimmed,
  JWT_SECRET: zEnvNonemptyTrimmed,
  PASSWORD_SALT: zEnvNonemptyTrimmed,
  INITIAL_ADMIN_PASSWORD: zEnvNonemptyTrimmed,
  WEBAPP_URL: zEnvNonemptyTrimmed,
  HOST_ENV: zEnvNonemptyTrimmed,
  DEBUG: zEnvNonemptyTrimmed,
});

// eslint-disable-next-line node/no-process-env
export const env = zEnv.parse(process.env);
