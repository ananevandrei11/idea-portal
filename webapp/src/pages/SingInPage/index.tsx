import { signInTRPCInput } from '@idea-portal/server/src/router/sign-in/input';
import { useFormik } from 'formik';
import { withZodSchema } from 'formik-validator-zod';
import { useState, type FormEvent } from 'react';
import { type z } from 'zod';
import { Alert } from '../../components/Alert';
import { Button } from '../../components/Button';
import { FormSegment } from '../../components/FormSegment';
import { Input } from '../../components/Input';
import { Segment } from '../../components/Segment';
import { trpc } from '../../lib/trpc';

type FormValues = z.infer<typeof signInTRPCInput>;

export const SingInPage = () => {
  const crateUser = trpc.signIn.useMutation();
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const formik = useFormik<FormValues>({
    initialValues: {
      nick: '',
      password: '',
    },
    validate: withZodSchema(signInTRPCInput),
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

          {!formik.isValid && !!formik.submitCount && <Alert type="error">Form is invalid</Alert>}
          {error && <Alert type="error">{error}</Alert>}
          {success && <Alert type="success">Sign In is succeeded!</Alert>}

          <Button
            disabled={(!formik.isValid && !!formik.submitCount) || formik.isSubmitting}
            type="submit"
            variant="primary"
          >
            {formik.isSubmitting ? 'Submitting' : 'Sing In'}
          </Button>
        </FormSegment>
      </form>
    </Segment>
  );
};
