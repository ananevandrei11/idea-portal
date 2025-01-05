import { type TrpcRouterOutput } from '@idea-portal/server/src/router';
import { LinkButton } from '@/components/Button';
import { Segment } from '@/components/Segment';
import { withIdeaData } from '@/components/WithIdeaData';
import { formatDate } from '@/helpers/formatDate';
import { useUserContext } from '@/lib/context';
import { routes } from '@/lib/routes';

type Props = {
  idea: NonNullable<TrpcRouterOutput['getIdea']['idea']>;
};

function IdeaPage(props: Props) {
  const { idea } = props;
  const user = useUserContext();

  return (
    <Segment title={idea?.name} titleSize="h1" description={idea?.description}>
      <div>
        <b>Created At:&nbsp;</b>
        <time dateTime={idea.createdAt.toISOString()}>{formatDate(idea.createdAt)}</time>
      </div>
      <div>
        <b>Author:&nbsp;</b>
        {idea.user?.nick}
      </div>
      <hr />
      <div dangerouslySetInnerHTML={{ __html: idea?.text }} />
      {user?.id === idea.userId && (
        <div>
          <LinkButton to={routes.pages.editIdea({ ideaNick: idea.nick })}>Edit Idea</LinkButton>
        </div>
      )}
    </Segment>
  );
}

export const IdeaPageRoute = withIdeaData(IdeaPage);
