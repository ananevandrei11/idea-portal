import { createIdeaTRPCInput } from '@idea-portal/server/src/router/ideas/create-idea/input';
import { type ChangeEvent, useCallback, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Alert } from '@/components/Alert';
import { Button } from '@/components/Button';
import { FormSegment } from '@/components/FormSegment';
import { Input } from '@/components/Input';
import { Segment } from '@/components/Segment';
import Textarea from '@/components/Textarea';
import { useFormFormik } from '@/components/hooks/useFormFormik';
import { MAX_FILE_SIZE_IMAGE } from '@/lib/constants';
import { trpc } from '@/lib/trpc';

export const NewIdeaPage = () => {
  const crateIdea = trpc.createIdea.useMutation();
  const [sizeError, setSizeError] = useState<string>('');
  const [preview, setPreview] = useState<string[]>([]);

  const { formik, onSubmitForm, buttonProps, alertProps } = useFormFormik({
    initialValues: {
      name: '',
      nick: '',
      description: '',
      text: '',
      images: [],
    },
    validationSchema: createIdeaTRPCInput,
    onSubmit: async (values) => {
      await crateIdea.mutateAsync(values);
    },
    resetOnSuccess: true,
    showValidationAlert: true,
    successMessage: 'Great Idea!',
  });

  const handleFileChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (!files || files?.length === 0) {
        setPreview([]);
        return;
      }

      const fileArray: File[] = Array.from(files);
      const bigFiles = fileArray.filter((file) => file.size > MAX_FILE_SIZE_IMAGE);

      if (bigFiles.length > 0) {
        const names = bigFiles.reduce((acc, file) => (acc += file.name + ','), '');
        setSizeError(`Files ${names} must be less than ${MAX_FILE_SIZE_IMAGE / 1024} KB`);
        setPreview([]);
        void formik.setFieldValue('avatar', '');
        event.target.value = '';
        return;
      }

      const valueFiles: string[] = [];
      fileArray.forEach((file) => {
        const reader = new FileReader();
        reader.onload = async () => {
          valueFiles.push(reader.result as string);
          if (valueFiles.length === fileArray.length) {
            setPreview(valueFiles);
            await formik.setFieldValue('images', valueFiles);
          }
        };
        reader.readAsDataURL(file);
      });
    },
    [formik]
  );

  return (
    <Segment title="New Idea">
      <Helmet>
        <title>Idea Portal | New Idea</title>
      </Helmet>
      <form onSubmit={onSubmitForm}>
        <FormSegment>
          <Input label="Name" name="name" formik={formik} />
          <Input label="Nick" name="nick" formik={formik} />
          <Input label="Description" name="description" formik={formik} />
          <Textarea label="Text" name="text" formik={formik} />
          <input type="file" accept="image/*" multiple name="avatar" onChange={handleFileChange} />
          {preview.length > 0 &&
            preview.map((preview) => (
              <figure key={preview} style={{ overflow: 'hidden', width: '100%', maxWidth: '80px' }}>
                <img
                  src={preview}
                  alt=" "
                  style={{
                    width: '100%',
                    aspectRatio: 1 / 1,
                    objectFit: 'cover',
                    objectPosition: 'center',
                    verticalAlign: 'middle',
                  }}
                />
              </figure>
            ))}
          <Alert {...alertProps} />
          <Alert type="error" hidden={!sizeError}>
            {sizeError}
          </Alert>
          <Button {...buttonProps} type="submit" variant="primary">
            Create Idea
          </Button>
        </FormSegment>
      </form>
    </Segment>
  );
};
