import { RouterProvider, createBrowserRouter } from "react-router-dom";
import PhotosComponent from "./components/photos/Photos";
import AlbumComponent from "./components/album/Album";
import ErrorPage from "./components/Error/ErrorPage";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import FormsComponent from "./components/pages/forms/Forms";
import App from "./App";
import Home from "./components/Home/Home";
import ProtectedRoute from "./routes/ProtectedRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            { path: "", element: <Home /> },
            { path: "login", element: <FormsComponent /> },
            { path: "register", element: <FormsComponent /> },
            {
                path: "fotos",
                element:
                    <ProtectedRoute><PhotosComponent /></ProtectedRoute>
            },
            {
                path: "album",
                element:
                    <ProtectedRoute><AlbumComponent /></ProtectedRoute>
            },
        ]
    }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);