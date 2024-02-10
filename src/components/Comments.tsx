import { useParams } from "react-router-dom";
import useSWR from "swr";
import CommentCard from "./CommentCard";
import { IoSend } from "react-icons/io5";
import { FormEvent, useState } from "react";
import { api } from "../providers/axios";
import useGetPost from "../hooks/useGetPost";

function Comments() {
  const { id } = useParams();
  const {
    data: comments,
    isLoading,
    mutate: mutateComments,
  } = useSWR<any[]>(`/posts/${id}/comments`);
  const [comment, setComment] = useState("");
  const { data: post, mutate: mutatePost } = useGetPost();

  if (isLoading) return <div>Loading comments...</div>;

  const handleNewComment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { data } = await api.post(`/posts/${id}/comments`, {
      content: comment,
    });

    setComment("");
    mutateComments([data, ...(comments || [])]);
    mutatePost({
      ...post,
      _count: {
        likes: post._count.likes,
        comments: post._count.comments + 1,
      },
    });
  };

  return (
    <div className="w-full h-full px-2 py-2">
      <div className="flex flex-col gap-2 overflow-y-scroll max-h-60 w-full h-full pr-2">
        {comments &&
          comments.map(({ id, content, author, createdAt }, i) => (
            <CommentCard
              key={i}
              id={id}
              content={content}
              author={author}
              createdAt={createdAt}
            />
          ))}
      </div>
      <form
        className="bg-slate-200 flex rounded-3xl mt-3"
        onSubmit={handleNewComment}
      >
        <input
          type="text"
          name="content"
          placeholder="Type a comment..."
          className="bg-transparent outline-none p-2 w-full text-wrap"
          autoComplete="off"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
        <button className="bg-sky-300 px-2 m-1 rounded-3xl transition-colors duration-300 hover:bg-sky-500">
          <IoSend />
        </button>
      </form>
    </div>
  );
}

export default Comments;
