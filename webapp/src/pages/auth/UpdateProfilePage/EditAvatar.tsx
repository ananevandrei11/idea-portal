import { type TrpcRouterOutput } from '@idea-portal/server/src/router';
import { updateProfileTRPCInput } from '@idea-portal/server/src/router/auth/update-profile/input';
import { type ChangeEvent, useCallback, useState } from 'react';
import { Alert } from '@/components/Alert';
import { Button } from '@/components/Button';
import { FormSegment } from '@/components/FormSegment';
import { Segment } from '@/components/Segment';
import { useFormFormik } from '@/components/hooks/useFormFormik';
import { trpc } from '@/lib/trpc';

type Props = {
  user: NonNullable<TrpcRouterOutput['getMe']['me']>;
};

const MAX_FILE_SIZE = 100 * 1024;

export function EditAvatar(props: Props) {
  const { user } = props;
  const [preview, setPreview] = useState<string | null>(user.avatar || null);
  const [sizeError, setSizeError] = useState<string>('');
  const trpsUtils = trpc.useUtils();
  const updateProfile = trpc.updateProfile.useMutation();
  const { formik, onSubmitForm, alertProps, buttonProps } = useFormFormik({
    initialValues: {
      avatar: user?.avatar || '',
    },
    validationSchema: updateProfileTRPCInput.pick({ avatar: true }),
    successMessage: 'Profile updated',
    resetOnSuccess: false,
    onSubmit: async (values) => {
      if (!values.avatar || values.avatar === user.avatar) {
        throw new Error('Avatar is required');
      }
      const updatedUser = await updateProfile.mutateAsync({ ...user, ...values });
      trpsUtils.getMe.setData(undefined, { me: updatedUser });
    },
  });

  const handleFileChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file && file.size > MAX_FILE_SIZE) {
        event.target.value = '';
        setSizeError(`File size must be less than ${MAX_FILE_SIZE / 1024} KB`);
        void formik.setFieldValue('avatar', '');
        return;
      } else {
        setSizeError('');
      }
      if (file) {
        const reader = new FileReader();
        reader.onload = async () => {
          setPreview(reader.result as string);
          await formik.setFieldValue('avatar', reader.result);
        };
        reader.readAsDataURL(file);
      }
    },
    [formik]
  );

  return (
    <Segment title="Avatar" titleSize="h2">
      {preview && (
        <>
          <figure style={{ borderRadius: '50%', overflow: 'hidden', width: '100%', maxWidth: '80px' }}>
            <img
              src={preview}
              alt={user.name}
              style={{
                width: '100%',
                aspectRatio: 1 / 1,
                objectFit: 'cover',
                objectPosition: 'center',
                verticalAlign: 'middle',
              }}
            />
          </figure>
          <hr />
        </>
      )}
      <form onSubmit={onSubmitForm}>
        <FormSegment>
          <input type="file" accept="image/*" name="avatar" onChange={handleFileChange} />
          <Alert {...alertProps} />
          <Alert type="error" hidden={!sizeError}>
            {sizeError}
          </Alert>
          <Button {...buttonProps} type="submit" variant="primary">
            Update User's Avatart
          </Button>
        </FormSegment>
      </form>
    </Segment>
  );
}
