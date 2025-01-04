import { useParams } from 'react-router';
import { useUserContext } from '../../lib/context';
import { type IdeaNickParams } from '../../lib/routes';
import { trpc } from '../../lib/trpc';
import { EditIdeaForm } from './EditIdeaForm';

export const EditIdeaPage = () => {
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

  if (user?.id !== ideaData.userId) {
    return <span>An idea can only be edited by the author</span>;
  }

  return <EditIdeaForm idea={ideaData} />;
};
