import { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../providers/axios";

function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { data } = await api.post("/auth/login", credentials);
      localStorage.token = data.token;

      window.location.href = "/";
    } catch (e) {
      setError(e.response.data.message || e.message);
    }
  };

  const handleTyping = (e: ChangeEvent<HTMLInputElement>) =>
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });

  return (
    <div className="bg-slate-100 w-full h-full flex justify-center items-center">
      <form
        className="flex flex-col justify-center bg-slate-200 p-3 rounded-xl w-full max-w-80 gap-3"
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl mb-3 text-center">Login</h1>

        {error && (
          <div className="bg-red-100 rounded-lg overflow-hidden">
            <p className="border-l-4 border-l-red-600 px-3 py-3">{error}</p>
          </div>
        )}

        <label className="flex flex-col gap-1 w-full">
          Email:
          <input
            className="py-1 px-2 border-none outline-none rounded-lg invalid:text-pink-600 invalid:underline focus:outline-2 focus:outline-sky-400"
            name="email"
            type="email"
            required
            onChange={handleTyping}
          />
        </label>

        <label className="flex flex-col gap-1 w-full">
          Password:
          <input
            className="py-1 px-2 border-none outline-none rounded-lg invalid:text-pink-600 invalid:underline focus:outline-2 focus:outline-sky-400"
            name="password"
            type="password"
            required
            onChange={handleTyping}
          />
        </label>

        <p className="text-left">
          Don't have an account?{" "}
          <Link to="/register" className="text-sky-800">
            Register
          </Link>
        </p>

        <button
          type="submit"
          className="bg-sky-300 w-full rounded-lg p-2 mt-3 transition-colors duration-300 disabled:bg-sky-200 disabled:hover:cursor-not-allowed hover:bg-sky-400"
          disabled={!credentials.email || !credentials.password}
        >
          Accept
        </button>
      </form>
    </div>
  );
}

export default Login;
