import { type PropsWithChildren, type ReactNode } from 'react';
import css from './index.module.scss';

type Props = {
  title: ReactNode;
  titleSize?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  description?: ReactNode;
};

export const Segment = (props: PropsWithChildren<Props>) => {
  const { title, titleSize = 'h1', description, children } = props;
  const Component = titleSize;
  return (
    <div className={css.segment}>
      <Component className={css[titleSize]}>{title}</Component>
      {description && <p className={css.paragraph}>{description}</p>}
      {children && <div className={css.content}>{children}</div>}
    </div>
  );
};
