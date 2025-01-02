import { type PropsWithChildren } from 'react';
import css from './index.module.scss';

export const FormSegment = (props: PropsWithChildren) => {
  const { children } = props;
  return <div className={css.segment}>{children}</div>;
};
