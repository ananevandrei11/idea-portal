import { z } from 'zod';

export const createIdeaTRPCInput = z.object({
  name: z.string().min(1),
  nick: z
    .string()
    .min(1)
    .regex(/^[a-z0-9-]+$/, 'Nick must contain only letters'),
  description: z.string().min(1),
  text: z.string().min(10, 'Text must be at least 10 characters long'),
  images: z.array(z.string()),
});
