import { type TrpcRouterOutput } from '@idea-portal/server/src/router';
import { createContext, useContext, type ReactNode } from 'react';
import { trpc } from './trpc';

export type AppContextType = {
  user: TrpcRouterOutput['getMe']['me'];
};

const AppContext = createContext<AppContextType | null>(null);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const { data, isFetching, isLoading } = trpc.getMe.useQuery();
  return (
    <AppContext.Provider value={{ user: data?.me || null }}>
      {isFetching || isLoading ? <div>...Loading</div> : children}
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
