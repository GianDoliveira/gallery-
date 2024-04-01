import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import PhotosComponent from "./components/photos/Photos";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/fotos",
    element: <PhotosComponent/>
  }
])

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
      <React.StrictMode>
        <RouterProvider router={router}/>
      </React.StrictMode>
);