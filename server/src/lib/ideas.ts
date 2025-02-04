import { times } from 'lodash';

export const ideas = times(100, (i) => ({
  nick: `cool-idea-nick-${i}`,
  name: `Idea ${i}`,
  description: `Description of idea ${i}...`,
  text: times(5, () => `<p>Paragraph ${i}</p>`).join(''),
}));
