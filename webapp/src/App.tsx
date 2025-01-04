import { BrowserRouter, Route, Routes } from 'react-router';
import { Layout } from './components/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AppContextProvider } from './lib/context';
import { routes } from './lib/routes';
import { TRPCProvider } from './lib/trpc';
import { AllIdeasPage } from './pages/AllIdeasPage';
import { EditIdeaPage } from './pages/EditIdeaPage';
import { IdeaPage } from './pages/IdeaPage';
import './styles/global.scss';
import { NewIdeaPage } from './pages/NewIdeaPage';
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
              <Route path={routes.pages.idea({ ideaNick: ':ideaNick' })} element={<IdeaPage />} />
              <Route
                path={routes.pages.editIdea({ ideaNick: ':ideaNick' })}
                element={
                  <ProtectedRoute>
                    <EditIdeaPage />
                  </ProtectedRoute>
                }
              />
              <Route path={routes.pages.newIdea} element={<NewIdeaPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppContextProvider>
    </TRPCProvider>
  );
};
