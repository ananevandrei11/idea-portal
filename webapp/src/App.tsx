import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Route, Routes } from 'react-router';
import { Layout } from './components/Layout';
import { NotAuthRouteTracker } from './components/NotAuthRouteTracker';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AppContextProvider } from './lib/context';
import { routes } from './lib/routes';
import { SentryUser } from './lib/sentry';
import { TRPCProvider } from './lib/trpc';
import { NotFoundPage } from './pages/accessory/NotFoundPage';
import { SingInPage } from './pages/auth/SingInPage';
import { SignOutPage } from './pages/auth/SingOutPage';
import { SingUpPage } from './pages/auth/SingUpPage';
import { UpdateProfilePage } from './pages/auth/UpdateProfilePage';
import { AllIdeasPage } from './pages/ideas/AllIdeasPage';
import { EditIdeaPageRoute } from './pages/ideas/EditIdeaPage';
import { IdeaPageRoute } from './pages/ideas/IdeaPage';
import './styles/global.scss';
import { NewIdeaPage } from './pages/ideas/NewIdeaPage';

export const App = () => {
  return (
    <HelmetProvider>
      <TRPCProvider>
        <AppContextProvider>
          <BrowserRouter>
            <SentryUser />
            <NotAuthRouteTracker />
            <Routes>
              <Route element={<Layout />}>
                <Route path={routes.pages.singUp} element={<SingUpPage />} />
                <Route path={routes.pages.signIn} element={<SingInPage />} />
                <Route path={routes.pages.signOut} element={<SignOutPage />} />
                <Route path={routes.pages.allIdeas} element={<AllIdeasPage />} />
                <Route path={routes.pages.idea({ ideaNick: ':ideaNick' })} element={<IdeaPageRoute />} />
                <Route
                  path={routes.pages.editIdea({ ideaNick: ':ideaNick' })}
                  element={
                    <ProtectedRoute>
                      <EditIdeaPageRoute />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path={routes.pages.newIdea}
                  element={
                    <ProtectedRoute>
                      <NewIdeaPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path={routes.pages.updateProfile}
                  element={
                    <ProtectedRoute>
                      <UpdateProfilePage />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </AppContextProvider>
      </TRPCProvider>
    </HelmetProvider>
  );
};
