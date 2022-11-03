import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/book list/App';
import {QueryClient, QueryClientProvider, useQuery, useQueryClient} from "react-query";
import {
    createBrowserRouter,
    RouterProvider,
    } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import BookCard from "./components/edit book/BookCard";
import ShowBook from "./components/show book/ShowBook";
import {ReactQueryDevtools} from "react-query/devtools";
import CreateBook from "./components/create book/CreateBook";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <ErrorPage />,
    },
    {
        path: "books/:bookId",
        element: <ShowBook />,
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