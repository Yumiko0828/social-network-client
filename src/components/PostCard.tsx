import { Link, useNavigate } from "react-router-dom";
import { url } from "gravatar";
import { format } from "timeago.js";
import {
  FiMessageCircle as FiComments,
  FiEdit,
  FiTrash2,
} from "react-icons/fi";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { api } from "../providers/axios";
import { FormEvent, useRef, useState } from "react";
import useSWR from "swr";
import useProfile from "../hooks/useProfile";

interface Props {
  postId: string;
  content: string;
  createdAt: string;
  likes: number;
  comments: number;
  author: {
    id: string;
    username: string;
    email: string;
  };
}

function PostCard({
  postId,
  author,
  content,
  createdAt,
  likes,
  comments,
}: Props) {
  const [like, setLike] = useState(likes);
  const { data: profile } = useProfile();
  const { data, mutate } = useSWR(`/posts/${postId}/like`, (url) =>
    api.get(url).then(({ data }) => data),
  );
  const navigate = useNavigate();
  const updateDialog = useRef<HTMLDialogElement>(null);
  const [updateContent, setUpdateContent] = useState(content);

  const toggleLike = async () => {
    const { data } = await api.post(`/posts/${postId}/like`);

    setLike(like + data.likes);
    mutate({ isLiked: data.likes === 1 });
  };

  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await api.patch(`/posts/${postId}`, {
      content: updateContent,
    });

    updateDialog.current?.close();
    window.location.href = window.location.href;
  };

  const handleDelete = async () => {
    await api.delete(`/posts/${postId}`);
    window.location.href = window.location.href;
  };

  return (
    <div className="bg-slate-100 w-full max-w-sm rounded-lg p-4 flex gap-2">
      <img
        src={url(author.email)}
        alt={author.username}
        className="w-8 h-8 rounded-full"
        onClick={() => navigate(`/users/${author.id}`)}
      />
      <div className="w-full">
        <div className="flex justify-between items-center mt-[3px]">
          <Link to={`/users/${author.id}`} className="font-bold">
            {author.username}
          </Link>
          <span className="text-gray-700">{format(new Date(createdAt))}</span>
        </div>
        <p className="mt-3 whitespace-pre-wrap">{content}</p>
        <div className="flex gap-6 mt-4 z-50">
          <button
            type="button"
            className="flex gap-2 items-center"
            onClick={toggleLike}
          >
            {data && data.isLiked ? (
              <GoHeartFill className="rounded-full w-7 h-7 p-1 transition-colors duration-300 text-pink-600 hover:text-pink-700 hover:bg-pink-200" />
            ) : (
              <GoHeart className="rounded-full w-7 h-7 p-1 transition-colors duration-300 hover:text-pink-700 hover:bg-pink-200" />
            )}{" "}
            {like}
          </button>
          <button
            type="button"
            className="flex gap-2 items-center"
            onClick={() => navigate(`/posts/${postId}`)}
          >
            <FiComments className="rounded-full w-7 h-7 p-1 transition-colors duration-300 hover:text-sky-950 hover:bg-sky-200" />{" "}
            {comments}
          </button>
          {profile && author.id === profile.id && (
            <>
              <button
                type="button"
                className="flex w-7 h-7 gap-2 items-center justify-center"
                onClick={() => updateDialog.current?.showModal()}
              >
                <FiEdit className="rounded-full p-1 w-full h-full transition-colors duration-300 hover:text-orange-950 hover:bg-orange-200" />
              </button>
              <button
                type="button"
                className="flex gap-2 items-center"
                onClick={handleDelete}
              >
                <FiTrash2 className="rounded-full w-7 h-7 p-1 transition-colors duration-300 hover:text-red-950 hover:bg-red-200" />
              </button>
            </>
          )}
        </div>
      </div>

      {profile && author.id === profile.id && (
        <dialog
          ref={updateDialog}
          className="p-5 rounded-lg outline-none w-full max-w-80"
        >
          <h5 className="text-xl text-center mb-5">Update post</h5>
          <form onSubmit={handleUpdate}>
            <textarea
              name="content"
              placeholder="Content..."
              rows={5}
              required
              value={updateContent}
              onChange={(e) => setUpdateContent(e.target.value)}
              className="bg-slate-200 resize-y p-2 rounded-lg block w-full"
            ></textarea>

            <div className="flex gap-2 mt-4">
              <button
                type="submit"
                className="px-3 py-2 bg-sky-300 rounded-lg w-full"
              >
                Post
              </button>
              <button
                type="button"
                className="px-3 py-2 bg-gray-300 rounded-lg w-full"
                onClick={() => updateDialog.current?.close()}
              >
                Cancel
              </button>
            </div>
          </form>
        </dialog>
      )}
    </div>
  );
}

export default PostCard;
