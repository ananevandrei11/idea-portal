import { type FormikProps } from 'formik';
import { type InputHTMLAttributes } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  formik: FormikProps<any>;
};

export const Input = (props: Props) => {
  const { name, label, formik, ...rest } = props;
  const value = formik.values[name];
  const error = formik.errors[name] as string | undefined;
  const touched = formik.touched[name];

  return (
    <div style={{ marginBottom: 10 }}>
      <label htmlFor={name}>{label}</label>
      <br />
      <input
        {...rest}
        onChange={(e) => {
          void formik.setFieldValue(name, e.target.value);
        }}
        onBlur={() => {
          void formik.setFieldTouched(name);
        }}
        type="text"
        value={value}
        name={name}
        id={name}
      />
      {error && touched && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};
