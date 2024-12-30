import { TRPCProvider } from './lib/trpc';
import { AllIdeasPage } from './pages/AllIdeasPage';

export const App = () => {
  return (
    <TRPCProvider>
      <div>
        <AllIdeasPage />
      </div>
    </TRPCProvider>
  );
};
