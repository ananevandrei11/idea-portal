import { createIdeaTRPCInput } from '@idea-portal/server/src/router/create-idea/input';
import { Alert } from '../../components/Alert';
import { Button } from '../../components/Button';
import { FormSegment } from '../../components/FormSegment';
import { Input } from '../../components/Input';
import { Segment } from '../../components/Segment';
import Textarea from '../../components/Textarea';
import { useFormFormik } from '../../components/hooks/useFormFormik';
import { trpc } from '../../lib/trpc';

export const NewIdeaPage = () => {
  const crateIdea = trpc.createIdea.useMutation();

  const { formik, onSubmitForm, buttonProps, alertProps } = useFormFormik({
    initialValues: {
      name: '',
      nick: '',
      description: '',
      text: '',
    },
    validationSchema: createIdeaTRPCInput,
    onSubmit: async (values) => {
      await crateIdea.mutateAsync(values);
    },
    resetOnSuccess: true,
    showValidationAlert: true,
    successMessage: 'Great Idea!',
  });

  return (
    <Segment title="New Idea">
      <form onSubmit={onSubmitForm}>
        <FormSegment>
          <Input label="Name" name="name" formik={formik} />
          <Input label="Nick" name="nick" formik={formik} />
          <Input label="Description" name="description" formik={formik} />
          <Textarea label="Text" name="text" formik={formik} />
          <Alert {...alertProps} />
          <Button {...buttonProps} type="submit" variant="primary">
            Create Idea
          </Button>
        </FormSegment>
      </form>
    </Segment>
  );
};
