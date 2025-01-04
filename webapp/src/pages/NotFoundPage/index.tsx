import { ErrorPageComponent } from '../../components/ErrorComponent';

type Props = {
  title?: string;
  message?: string;
};

export function NotFoundPage(props: Props) {
  const { title = 'Not Found', message = 'This page does not exist' } = props;
  return <ErrorPageComponent title={title} message={message} />;
}
