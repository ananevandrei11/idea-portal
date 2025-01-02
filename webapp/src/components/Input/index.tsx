import clsx from 'clsx';
import { type FormikProps } from 'formik';
import { type InputHTMLAttributes } from 'react';
import css from './index.module.scss';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  formik: FormikProps<any>;
};

export const Input = (props: Props) => {
  const { name, label, formik, placeholder, type = 'text', ...rest } = props;
  const value = formik.values[name];
  const error = formik.errors[name] as string | undefined;
  const touched = formik.touched[name];

  return (
    <div className={clsx(css.field, { [css.disabled]: formik.isSubmitting })}>
      <label className={css.label} htmlFor={name}>
        {label}
      </label>
      <input
        className={clsx(css.input, {
          [css.value]: value,
          [css.error]: error && touched,
        })}
        {...rest}
        onChange={(e) => {
          void formik.setFieldValue(name, e.target.value);
        }}
        onBlur={() => {
          void formik.setFieldTouched(name);
        }}
        type={type}
        value={value}
        name={name}
        id={name}
        disabled={formik.isSubmitting}
      />
      {error && touched && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};
