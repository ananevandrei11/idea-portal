import clsx from 'clsx';
import { type PropsWithChildren } from 'react';
import css from './index.module.scss';

type Props = {
  type: 'error' | 'success';
};

export const Alert = (props: PropsWithChildren<Props>) => {
  const { type, children } = props;
  return (
    <div className={clsx(css[type], css.alert)} role="alert">
      {children}
    </div>
  );
};
