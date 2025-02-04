import clsx from 'clsx';
import { type PropsWithChildren, type ButtonHTMLAttributes } from 'react';
import { Link } from 'react-router';
import css from './index.module.scss';

type Props = {
  variant?: 'primary' | 'secondary' | 'warning';
  isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export type ButtonProps = PropsWithChildren<Props>;

export const Button = (props: ButtonProps) => {
  const { variant = 'primary', isLoading = false, className, children, ...rest } = props;
  return (
    <button
      className={clsx(css.button, css[variant], className, {
        [css.loading]: isLoading,
      })}
      {...rest}
    >
      <span className={css.text}>{children}</span>
    </button>
  );
};

export const LinkButton = ({
  children,
  to,
  variant = 'primary',
  className,
  isLoading = false,
}: ButtonProps & { to: string }) => {
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
