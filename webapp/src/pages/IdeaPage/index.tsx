import { useParams } from 'react-router';
import { Segment } from '../../components/Segment';
import { type IdeaNickParams } from '../../lib/routes';
import { trpc } from '../../lib/trpc';

export function IdeaPage() {
  const params = useParams<IdeaNickParams>();
  const { data, isLoading, isFetching, isError } = trpc.getIdea.useQuery({ ideaNick: params.ideaNick || '' });

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }

  if (isError || !data || !data.idea) {
    return <div>Not found</div>;
  }

  return (
    <Segment title={data.idea?.name} titleSize="h1" description={data.idea?.description}>
      <div dangerouslySetInnerHTML={{ __html: data.idea?.text }} />
    </Segment>
  );
}
