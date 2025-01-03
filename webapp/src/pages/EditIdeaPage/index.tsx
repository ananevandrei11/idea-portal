import { useParams } from 'react-router';
import { type IdeaNickParams } from '../../lib/routes';
import { trpc } from '../../lib/trpc';
import { EditIdeaForm } from './EditIdeaForm';

export const EditIdeaPage = () => {
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
  if (!userData) {
    return <span>Only for authorized</span>;
  }

  if (userData.id !== ideaData.userId) {
    return <span>An idea can only be edited by the author</span>;
  }

  return <EditIdeaForm idea={ideaData} />;
};
