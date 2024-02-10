import { FormEvent, useRef, useState } from "react";
import Nav from "../components/Nav";
import Posts from "../components/Posts";
import { FiPlusCircle } from "react-icons/fi";
import { api } from "../providers/axios";

function Home() {
  const postModal = useRef<HTMLDialogElement>(null);
  const [newPostContent, setPostContent] = useState("");

  const handleNewPots = () => {
    postModal.current?.showModal();
  };

  const handleModalSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await api.post("/posts", {
      content: newPostContent,
    });

    setPostContent("");
    postModal.current?.close();
    window.location.href = "/";
  };

  return (
    <div className="h-full overflow-hidden flex flex-col">
      <Nav />

      {/* Post options */}
      <div className="bg-slate-50 p-3 flex justify-center">
        <button
          className="bg-sky-400 py-2 px-3 rounded-lg flex gap-3 items-center transition-colors duration-300 hover:bg-sky-500"
          onClick={handleNewPots}
        >
          <FiPlusCircle /> New post
        </button>
      </div>

      <dialog
        ref={postModal}
        className="p-5 rounded-lg outline-none w-full max-w-80"
      >
        <h5 className="text-xl text-center mb-5">New post</h5>
        <form onSubmit={handleModalSubmit}>
          <textarea
            name="content"
            placeholder="Content..."
            rows={5}
            required
            value={newPostContent}
            onChange={(e) => setPostContent(e.target.value)}
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
              onClick={() => postModal.current?.close()}
            >
              Cancel
            </button>
          </div>
        </form>
      </dialog>

      {/* Posts */}
      <Posts />
    </div>
  );
}

export default Home;
