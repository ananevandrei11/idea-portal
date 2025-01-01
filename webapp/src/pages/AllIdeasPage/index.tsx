import { Link } from 'react-router';
import { Segment } from '../../components/Segment';
import { routes } from '../../lib/routes';
import { trpc } from '../../lib/trpc';
import css from './index.module.scss';

export function AllIdeasPage() {
  const { data, isLoading, isFetching } = trpc.getIdeas.useQuery();

  return (
    <div>
      <Segment title="All ideas" titleSize="h1" />
      {isLoading && isFetching && <p>Loading...</p>}
      <ul className={css.list}>
        {data?.ideas.map((idea) => (
          <li key={idea.nick} className={css.idea}>
            <Segment
              titleSize="h3"
              title={<Link to={routes.pages.idea({ ideaNick: idea.nick })}>{idea.name}</Link>}
              description={idea.description}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
