import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Post from "./pages/Post";
import { SWRConfig } from "swr";
import { api } from "./providers/axios";
import User from "./pages/User";
import Search from "./pages/Search";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/posts/:id",
      element: <Post />,
    },
    {
      path: "/search",
      element: <Search />,
    },
    {
      path: "/users/:id",
      element: <User />,
    },
  ]);

  return (
    <SWRConfig
      value={{
        fetcher: (url) => api.get(url).then(({ data }) => data),
      }}
    >
      <RouterProvider router={router} />
    </SWRConfig>
  );
}

export default App;
