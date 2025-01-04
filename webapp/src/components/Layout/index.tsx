import { Link, Outlet } from 'react-router';
import { useUserContext } from '../../lib/context';
import { routes } from '../../lib/routes';
import css from './layout.module.scss';

export const Layout = () => {
  const user = useUserContext();

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
              {user && (
                <>
                  <li>
                    <Link to={routes.pages.newIdea} className={css.link}>
                      Add New Idea
                    </Link>
                  </li>
                  <li>
                    <Link to={routes.pages.signOut} className={css.link}>
                      Sign Out <i>({user?.nick})</i>
                    </Link>
                  </li>
                </>
              )}
              {!user && (
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
