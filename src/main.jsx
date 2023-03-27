import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import { ListMovie } from "./components/ListMovie/ListMovie";
import { Layout } from "./components/Layout/Layout";
import { Provider } from "react-redux";
import { store } from "./App/store";
import { Navbar } from "./components/Navbar/Navbar";
import { loader as NavbarLoader } from "./components/Layout/Layout";
import { VideoPlay } from "./components/VideoPlay/VideoPlay";
import { loader as VideoLoader } from "./components/VideoPlay/VideoPlay";
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
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
