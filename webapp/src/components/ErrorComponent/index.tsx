import { Alert } from '../Alert';
import { Segment } from '../Segment';

type Props = {
  title?: string;
  message?: string;
};

export const ErrorPageComponent = (props: Props) => {
  const { title = 'Oops, error', message = 'Something went wrong' } = props;
  return (
    <Segment title={title}>
      <Alert type="error">{message}</Alert>
    </Segment>
  );
};
