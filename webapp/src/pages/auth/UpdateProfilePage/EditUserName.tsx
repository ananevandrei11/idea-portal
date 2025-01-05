import { type TrpcRouterOutput } from '@idea-portal/server/src/router';
import { updateProfileTRPCInput } from '@idea-portal/server/src/router/auth/update-profile/input';
import { Alert } from '@/components/Alert';
import { Button } from '@/components/Button';
import { FormSegment } from '@/components/FormSegment';
import { Input } from '@/components/Input';
import { Segment } from '@/components/Segment';
import { useFormFormik } from '@/components/hooks/useFormFormik';
import { trpc } from '@/lib/trpc';

type Props = {
  user: NonNullable<TrpcRouterOutput['getMe']['me']>;
};

export function EditUserName(props: Props) {
  const { user } = props;
  const trpsUtils = trpc.useUtils();
  const updateProfile = trpc.updateProfile.useMutation();
  const { formik, onSubmitForm, alertProps, buttonProps } = useFormFormik({
    initialValues: {
      name: user?.name || '',
      nick: user?.nick || '',
    },
    validationSchema: updateProfileTRPCInput,
    successMessage: 'Profile updated',
    resetOnSuccess: false,
    onSubmit: async (values) => {
      const updatedUser = await updateProfile.mutateAsync(values);
      trpsUtils.getMe.setData(undefined, { me: updatedUser });
    },
  });
  return (
    <Segment title="Name & Nick" titleSize="h2">
      <form onSubmit={onSubmitForm}>
        <FormSegment>
          <Input label="Nick" name="nick" type="text" formik={formik} />
          <Input label="Name" name="name" type="text" formik={formik} />
          <Alert {...alertProps} />
          <Button {...buttonProps} type="submit" variant="primary">
            Update User
          </Button>
        </FormSegment>
      </form>
    </Segment>
  );
}
