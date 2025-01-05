import { signUpTRPCInput } from '@idea-portal/server/src/router/auth/sign-up/input';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router';
import { z } from 'zod';
import { Alert } from '@/components/Alert';
import { Button } from '@/components/Button';
import { FormSegment } from '@/components/FormSegment';
import { Input } from '@/components/Input';
import { Segment } from '@/components/Segment';
import { useFormFormik } from '@/components/hooks/useFormFormik';
import { TOKEN_EXPIRES } from '@/lib/constants';
import { env } from '@/lib/env';
import { routes } from '@/lib/routes';
import { trpc } from '@/lib/trpc';

const singUpSchema = signUpTRPCInput
  .extend({
    confirmPassword: z.string().min(4),
  })
  .refine(
    ({ confirmPassword, password }) => {
      return confirmPassword === password;
    },
    { message: 'Passwords do not match', path: ['confirmPassword'] }
  );

export const SingUpPage = () => {
  const crateUser = trpc.signUp.useMutation();
  const trpsUtils = trpc.useUtils();
  const navigate = useNavigate();

  const { formik, onSubmitForm, buttonProps, alertProps } = useFormFormik({
    initialValues: {
      nick: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: singUpSchema,
    onSubmit: async (values) => {
      const { token } = await crateUser.mutateAsync(values);
      Cookies.set(env.VITE_NAME_TOKEN_COOKIE, token, { expires: TOKEN_EXPIRES });
      await trpsUtils.invalidate();
      await navigate(routes.pages.allIdeas);
    },
    resetOnSuccess: true,
    showValidationAlert: true,
  });

  return (
    <Segment title="Sing Up">
      <form onSubmit={onSubmitForm}>
        <FormSegment>
          <Input label="Nick" name="nick" type="text" formik={formik} />
          <Input label="Password" name="password" type="password" formik={formik} />
          <Input label="Confirm Password" name="confirmPassword" type="password" formik={formik} />
          <Alert {...alertProps} />
          <Button {...buttonProps} type="submit" variant="primary">
            Sing Up
          </Button>
        </FormSegment>
      </form>
    </Segment>
  );
};
