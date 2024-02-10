import useSWRInfinite from "swr/infinite";
import PostCard from "./PostCard";

interface Props {
  filter?: string;
}

function Posts({ filter }: Props) {
  const { data, size, setSize, isLoading } = useSWRInfinite<any[]>(
    (index) => `/posts?page=${index + 1}&take=10${filter && filter}`,
  );
  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
  const postsData = data ? data : [];
  const isEmpty = data?.length === 0;
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < 10);

  return (
    <div className="bg-slate-50 w-full h-full flex flex-col gap-5 items-center justify-left overflow-y-scroll mb-3">
      {postsData.map((post) =>
        post.map(({ id, content, _count, createdAt, author }, i) => (
          <PostCard
            key={i}
            postId={id}
            content={content}
            likes={_count.likes}
            createdAt={createdAt}
            author={author}
            comments={_count.comments}
          />
        )),
      )}

      {!isLoadingMore && !isReachingEnd && (
        <button
          type="button"
          onClick={() => setSize(size + 1)}
          className="bg-sky-300 px-3 py-2 rounded-lg transition-colors duration-300 mb-3 hover:bg-sky-500"
        >
          Load more
        </button>
      )}
    </div>
  );
}

export default Posts;
