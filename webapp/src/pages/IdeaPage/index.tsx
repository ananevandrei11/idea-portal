import { useParams } from 'react-router';
import { LinkButton } from '../../components/Button';
import { Segment } from '../../components/Segment';
import { formatDate } from '../../helpers/formatDate';
import { useUserContext } from '../../lib/context';
import { routes, type IdeaNickParams } from '../../lib/routes';
import { trpc } from '../../lib/trpc';

export function IdeaPage() {
  const { ideaNick } = useParams<IdeaNickParams>();
  const idea = trpc.getIdea.useQuery({
    ideaNick: ideaNick || '',
  });
  const user = useUserContext();

  if (idea.isLoading || idea.isFetching) {
    return <div>Loading...</div>;
  }

  if (idea.isError) {
    return <span>Error: {idea.error.message}</span>;
  }

  if (!idea.data.idea) {
    return <span>Idea not found</span>;
  }
  const ideaData = idea.data.idea;

  return (
    <Segment title={ideaData?.name} titleSize="h1" description={ideaData?.description}>
      <div>
        <b>Created At:&nbsp;</b>
        <time dateTime={ideaData.createdAt.toISOString()}>{formatDate(ideaData.createdAt)}</time>
      </div>
      <div>
        <b>Author:&nbsp;</b>
        {ideaData.user?.nick}
      </div>
      <hr />
      <div dangerouslySetInnerHTML={{ __html: ideaData?.text }} />
      {user?.id === ideaData.userId && (
        <div>
          <LinkButton to={routes.pages.editIdea({ ideaNick: ideaData.nick })}>Edit Idea</LinkButton>
        </div>
      )}
    </Segment>
  );
}
