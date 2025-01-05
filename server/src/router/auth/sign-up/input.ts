import { z } from 'zod';

export const signUpTRPCInput = z.object({
  nick: z
    .string()
    .min(1)
    .regex(/^[a-z0-9-]+$/, 'Nick must contain only letters'),
  password: z.string().min(4),
});
