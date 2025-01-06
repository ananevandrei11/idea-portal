import { type TrpcRouterOutput } from '@idea-portal/server/src/router';
import { Alert } from '@/components/Alert';
import { Button } from '@/components/Button';
import { FormSegment } from '@/components/FormSegment';
import { useFormFormik } from '@/components/hooks/useFormFormik';
import { trpc } from '@/lib/trpc';

type Props = {
  idea: NonNullable<TrpcRouterOutput['getIdea']['idea']>;
};

export function BlockIdea(props: Props) {
  const { idea } = props;
  const blockIdea = trpc.blockIdea.useMutation();
  const trpcUtils = trpc.useUtils();
  const { formik, alertProps, buttonProps } = useFormFormik({
    initialValues: {},
    onSubmit: async () => {
      await blockIdea.mutateAsync({ ideaId: idea.id });
      await trpcUtils.getIdea.refetch({ ideaNick: idea.nick });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormSegment>
        <Alert {...alertProps} />
        <Button {...buttonProps} variant="warning">
          Block Idea
        </Button>
      </FormSegment>
    </form>
  );
}
