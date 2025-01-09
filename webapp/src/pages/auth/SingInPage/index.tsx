import { signInTRPCInput } from '@idea-portal/server/src/router/auth/sign-in/input';
import { useStore } from '@nanostores/react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router';
import { Alert } from '@/components/Alert';
import { Button } from '@/components/Button';
import { FormSegment } from '@/components/FormSegment';
import { Input } from '@/components/Input';
import { lastVisistedNotAuthRouteStore } from '@/components/NotAuthRouteTracker';
import { Segment } from '@/components/Segment';
import { useFormFormik } from '@/components/hooks/useFormFormik';
import { TOKEN_EXPIRES } from '@/lib/constants';
import { env } from '@/lib/env';
import { trpc } from '@/lib/trpc';

export const SingInPage = () => {
  const navigate = useNavigate();
  const crateUser = trpc.signIn.useMutation();
  const trpsUtils = trpc.useUtils();
  const lastVisistedNotAuthRoute = useStore(lastVisistedNotAuthRouteStore);

  const { formik, onSubmitForm, buttonProps, alertProps } = useFormFormik({
    initialValues: {
      nick: '',
      password: '',
    },
    validationSchema: signInTRPCInput,
    onSubmit: async (values) => {
      const { token } = await crateUser.mutateAsync(values);
      Cookies.set(env.VITE_NAME_TOKEN_COOKIE, token, { expires: TOKEN_EXPIRES });
      await trpsUtils.invalidate();
      await navigate(lastVisistedNotAuthRoute, { replace: true });
    },
    resetOnSuccess: true,
    showValidationAlert: true,
  });

  return (
    <Segment title="Sign In">
      <form onSubmit={onSubmitForm}>
        <FormSegment>
          <Input label="Nick" name="nick" type="text" formik={formik} />
          <Input label="Password" name="password" type="password" formik={formik} />

          <Alert {...alertProps} />
          <Button {...buttonProps} type="submit" variant="primary">
            Sing In
          </Button>
        </FormSegment>
      </form>
    </Segment>
  );
};
