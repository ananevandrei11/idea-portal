import { createIdeaTRPCInput } from '@idea-portal/server/src/router/create-idea/input';
import { useFormik } from 'formik';
import { withZodSchema } from 'formik-validator-zod';
import { useState, type FormEvent } from 'react';
import { type z } from 'zod';
import { Alert } from '../../components/Alert';
import { Button } from '../../components/Button';
import { FormSegment } from '../../components/FormSegment';
import { Input } from '../../components/Input';
import { Segment } from '../../components/Segment';
import Textarea from '../../components/Textarea';
import { trpc } from '../../lib/trpc';

type FormValues = z.infer<typeof createIdeaTRPCInput>;

export const NewIdeaPage = () => {
  const crateIdea = trpc.createIdea.useMutation();
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const formik = useFormik<FormValues>({
    initialValues: {
      name: '',
      nick: '',
      description: '',
      text: '',
    },
    validate: withZodSchema(createIdeaTRPCInput),
    onSubmit: async (values) => {
      try {
        await crateIdea.mutateAsync(values);
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
          <Input label="Name" name="name" formik={formik} />
          <Input label="Nick" name="nick" formik={formik} />
          <Input label="Description" name="description" formik={formik} />
          <Textarea label="Text" name="text" formik={formik} />

          {!formik.isValid && !!formik.submitCount && <Alert type="error">Form is invalid</Alert>}
          {error && <Alert type="error">{error}</Alert>}
          {success && <Alert type="success">Great Idea!</Alert>}

          <Button
            disabled={(!formik.isValid && !!formik.submitCount) || formik.isSubmitting}
            type="submit"
            variant="primary"
          >
            {formik.isSubmitting ? 'Submitting' : 'Create Idea'}
          </Button>
        </FormSegment>
      </form>
    </Segment>
  );
};
