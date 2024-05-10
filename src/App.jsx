import {
  createBrowserRouter,
  Route,
  Router,
  RouterProvider,
  Routes,
} from "react-router-dom";
import "./App.css";
import Home from "./dashboard.jsx";
import TopRated from "./topRated/topRated.jsx";
import Detail from "./detailItems.jsx";
import Popular from "./popular/popular.jsx";
import Upcoming from "./upcoming/upcoming.jsx";
import ResultSearch from "./search/resultSearch.jsx";
import Login from "./login.jsx";
import Register from "./register.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function App() {
  return (
    <GoogleOAuthProvider clientId="872362668839-cacmn49kvqddbb69mu04ig4l1lmpa6ao.apps.googleusercontent.com">
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/top-rated" element={<TopRated />}></Route>
          <Route path="/detail" element={<Detail />}></Route>
          <Route path="/popular" element={<Popular />}></Route>
          <Route path="/upcoming" element={<Upcoming />}></Route>
          <Route path="/resultSearch" element={<ResultSearch />}></Route>
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}
