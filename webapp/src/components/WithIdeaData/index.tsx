import { type TrpcRouterOutput } from '@idea-portal/server/src/router';
import { type ComponentType } from 'react';
import { useParams } from 'react-router';
import { type IdeaNickParams } from '../../lib/routes';
import { trpc } from '../../lib/trpc';
import { NotFoundPage } from '../../pages/NotFoundPage';
import { ErrorPageComponent } from '../ErrorComponent';

export function withIdeaData<T>(
  WrappedComponent: ComponentType<T & { idea: NonNullable<TrpcRouterOutput['getIdea']['idea']> }>
) {
  return function IdeaDataHOC(props: T) {
    const { ideaNick } = useParams<IdeaNickParams>();
    const idea = trpc.getIdea.useQuery({
      ideaNick: ideaNick || '',
    });

    if (idea.isLoading || idea.isFetching) {
      return <div>Loading...</div>;
    }

    if (idea.isError) {
      return <ErrorPageComponent title="Error" message={idea.error.message} />;
    }

    if (!idea.data?.idea) {
      return <NotFoundPage message="Idea not found" />;
    }

    return <WrappedComponent {...props} idea={idea.data.idea} />;
  };
}
