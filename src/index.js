import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {QueryClient, QueryClientProvider, useQuery, useQueryClient} from "react-query";
import {
    createBrowserRouter,
    RouterProvider,
    } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import BookCard from "./components/BookCard";
import ShowBooks from "./components/ShowBooks";
import {ReactQueryDevtools} from "react-query/devtools";
import CreateBook from "./components/CreateBook";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <ErrorPage />,
    },
    {
        path: "books/:bookId",
        element: <ShowBooks />,
        errorElement: <ErrorPage />,
    },
    {
        path: "books/:bookId/edit",
        element: <BookCard/>,
        errorElement: <ErrorPage/>
    },
    {
        path: "books/create",
        element: <CreateBook/>,
        errorElement: <ErrorPage/>
    }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
      <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <ReactQueryDevtools/>
      </QueryClientProvider>
  </React.StrictMode>
);