import { type ReactNode } from 'react';
import { Navigate } from 'react-router';
import { useUserContext } from '../../lib/context';
import { routes } from '../../lib/routes';

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const user = useUserContext();

  if (!user) {
    return <Navigate to={routes.pages.signIn} replace />;
  }

  return children;
};
