import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { env } from '../../lib/env';
import { routes } from '../../lib/routes';
import { trpc } from '../../lib/trpc';

export const SignOutPage = () => {
  const navigate = useNavigate();
  const trpsUtils = trpc.useUtils();

  useEffect(() => {
    const singOutEvent = async () => {
      Cookies.remove(env.VITE_NAME_TOKEN_COOKIE);
      await trpsUtils.invalidate().then(async () => {
        await navigate(routes.pages.signIn, { replace: true });
      });
    };
    singOutEvent()
      .then(() => {})
      .catch(() => {});
  }, [navigate, trpsUtils]);

  return <div>...Loading</div>;
};
