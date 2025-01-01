import { type FormikProps } from 'formik';
import { type TextareaHTMLAttributes } from 'react';

type Props = {
  label: string;
  name: string;
  formik: FormikProps<any>;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = (props: Props) => {
  const { label, name, formik, ...rest } = props;
  const value = formik.values[name];
  const error = formik.errors[name] as string | undefined;
  const touched = formik.touched[name];

  return (
    <div style={{ marginBottom: 10 }}>
      <label htmlFor={name}>{label}</label>
      <br />
      <textarea
        {...rest}
        onChange={(e) => {
          void formik.setFieldValue(name, e.target.value);
        }}
        onBlur={() => {
          void formik.setFieldTouched(name);
        }}
        value={value}
        name={name}
        id={name}
        disabled={formik.isSubmitting}
      />
      {error && touched && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default Textarea;
