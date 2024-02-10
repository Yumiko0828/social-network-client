import { url } from "gravatar";
import { format } from "timeago.js";

interface Props {
  id: string;
  content: string;
  createdAt: string;
  author: {
    id: string;
    username: string;
    email: string;
  };
}

function CommentCard({ author, content, createdAt }: Props) {
  return (
    <div className="bg-slate-100 w-full max-w-sm rounded-lg p-4 flex gap-2">
      <img
        src={url(author.email)}
        alt={author.username}
        className="w-8 h-8 rounded-full"
      />
      <div className="w-full">
        <div className="flex justify-between items-center">
          <p>{author.username}</p>
          <span className="text-gray-700">{format(new Date(createdAt))}</span>
        </div>
        <p className="mt-3">{content}</p>
      </div>
    </div>
  );
}

export default CommentCard;
