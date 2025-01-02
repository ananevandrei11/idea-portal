import { BrowserRouter, Route, Routes } from 'react-router';
import { Layout } from './components/Layout';
import { routes } from './lib/routes';
import { TRPCProvider } from './lib/trpc';
import { AllIdeasPage } from './pages/AllIdeasPage';
import { IdeaPage } from './pages/IdeaPage';
import './styles/global.scss';
import { NewIdeaPage } from './pages/NewIdeaPage';
import { SingUpPage } from './pages/SingUpPage';

export const App = () => {
  return (
    <TRPCProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path={routes.pages.singUp} element={<SingUpPage />} />
            <Route path={routes.pages.allIdeas} element={<AllIdeasPage />} />
            <Route path={routes.pages.idea({ ideaNick: ':ideaNick' })} element={<IdeaPage />} />
            <Route path={routes.pages.newIdea} element={<NewIdeaPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TRPCProvider>
  );
};
