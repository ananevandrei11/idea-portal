import { atom } from 'nanostores';
import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { routes } from '../../lib/routes';

export const lastVisistedNotAuthRouteStore = atom(routes.pages.allIdeas);

export const NotAuthRouteTracker = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    const authRoutes = [routes.pages.signIn, routes.pages.singUp, routes.pages.signOut];
    const isAuthRoute = authRoutes.includes(pathname);
    if (!isAuthRoute) {
      lastVisistedNotAuthRouteStore.set(pathname);
    }
  }, [pathname]);

  return null;
};
export function NoNAuthRouteTracker() {}
