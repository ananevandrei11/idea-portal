import { z } from 'zod';
import { createIdeaTRPCInput } from '../create-idea/input';

export const updateIdeaTRPCInput = createIdeaTRPCInput.extend({
  ideaId: z.string().min(1),
});
