import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {QueryClient, QueryClientProvider, useQuery, useQueryClient} from "react-query";
import {
    createBrowserRouter,
    RouterProvider,
    } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import BookCard from "./BookCard";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <ErrorPage />,
    },
    {
        path: "books/:bookId",
        element: <BookCard />,
        errorElement: <ErrorPage />,
    }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
      <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
      </QueryClientProvider>
  </React.StrictMode>
);