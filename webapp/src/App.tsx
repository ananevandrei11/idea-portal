import { BrowserRouter, Route, Routes } from 'react-router';
import { Layout } from './components/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AppContextProvider } from './lib/context';
import { routes } from './lib/routes';
import { TRPCProvider } from './lib/trpc';
import { AllIdeasPage } from './pages/AllIdeasPage';
import { EditIdeaPageRoute } from './pages/EditIdeaPage';
import { IdeaPageRoute } from './pages/IdeaPage';
import './styles/global.scss';
import { NewIdeaPage } from './pages/NewIdeaPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { SingInPage } from './pages/SingInPage';
import { SignOutPage } from './pages/SingOutPage';
import { SingUpPage } from './pages/SingUpPage';

export const App = () => {
  return (
    <TRPCProvider>
      <AppContextProvider>
        <BrowserRouter>
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
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppContextProvider>
    </TRPCProvider>
  );
};
