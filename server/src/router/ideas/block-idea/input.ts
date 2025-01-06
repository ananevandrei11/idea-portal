import { z } from 'zod';

export const blockIdeaTRPCInput = z.object({
  ideaId: z.string().min(1),
});
