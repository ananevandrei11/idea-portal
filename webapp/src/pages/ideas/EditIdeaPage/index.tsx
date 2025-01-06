import { type TrpcRouterOutput } from '@idea-portal/server/src/router';
import { canEditIdea } from '@idea-portal/server/src/utils/can';
import { EditIdeaForm } from './EditIdeaForm';
import { withIdeaData } from '@/components/WithIdeaData';
import { useUserContext } from '@/lib/context';

type Props = {
  idea: NonNullable<TrpcRouterOutput['getIdea']['idea']>;
};

function EditIdeaPage(props: Props) {
  const { idea } = props;
  const user = useUserContext();

  if (!canEditIdea(user, idea)) {
    return <span>An idea can only be edited by the author</span>;
  }

  return <EditIdeaForm idea={idea} />;
}

export const EditIdeaPageRoute = withIdeaData(EditIdeaPage);
