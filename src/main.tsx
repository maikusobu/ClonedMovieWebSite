import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import MovieDescription from "./components/MovieDetail/MovieDescription";
import SearchFilterContainer from "./components/SearchFilter/SearchFilterContainer";
import { Suspense } from "react";
import { Provider } from "react-redux";
import { store } from "./App/store";
import { loader as MovieDescriptionLoader } from "./components/MovieDetail/MovieDescription";
import { loader as NavbarLoader } from "./components/HomePage/Layout/Layout";
import { VideoPlay } from "./components/HomePage/VideoPlay/VideoPlay";
import { loader as VideoLoader } from "./components/HomePage/VideoPlay/VideoPlay";
import ErrorPage from "./components/ErrorsPage/ErrorPage";
import SearchResults from "./components/SearchResults/SearchResults";
import { loader as SearchResultsLoader } from "./components/SearchResults/SearchResults";
import Layout from "./components/HomePage/Layout/Layout";
const router = createBrowserRouter([
  {
    path: "/",
    element:
      <Layout/>
,
    loader: NavbarLoader,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/play/movie/:movieID",
        element: <VideoPlay />,
        loader: VideoLoader,
        errorElement: <ErrorPage />,
      },
    ],
  },
  {
    path: "/description/movie/:movieID",
    element: <MovieDescription />,
    loader: MovieDescriptionLoader,
    errorElement: <ErrorPage />,
  },
  {
    path: "/nowplaying/search",
    element: <SearchFilterContainer />,
    loader: NavbarLoader,
    errorElement: <ErrorPage />,
  },
  {
    path: "/search/:keyId",
    element: <SearchResults />,
    errorElement: <ErrorPage />,
    loader: SearchResultsLoader,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
