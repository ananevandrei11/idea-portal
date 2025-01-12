import { TRPCClientError } from '@trpc/client';
import { type FormikHelpers, useFormik } from 'formik';
import { withZodSchema } from 'formik-validator-zod';
import { type FormEvent, useMemo, useState } from 'react';
import { type z } from 'zod';
import { type AlertProps } from '../Alert';
import { type ButtonProps } from '../Button';
import { sentryCaptureException } from '@/lib/sentry';

type Props<TZodSchema extends z.ZodTypeAny> = {
  successMessage?: string | false;
  resetOnSuccess?: boolean;
  showValidationAlert?: boolean;
  initialValues?: z.infer<TZodSchema>;
  validationSchema?: TZodSchema;
  onSubmit?: (values: z.infer<TZodSchema>, actions?: FormikHelpers<z.infer<TZodSchema>>) => Promise<any> | any;
};

export function useFormFormik<TZodSchema extends z.ZodTypeAny>(props: Props<TZodSchema>) {
  const {
    initialValues,
    validationSchema,
    onSubmit,
    successMessage = false,
    resetOnSuccess = true,
    showValidationAlert = false,
  } = props;
  const [success, setSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const formik = useFormik<z.infer<TZodSchema>>({
    initialValues,
    ...(validationSchema && { validate: withZodSchema(validationSchema) }),
    onSubmit: async (values, formikHelpers) => {
      if (!onSubmit) {
        return;
      }
      try {
        setErrorMessage(null);
        await onSubmit?.(values, formikHelpers);
        if (resetOnSuccess) {
          formik.resetForm();
        }
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 1500);
      } catch (error: unknown) {
        if (!(error instanceof TRPCClientError)) {
          sentryCaptureException(error as Error);
        }
        const message = error instanceof Error ? error.message : 'Unknown error';
        setErrorMessage(message);
      }
    },
  });

  const alertProps = useMemo<AlertProps>(() => {
    if (errorMessage) {
      return {
        hidden: false,
        children: errorMessage,
        type: 'error',
      };
    }
    if (showValidationAlert && !formik.isValid && !!formik.submitCount) {
      return {
        hidden: false,
        children: 'Some fields are invalid',
        type: 'error',
      };
    }
    if (success && successMessage) {
      return {
        hidden: false,
        children: successMessage,
        type: 'success',
      };
    }
    return {
      type: 'error',
      hidden: true,
      children: null,
    };
  }, [errorMessage, success, formik.isValid, formik.submitCount, successMessage, showValidationAlert]);

  const buttonProps = useMemo<Pick<ButtonProps, 'isLoading' | 'disabled'>>(
    () => ({
      isLoading: formik.isSubmitting,
      disabled: !formik.isValid && !!formik.submitCount,
    }),
    [formik.isSubmitting, formik.isValid, formik.submitCount]
  );

  const onSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formik.handleSubmit();
  };

  return {
    formik,
    alertProps,
    buttonProps,
    onSubmitForm,
  };
}
