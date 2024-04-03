import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import PhotosComponent from "./components/photos/Photos";
import Album from "./components/album/Album";
import ErrorPage from "./components/Error/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage/>
  },
  {
    path: "/fotos",
    element: <PhotosComponent/>
  },
  {
    path: "/album",
    element: <Album/>,
  },
])

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
      <React.StrictMode>
        <RouterProvider router={router}/>
      </React.StrictMode>
);