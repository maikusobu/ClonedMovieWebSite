import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import MovieDescription from "./components/MovieDetail/MovieDescription";
import SearchFilterContainer from "./components/SearchFilter/SearchFilterContainer";
import { Layout } from "./components/HomePage/Layout/Layout";
import { Provider } from "react-redux";
import { store } from "./App/store";
import { loader as MovieDescriptionLoader } from "./components/MovieDetail/MovieDescription";
import { loader as NavbarLoader } from "./components/HomePage/Layout/Layout";
import { VideoPlay } from "./components/HomePage/VideoPlay/VideoPlay";
import { loader as VideoLoader } from "./components/HomePage/VideoPlay/VideoPlay";
import { Navbar } from "./components/HomePage/Navbar/Navbar";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    loader: NavbarLoader,
    children: [
      {
        path: "/play/movie/:movieID",
        element: <VideoPlay />,
        loader: VideoLoader,
      },
    ],
  },
  {
    path: "/description/movie/:movieID",
    element: <MovieDescription />,
    loader: MovieDescriptionLoader,
  },
  {
    path: "/nowplaying/search",
    element: <SearchFilterContainer />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
