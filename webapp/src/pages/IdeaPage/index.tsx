import { useParams } from 'react-router';
import { Segment } from '../../components/Segment';
import { formatDate } from '../../helpers/formatDate';
import { type IdeaNickParams } from '../../lib/routes';
import { trpc } from '../../lib/trpc';

export function IdeaPage() {
  const params = useParams<IdeaNickParams>();
  const { data, error, isLoading, isFetching, isError } = trpc.getIdea.useQuery({ ideaNick: params.ideaNick || '' });

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }

  if (isError && error) {
    return <div>{error.message}</div>;
  }

  if (!data.idea) {
    return <div>Not found</div>;
  }

  return (
    <Segment title={data.idea?.name} titleSize="h1" description={data.idea?.description}>
      <div>
        <b>Created At:&nbsp;</b>
        <time dateTime={data.idea.createdAt.toISOString()}>{formatDate(data.idea.createdAt)}</time>
      </div>
      <div>
        <b>Author:&nbsp;</b>
        {data.idea.user?.nick}
      </div>
      <hr />
      <div dangerouslySetInnerHTML={{ __html: data.idea?.text }} />
    </Segment>
  );
}
