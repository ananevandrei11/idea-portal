import clsx from 'clsx';
import { type PropsWithChildren, type ButtonHTMLAttributes } from 'react';
import { Link } from 'react-router';
import css from './index.module.scss';

type Props = {
  variant?: 'primary' | 'secondary';
  isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = (props: PropsWithChildren<Props>) => {
  const { variant = 'primary', isLoading = false, className, children, ...rest } = props;
  return (
    <button
      className={clsx(css.button, css[variant], className, {
        [css.loading]: isLoading,
      })}
      {...rest}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  );
};

export const LinkButton = ({
  children,
  to,
  variant = 'primary',
  className,
  isLoading = false,
}: PropsWithChildren<Props & { children: React.ReactNode; to: string }>) => {
  return (
    <Link
      className={clsx(css.button, css.link, css[variant], className, {
        [css.loading]: isLoading,
      })}
      to={to}
    >
      {children}
    </Link>
  );
};
