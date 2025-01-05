import { type TrpcRouterOutput } from '@idea-portal/server/src/router';
import { updateIdeaTRPCInput } from '@idea-portal/server/src/router/ideas/update-idea/input';
import { useNavigate } from 'react-router';
import { Alert } from '@/components/Alert';
import { Button } from '@/components/Button';
import { FormSegment } from '@/components/FormSegment';
import { Input } from '@/components/Input';
import { Segment } from '@/components/Segment';
import Textarea from '@/components/Textarea';
import { useFormFormik } from '@/components/hooks/useFormFormik';
import { routes } from '@/lib/routes';
import { trpc } from '@/lib/trpc';

type Props = {
  idea: NonNullable<TrpcRouterOutput['getIdea']['idea']>;
};

export const EditIdeaForm = (props: Props) => {
  const { idea } = props;
  const navigate = useNavigate();
  const crateIdea = trpc.updateIdea.useMutation();

  const { formik, onSubmitForm, buttonProps, alertProps } = useFormFormik({
    initialValues: {
      name: idea.name,
      nick: idea.nick,
      description: idea.description,
      text: idea.text,
    },
    validationSchema: updateIdeaTRPCInput.omit({ ideaId: true }),
    onSubmit: async (values) => {
      await crateIdea.mutateAsync({ ideaId: idea.id, ...values });
      await navigate(routes.pages.idea({ ideaNick: values.nick }));
    },
    resetOnSuccess: true,
    showValidationAlert: true,
  });

  return (
    <Segment title="Update Idea">
      <form onSubmit={onSubmitForm}>
        <FormSegment>
          <Input label="Name" name="name" formik={formik} />
          <Input label="Nick" name="nick" formik={formik} />
          <Input label="Description" name="description" formik={formik} />
          <Textarea label="Text" name="text" formik={formik} />
          <Alert {...alertProps} />
          <Button {...buttonProps} type="submit" variant="primary">
            Update Idea
          </Button>
        </FormSegment>
      </form>
    </Segment>
  );
};
