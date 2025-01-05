import { type TrpcRouterOutput } from '@idea-portal/server/src/router';
import { createContext, useContext, type ReactNode } from 'react';
import { trpc } from './trpc';
import { Loader } from '@/components/Loader';

export type AppContextType = {
  user: TrpcRouterOutput['getMe']['me'];
};

const AppContext = createContext<AppContextType | null>(null);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const { data, isFetching, isLoading } = trpc.getMe.useQuery();
  return (
    <AppContext.Provider value={{ user: data?.me || null }}>
      {isFetching || isLoading ? <Loader variant="page" /> : children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within a AppContextProvider');
  }
  return context;
};

export const useUserContext = () => {
  const { user } = useAppContext();
  return user;
};
