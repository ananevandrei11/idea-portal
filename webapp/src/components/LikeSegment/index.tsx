import { type TrpcRouterOutput } from '@idea-portal/server/src/router';
import clsx from 'clsx';
import { Button } from '../Button';
import css from './index.module.scss';
import { trpc } from '@/lib/trpc';

type Props = {
  idea: NonNullable<TrpcRouterOutput['getIdea']['idea']>;
};

export function LikeSegment(props: Props) {
  const { idea } = props;
  const trpcUtils = trpc.useContext();
  const setIdeaLike = trpc.setIdeaLike.useMutation({
    onMutate: ({ isLikedByMe }) => {
      const oldGetIdeaData = trpcUtils.getIdea.getData({ ideaNick: idea.nick });

      if (oldGetIdeaData?.idea) {
        const newGetIdeaData = {
          ...oldGetIdeaData,
          idea: {
            ...oldGetIdeaData.idea,
            isLikedByMe,
            likesCount: oldGetIdeaData.idea.likesCount + (isLikedByMe ? 1 : -1),
          },
        };
        trpcUtils.getIdea.setData({ ideaNick: idea.nick }, newGetIdeaData);
      }
    },
    onSuccess: async () => {
      await trpcUtils.getIdea.invalidate({ ideaNick: idea.nick });
    },
  });

  const onClick = () => {
    setIdeaLike
      .mutateAsync({ ideaId: idea.id, isLikedByMe: !idea.isLikedByMe })
      .then(() => {})
      .catch(() => {});
  };
  return (
    <div>
      <b
        className={clsx({
          [css.me]: idea.isLikedByMe,
        })}
      >
        Likes: {idea.likesCount}
      </b>
      <br />
      <Button type="button" onClick={onClick}>
        Like
      </Button>
    </div>
  );
}
