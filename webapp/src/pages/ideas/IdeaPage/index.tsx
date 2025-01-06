import { type TrpcRouterOutput } from '@idea-portal/server/src/router';
import { canBlockIdeas, canEditIdea } from '@idea-portal/server/src/utils/can';
import { BlockIdea } from './BlockIdea';
import { Alert } from '@/components/Alert';
import { LinkButton } from '@/components/Button';
import { LikeSegment } from '@/components/LikeSegment';
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
      {idea.blockedAt && <Alert type="error">IDEA IS BLOCKED: {formatDate(idea.blockedAt)}</Alert>}
      <div>
        <b>Created At:&nbsp;</b>
        <time dateTime={idea.createdAt.toISOString()}>{formatDate(idea.createdAt)}</time>
      </div>
      <div>
        <b>Author:&nbsp;</b>
        {idea.user?.name}
      </div>
      <hr />
      <div dangerouslySetInnerHTML={{ __html: idea?.text }} />
      {user && (
        <>
          <br />
          <LikeSegment idea={idea} />
        </>
      )}
      {canEditIdea(user, idea) && (
        <>
          <br />
          <div>
            <LinkButton to={routes.pages.editIdea({ ideaNick: idea.nick })}>Edit Idea</LinkButton>
          </div>
        </>
      )}
      {canBlockIdeas(user) && (
        <>
          <br />
          <BlockIdea idea={idea} />
        </>
      )}
    </Segment>
  );
}

export const IdeaPageRoute = withIdeaData(IdeaPage);
