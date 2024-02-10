import { Link } from "react-router-dom";
import useProfile from "../hooks/useProfile";

function Nav() {
  const { data, isLoading } = useProfile();

  return (
    <nav className="sticky top-0 left-0 w-full bg-slate-300 py-3 px-2">
      <div className="w-full max-w-screen-md mx-auto">
        <ul className="flex justify-center gap-3">
          <li>
            <Link to="/">Home</Link>
          </li>
          {data && (
            <>
              <li>
                <Link to={`/users/${data?.id}`}>
                  {isLoading ? "Profile" : `@${data?.username}`}
                </Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    localStorage.clear();
                    window.location.href = "/login";
                  }}
                >
                  Log out
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
