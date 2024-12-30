import { Link } from 'react-router';
import { routes } from '../../lib/routes';
import { trpc } from '../../lib/trpc';

export function AllIdeasPage() {
  const { data, isLoading, isFetching } = trpc.getIdeas.useQuery();

  return (
    <div>
      <h1>All ideas</h1>
      {isLoading && isFetching && <p>Loading...</p>}
      <ul>
        {data?.ideas.map((idea) => (
          <li key={idea.nick}>
            <Link to={routes.pages.idea({ ideaNick: idea.nick })}>{idea.description}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
