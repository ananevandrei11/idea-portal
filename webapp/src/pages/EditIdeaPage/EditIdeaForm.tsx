import { type TrpcRouterOutput } from '@idea-portal/server/src/router';
import { updateIdeaTRPCInput } from '@idea-portal/server/src/router/update-idea/input';
import { useFormik } from 'formik';
import { withZodSchema } from 'formik-validator-zod';
import { type FormEvent, useState } from 'react';
import { useNavigate } from 'react-router';
import { type z } from 'zod';
import { Alert } from '../../components/Alert';
import { Button } from '../../components/Button';
import { FormSegment } from '../../components/FormSegment';
import { Input } from '../../components/Input';
import { Segment } from '../../components/Segment';
import Textarea from '../../components/Textarea';
import { routes } from '../../lib/routes';
import { trpc } from '../../lib/trpc';

type Props = {
  idea: NonNullable<TrpcRouterOutput['getIdea']['idea']>;
};

type FormValues = Omit<z.infer<typeof updateIdeaTRPCInput>, 'ideaId'>;
const schemaUpdateIdea = updateIdeaTRPCInput.omit({ ideaId: true });

export const EditIdeaForm = (props: Props) => {
  const { idea } = props;
  const navigate = useNavigate();
  const crateIdea = trpc.updateIdea.useMutation();
  const [error, setError] = useState<string | null>(null);

  const formik = useFormik<FormValues>({
    initialValues: {
      name: idea.name,
      nick: idea.nick,
      description: idea.description,
      text: idea.text,
    },
    validate: withZodSchema(schemaUpdateIdea),
    onSubmit: async (values) => {
      try {
        await crateIdea.mutateAsync({ ideaId: idea.id, ...values });
        formik.resetForm();
        setError(null);
        await navigate(routes.pages.idea({ ideaNick: values.nick }));
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
    <Segment title="Update Idea">
      <form onSubmit={handleSubmit}>
        <FormSegment>
          <Input label="Name" name="name" formik={formik} />
          <Input label="Nick" name="nick" formik={formik} />
          <Input label="Description" name="description" formik={formik} />
          <Textarea label="Text" name="text" formik={formik} />

          {!formik.isValid && !!formik.submitCount && <Alert type="error">Form is invalid</Alert>}
          {error && <Alert type="error">{error}</Alert>}

          <Button
            disabled={(!formik.isValid && !!formik.submitCount) || formik.isSubmitting}
            type="submit"
            variant="primary"
          >
            {formik.isSubmitting ? 'Submitting' : 'Update Idea'}
          </Button>
        </FormSegment>
      </form>
    </Segment>
  );
};
