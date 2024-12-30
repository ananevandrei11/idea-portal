import { BrowserRouter, Route, Routes } from 'react-router';
import { routes } from './lib/routes';
import { TRPCProvider } from './lib/trpc';
import { AllIdeasPage } from './pages/AllIdeasPage';
import { IdeaPage } from './pages/IdeaPage';

export const App = () => {
  return (
    <TRPCProvider>
      <BrowserRouter>
        <Routes>
          <Route path={routes.pages.allIdeas} element={<AllIdeasPage />} />
          <Route path={routes.pages.idea({ ideaNick: ':ideaNick' })} element={<IdeaPage />} />
        </Routes>
      </BrowserRouter>
    </TRPCProvider>
  );
};
