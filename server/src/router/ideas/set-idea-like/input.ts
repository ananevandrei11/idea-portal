import { z } from 'zod';

export const setIdeaLikeIdeaTRPCInput = z.object({
  ideaId: z.string().min(1),
  isLikedByMe: z.boolean(),
});
