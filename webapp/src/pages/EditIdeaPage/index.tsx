import { type TrpcRouterOutput } from '@idea-portal/server/src/router';
import { withIdeaData } from '../../components/WithIdeaData';
import { useUserContext } from '../../lib/context';
import { EditIdeaForm } from './EditIdeaForm';

type Props = {
  idea: NonNullable<TrpcRouterOutput['getIdea']['idea']>;
};

function EditIdeaPage(props: Props) {
  const { idea } = props;
  const user = useUserContext();

  if (user?.id !== idea.userId) {
    return <span>An idea can only be edited by the author</span>;
  }

  return <EditIdeaForm idea={idea} />;
}

export const EditIdeaPageRoute = withIdeaData(EditIdeaPage);
