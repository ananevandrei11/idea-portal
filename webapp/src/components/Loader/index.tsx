import clsx from 'clsx';
import css from './index.module.scss';

type Props = {
  variant?: 'section' | 'page';
  className?: string;
};

export const Loader = (props: Props) => {
  const { variant = 'section', className } = props;
  return (
    <span
      className={clsx(css.loader, className, {
        [css[variant]]: true,
      })}
    />
  );
};
