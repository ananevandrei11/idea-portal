import { trpc } from '../../lib/trpc';

export function AllIdeasPage() {
  const { data, isLoading, isFetching } = trpc.getIdeas.useQuery();

  return (
    <div>
      <h1>All ideas</h1>
      {isLoading && isFetching && <p>Loading...</p>}
      <ul>{data?.ideas.map((idea) => <li key={idea.nick}>{idea.description}</li>)}</ul>
    </div>
  );
}
