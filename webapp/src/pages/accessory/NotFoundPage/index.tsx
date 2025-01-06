import { Helmet } from 'react-helmet-async';
import { ErrorPageComponent } from '@/components/ErrorComponent';

type Props = {
  title?: string;
  message?: string;
};

export function NotFoundPage(props: Props) {
  const { title = 'Not Found', message = 'This page does not exist' } = props;
  return (
    <>
      <Helmet>
        <title>Idea Portal | Error</title>
      </Helmet>
      <ErrorPageComponent title={title} message={message} />
    </>
  );
}
