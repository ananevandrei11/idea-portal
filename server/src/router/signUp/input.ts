import { z } from 'zod';

export const signUpTRPCInput = z.object({
  name: z.string().min(1),
  nick: z
    .string()
    .min(1)
    .regex(/^[a-z0-9-]+$/, 'Nick must contain only letters'),
  password: z.string().min(4),
});
