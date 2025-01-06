import { getIdeasTRPCInput } from '@idea-portal/server/src/router/ideas/get-ideas/input';
import { useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import InfiniteScroll from 'react-infinite-scroller';
import { Link } from 'react-router';
import { useDebounceValue } from 'usehooks-ts';
import css from './index.module.scss';
import { ErrorPageComponent } from '@/components/ErrorComponent';
import { Input } from '@/components/Input';
import { Loader } from '@/components/Loader';
import { Segment } from '@/components/Segment';
import { useFormFormik } from '@/components/hooks/useFormFormik';
import { routes } from '@/lib/routes';
import { trpc } from '@/lib/trpc';

export function AllIdeasPage() {
  const { formik } = useFormFormik({
    initialValues: {
      search: '',
    },
    validationSchema: getIdeasTRPCInput.pick({ search: true }),
  });
  const [search] = useDebounceValue(formik.values.search, 500);
  const { data, isLoading, isError, error, hasNextPage, fetchNextPage, isFetchingNextPage } =
    trpc.getIdeas.useInfiniteQuery(
      {
        limit: 2,
        search: search || '',
      },
      {
        getNextPageParam: (lastPage) => {
          return lastPage.nextCursor;
        },
      }
    );

  const onFetchNextPage = useCallback(() => {
    if (!isFetchingNextPage && hasNextPage) {
      fetchNextPage()
        .then(() => {})
        .catch(() => {});
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isError) {
    return <ErrorPageComponent message={error.message} />;
  }
  const isLoad = isLoading;

  return (
    <div>
      <Helmet>
        <title>Idea Portal | All Ideas</title>
      </Helmet>
      <Segment title="All ideas" titleSize="h1" />
      {isLoad && <Loader variant="page" />}
      <div>
        <Input label="Search" formik={formik} type="text" name="search" />
        <br />
      </div>
      <InfiniteScroll
        threshold={25}
        loadMore={onFetchNextPage}
        hasMore={hasNextPage}
        loader={<Loader key="loader" variant="section" className={css.loader} />}
        useWindow={true}
      >
        <ul className={css.list}>
          {data?.pages
            ?.flatMap((page) => page.ideas)
            .map((idea) => (
              <li key={idea.nick} className={css.idea}>
                <Segment
                  titleSize="h3"
                  title={<Link to={routes.pages.idea({ ideaNick: idea.nick })}>{idea.name}</Link>}
                  description={idea.description}
                >
                  <div>Likes: {idea.likesCount}</div>
                </Segment>
              </li>
            ))}
        </ul>
      </InfiniteScroll>
    </div>
  );
}
