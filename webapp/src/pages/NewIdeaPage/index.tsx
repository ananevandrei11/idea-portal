import { useFormik } from 'formik';
import { withZodSchema } from 'formik-validator-zod';
import { type FormEvent } from 'react';
import { z } from 'zod';
import { Input } from '../../components/Input';
import { Segment } from '../../components/Segment';
import Textarea from '../../components/Textarea';

const formSchema = z.object({
  name: z.string().min(1),
  nick: z
    .string()
    .min(1)
    .regex(/^[a-z0-9-]+$/, 'Nick must contain only letters'),
  description: z.string().min(1),
  text: z.string().min(10, 'Text must be at least 10 characters long'),
});
type FormValues = z.infer<typeof formSchema>;

export const NewIdeaPage = () => {
  const formik = useFormik<FormValues>({
    initialValues: {
      name: '',
      nick: '',
      description: '',
      text: '',
    },
    validate: withZodSchema(formSchema),
    onSubmit: (values) => {
      console.info('Submitted', values);
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
