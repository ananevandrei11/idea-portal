import { updatePasswordTRPCInput } from '@idea-portal/server/src/router/auth/update-password/input';
import { z } from 'zod';
import { Alert } from '@/components/Alert';
import { Button } from '@/components/Button';
import { FormSegment } from '@/components/FormSegment';
import { Input } from '@/components/Input';
import { Segment } from '@/components/Segment';
import { useFormFormik } from '@/components/hooks/useFormFormik';
import { trpc } from '@/lib/trpc';

const updatePasswordSchema = updatePasswordTRPCInput
  .extend({
    newPasswordAgain: z.string().min(1),
  })
  .superRefine((val, ctx) => {
    if (val.newPassword !== val.newPasswordAgain) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Passwords must be the same',
        path: ['newPasswordAgain'],
      });
    }
  });

export function EditPassword() {
  const updatePassword = trpc.updatePassword.useMutation();
  const { formik, onSubmitForm, alertProps, buttonProps } = useFormFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      newPasswordAgain: '',
    },
    validationSchema: updatePasswordSchema,
    successMessage: 'Password  updated',
    resetOnSuccess: false,
    onSubmit: async (values) => {
      await updatePassword.mutateAsync(values);
    },
  });
  return (
    <Segment title="Password" titleSize="h2">
      <form onSubmit={onSubmitForm}>
        <FormSegment>
          <Input label="Old Password" name="oldPassword" type="password" formik={formik} />
          <Input label="New Password" name="newPassword" type="password" formik={formik} />
          <Input label="New Password Again" name="newPasswordAgain" type="password" formik={formik} />
          <Alert {...alertProps} />
          <Button {...buttonProps} type="submit" variant="primary">
            Update Password
          </Button>
        </FormSegment>
      </form>
    </Segment>
  );
}
