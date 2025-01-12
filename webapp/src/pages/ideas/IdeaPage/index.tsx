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
      {idea.user.avatar && (
        <>
          <figure style={{ borderRadius: '50%', overflow: 'hidden', width: '100%', maxWidth: '80px' }}>
            <img
              src={idea.user.avatar || ''}
              alt={idea.name}
              style={{
                width: '100%',
                aspectRatio: 1 / 1,
                objectFit: 'cover',
                objectPosition: 'center',
                verticalAlign: 'middle',
              }}
            />
          </figure>
          <hr />
        </>
      )}
      <div dangerouslySetInnerHTML={{ __html: idea?.text }} />
      <div
        style={{
          display: 'grid',
          width: '100%',
          columnGap: '1rem',
          rowGap: '1rem',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        }}
      >
        {idea.images.length > 0 &&
          idea.images.map((preview) => (
            <figure key={preview}>
              <img
                src={preview}
                alt=" "
                style={{
                  width: '100%',
                  aspectRatio: 1 / 1,
                  objectFit: 'cover',
                  objectPosition: 'center',
                  verticalAlign: 'middle',
                }}
              />
            </figure>
          ))}
      </div>
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
