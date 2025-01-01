import clsx from 'clsx';
import { type FormikProps } from 'formik';
import { type TextareaHTMLAttributes } from 'react';
import css from './index.module.scss';

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
    <div className={clsx(css.field, { [css.disabled]: formik.isSubmitting })}>
      <label className={css.label} htmlFor={name}>
        {label}
      </label>
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
        className={clsx(css.input, {
          [css.value]: value,
          [css.error]: error && touched,
        })}
      />
      {error && touched && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default Textarea;
