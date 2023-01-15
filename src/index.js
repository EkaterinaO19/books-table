import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
} from '@tanstack/react-query'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/UI/ErrorPage";
import BookCard from "./pages/edit book/BookCard";
import ShowBook from "./pages/show book/ShowBook";
import CreateBook from "./pages/create book/CreateBook";
import Main from './pages/book list/Main';
import ProfilePage from "./pages/profile/ProfilePage";
import { AuthContextProvider} from "./store/auth-context";
import Auth from "./pages/Auth";


const router = createBrowserRouter([

    {
        path: "/auth",
        element: <Auth/>,
        errorElement: <ErrorPage />,
    },
    {
        path: "/profile",
        element: <ProfilePage/>,
        errorElement: <ErrorPage />,
    },
    {
        path: "/",
        element: <Main/>,
        // errorElement: <ErrorPage />,
    },
    {
        path: "/create",
        element: <CreateBook/>,
        errorElement: <ErrorPage/>
    },
    {
        path: "/:bookId",
        element: <ShowBook />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/:bookId/edit",
        element: <BookCard/>,
        errorElement: <ErrorPage/>
    }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient()

root.render(
  <React.StrictMode>
      <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
              <RouterProvider router={router} />
          </AuthContextProvider>
      </QueryClientProvider>
  </React.StrictMode>
);