import { useParams } from 'react-router';
import { LinkButton } from '../../components/Button';
import { Segment } from '../../components/Segment';
import { formatDate } from '../../helpers/formatDate';
import { routes, type IdeaNickParams } from '../../lib/routes';
import { trpc } from '../../lib/trpc';

export function IdeaPage() {
  const { ideaNick } = useParams<IdeaNickParams>();
  const idea = trpc.getIdea.useQuery({
    ideaNick: ideaNick || '',
  });
  const user = trpc.getMe.useQuery();

  if (idea.isLoading || user.isLoading || idea.isFetching || user.isFetching) {
    return <div>Loading...</div>;
  }

  if (idea.isError) {
    return <span>Error: {idea.error.message}</span>;
  }

  if (user.isError) {
    return <span>Error: {user.error.message}</span>;
  }

  if (!idea.data.idea) {
    return <span>Idea not found</span>;
  }
  const ideaData = idea.data.idea;
  const userData = user.data.me;

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
      {userData?.id === ideaData.userId && (
        <div>
          <LinkButton to={routes.pages.editIdea({ ideaNick: ideaData.nick })}>Edit Idea</LinkButton>
        </div>
      )}
    </Segment>
  );
}
