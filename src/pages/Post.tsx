import Nav from "../components/Nav";
import PostCard from "../components/PostCard";
import Comments from "../components/Comments";
import useGetPost from "../hooks/useGetPost";

function Post() {
  const { data } = useGetPost();

  return (
    <div className="h-full">
      <Nav />

      <div className="w-full flex flex-col justify-center my-8 rounded-lg bg-slate-300 max-w-sm mx-auto">
        {data && (
          <>
            <PostCard
              postId={data.id}
              author={data.author}
              content={data.content}
              createdAt={data.createdAt}
              comments={data._count.comments || 0}
              likes={data._count.likes || 0}
            />
            <Comments />
          </>
        )}
      </div>
    </div>
  );
}

export default Post;
