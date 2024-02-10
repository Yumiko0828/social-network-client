import { useParams } from "react-router-dom";
import Nav from "../components/Nav";
import useSWR from "swr";
import { url } from "gravatar";
import Posts from "../components/Posts";
import useProfile from "../hooks/useProfile";
import { api } from "../providers/axios";

function User() {
  const { id } = useParams();
  const { data: profile } = useProfile();
  const { data, error, isLoading } = useSWR(`/users/${id}`);

  const handleDeleteAccount = async () => {
    await api.delete("/users/profile");
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="h-full overflow-hidden flex flex-col">
      <Nav />
      {data && (
        <>
          <div className="w-full bg-slate-50 flex justify-center items-center py-8 gap-4">
            <img
              src={url(data.email, {
                size: "500px",
              })}
              alt={data.username}
              className="rounded-full w-24 h-24 outline-4 outline-sky-300 outline-none transition-all duration-200 hover:outline-sky-500"
            />
            <div>
              <h3 className="font-bold text-2xl">@{data.username}</h3>
              <p>
                Posts: <span className="font-semibold">{data._count.Post}</span>
              </p>

              {profile && profile.id === data.id && (
                <button
                  type="button"
                  className="px-3 py-2 rounded-lg bg-red-300 transition-colors duration-300 mt-2 hover:bg-red-500"
                  onClick={handleDeleteAccount}
                >
                  Delete Account
                </button>
              )}
            </div>
          </div>
          <Posts filter={`&userId=${data.id}`} />
        </>
      )}

      {isLoading && <p className="text-center p-4">Loading</p>}
      {error && <h1>User not found</h1>}
    </div>
  );
}

export default User;
