import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./dashboard.jsx";
import TopRated from "./topRated/topRated.jsx";
import Detail from "./detailItems.jsx";
import Popular from "./popular/popular.jsx";
import Upcoming from "./upcoming/upcoming.jsx";
import ResultSearch from "./search/resultSearch.jsx";
import Login from "./login.jsx";
import ErrorPage from "./error.jsx";
import Register from "./register.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ToastContainer } from "react-toastify";

export default function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/top-rated", element: <TopRated /> },
    { path: "/detail", element: <Detail /> },
    { path: "/popular", element: <Popular /> },
    { path: "/upcoming", element: <Upcoming /> },
    { path: "/resultSearch", element: <ResultSearch /> },
    { path: "*", element: <ErrorPage /> },
  ]);
  return (
    <GoogleOAuthProvider clientId="872362668839-cacmn49kvqddbb69mu04ig4l1lmpa6ao.apps.googleusercontent.com">
      <RouterProvider router={router} />
      <ToastContainer />
    </GoogleOAuthProvider>
  );
}
