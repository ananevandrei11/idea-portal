import { createIdeaTRPCInput } from '@idea-portal/server/src/router/create-idea/input';
import { useFormik } from 'formik';
import { withZodSchema } from 'formik-validator-zod';
import { type FormEvent } from 'react';
import { type z } from 'zod';
import { Input } from '../../components/Input';
import { Segment } from '../../components/Segment';
import Textarea from '../../components/Textarea';
import { trpc } from '../../lib/trpc';

type FormValues = z.infer<typeof createIdeaTRPCInput>;

export const NewIdeaPage = () => {
  const crateIdea = trpc.createIdea.useMutation();
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
      } catch (error) {
        console.error(error);
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
        <Input label="Name" name="name" formik={formik} />
        <Input label="Nick" name="nick" formik={formik} />
        <Input label="Description" name="description" formik={formik} />
        <Textarea label="Text" name="text" formik={formik} />
        <br />
        {!formik.isValid && !!formik.submitCount && <div style={{ color: 'red' }}>Form is invalid</div>}
        <button disabled={!formik.isValid && !!formik.submitCount} type="submit">
          Create Idea
        </button>
      </form>
    </Segment>
  );
};
