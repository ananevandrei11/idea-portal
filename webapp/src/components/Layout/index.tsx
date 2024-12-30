import { Link, Outlet } from 'react-router';
import { routes } from '../../lib/routes';
import css from './layout.module.scss';

export const Layout = () => {
  return (
    <div className={css.layout}>
      <header className={css.header}>
        <div className={css.headerBody}>
          <div className={css.logo}>
            <b>Idea Portal</b>
          </div>
          <nav>
            <Link to={routes.pages.allIdeas} className={css.link}>
              All Ideas
            </Link>
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
