import { updateProfileTRPCInput } from '@idea-portal/server/src/router/auth/update-profile/input';
import { Alert } from '@/components/Alert';
import { Button } from '@/components/Button';
import { FormSegment } from '@/components/FormSegment';
import { Input } from '@/components/Input';
import { Segment } from '@/components/Segment';
import { useFormFormik } from '@/components/hooks/useFormFormik';
import { useUserContext } from '@/lib/context';
import { trpc } from '@/lib/trpc';

export function UpdateProfilePage() {
  const user = useUserContext();
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
    <Segment title="Update User">
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
