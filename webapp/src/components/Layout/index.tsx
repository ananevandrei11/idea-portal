import { Link, Outlet } from 'react-router';
import { routes } from '../../lib/routes';
import { trpc } from '../../lib/trpc';
import css from './layout.module.scss';

export const Layout = () => {
  const { data, isLoading, isFetching, isError } = trpc.getMe.useQuery();
  const isEmptyUser = isLoading || isFetching || isError;
  const isUser = data?.me;
  return (
    <div className={css.layout}>
      <header className={css.header}>
        <div className={css.headerBody}>
          <div className={css.logo}>
            <b>Idea Portal</b>
          </div>
          <nav>
            <ul>
              <li>
                <Link to={routes.pages.allIdeas} className={css.link}>
                  All Ideas
                </Link>
              </li>
              {!isEmptyUser && isUser && (
                <>
                  <li>
                    <Link to={routes.pages.newIdea} className={css.link}>
                      Add New Idea
                    </Link>
                  </li>
                  <li>
                    <Link to={routes.pages.signOut} className={css.link}>
                      Sign Out <i>({data?.me?.nick})</i>
                    </Link>
                  </li>
                </>
              )}
              {!isEmptyUser && !isUser && (
                <>
                  <li>
                    <Link to={routes.pages.singUp} className={css.link}>
                      Sign Up
                    </Link>
                  </li>
                  <li>
                    <Link to={routes.pages.signIn} className={css.link}>
                      Sign In
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>
      <main className={css.main}>
        <Outlet />
      </main>
      <footer className={css.footer}>2025 &copy;</footer>
    </div>
  );
};
