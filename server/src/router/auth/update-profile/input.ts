import { z } from 'zod';

export const updateProfileTRPCInput = z.object({
  nick: z
    .string()
    .min(1)
    .regex(/^[a-z0-9-]+$/, 'Nick must contain only letters'),
  name: z.string().min(1),
  avatar: z.string().nullable().optional(),
});
