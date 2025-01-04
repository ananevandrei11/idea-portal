import clsx from 'clsx';
import { type PropsWithChildren } from 'react';
import css from './index.module.scss';

type Props = {
  type: 'error' | 'success';
  hidden?: boolean;
};

export type AlertProps = PropsWithChildren<Props>;

export const Alert = (props: AlertProps) => {
  const { type, hidden = false, children } = props;

  if (hidden) {
    return null;
  }

  return (
    <div className={clsx(css[type], css.alert)} role="alert">
      {children}
    </div>
  );
};
