import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { tokenNameCookie } from '../../lib/constants';
import { routes } from '../../lib/routes';
import { trpc } from '../../lib/trpc';

export const SignOutPage = () => {
  const navigate = useNavigate();
  const trpsUtils = trpc.useUtils();

  useEffect(() => {
    const singOutEvent = async () => {
      Cookies.remove(tokenNameCookie);
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
