import { signUpTRPCInput } from '@idea-portal/server/src/router/signUp/input';
import { useFormik } from 'formik';
import { withZodSchema } from 'formik-validator-zod';
import { useState, type FormEvent } from 'react';
import { z } from 'zod';
import { Alert } from '../../components/Alert';
import { Button } from '../../components/Button';
import { FormSegment } from '../../components/FormSegment';
import { Input } from '../../components/Input';
import { Segment } from '../../components/Segment';
import { trpc } from '../../lib/trpc';

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
type FormValues = z.infer<typeof singUpSchema>;

export const SingUpPage = () => {
  const crateUser = trpc.signUp.useMutation();
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const formik = useFormik<FormValues>({
    initialValues: {
      nick: '',
      password: '',
      confirmPassword: '',
    },
    validate: withZodSchema(singUpSchema),
    onSubmit: async (values) => {
      try {
        await crateUser.mutateAsync(values);
        formik.resetForm();
        setSuccess(true);
        setError(null);
        setTimeout(() => {
          setSuccess(false);
        }, 1000);
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        setError(message);
      }
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formik.handleSubmit();
  };

  return (
    <Segment title="New Idea">
      <form onSubmit={handleSubmit}>
        <FormSegment>
          <Input label="Nick" name="nick" type="text" formik={formik} />
          <Input label="Password" name="password" type="password" formik={formik} />
          <Input label="Confirm Password" name="confirmPassword" type="password" formik={formik} />

          {!formik.isValid && !!formik.submitCount && <Alert type="error">Form is invalid</Alert>}
          {error && <Alert type="error">{error}</Alert>}
          {success && <Alert type="success">Sign Up is succeeded!</Alert>}

          <Button
            disabled={(!formik.isValid && !!formik.submitCount) || formik.isSubmitting}
            type="submit"
            variant="primary"
          >
            {formik.isSubmitting ? 'Submitting' : 'Sing Up'}
          </Button>
        </FormSegment>
      </form>
    </Segment>
  );
};
