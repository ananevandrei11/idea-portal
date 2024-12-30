import { initTRPC } from '@trpc/server';
import { pick, times } from 'lodash';
import { z } from 'zod';

const ideas = times(100, (i) => ({
  nick: `cool-idea-nick-${i}`,
  name: `Idea ${i}`,
  description: `Description of idea ${i}...`,
  text: times(5, () => `<p>Paragraph ${i}</p>`).join(''),
}));

const trpc = initTRPC.create();

export const trpcRouter = trpc.router({
  getIdeas: trpc.procedure.query(() => {
    return { ideas: ideas.map((idea) => pick(idea, ['nick', 'name', 'description'])) };
  }),
  getIdea: trpc.procedure
    .input(
      z.object({
        ideaNick: z.string(),
      })
    )
    .query(({ input }) => {
      const idea = ideas.find((idea) => idea.nick === input.ideaNick);
      return { idea: idea || null };
    }),
});

export type TRPCRouter = typeof trpcRouter;
