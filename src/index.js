import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    QueryClient,
    QueryClientProvider
} from '@tanstack/react-query'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/UI/ErrorPage";
import EditBook from "./pages/edit book/EditBook";
import ShowBook from "./pages/show book/ShowBook";
import CreateBook from "./pages/create book/CreateBook";
import { AuthContextProvider} from "./store/auth-context";
import ReviewList from "./pages/review/ReviewList";
import ShowReview from "./pages/review/ShowReview";
import CreateReview from "./pages/review/CreateReview";
import EditReview from "./pages/review/EditReview";
import TablePage from "./pages/main/TablePage";
import 'antd/dist/antd.css';

import { store } from './store/reviewStore';
import { Provider } from 'react-redux';


const router = createBrowserRouter([
    {
        path: "/",
        element: <TablePage/>,
        errorElement: <ErrorPage />,
    },
    {
        path: "/create",
        element: <CreateBook/>,
        errorElement: <ErrorPage/>
    },
    {
        path: "books/:bookId",
        element: <ShowBook />,
        errorElement: <ErrorPage />,
    },
    {
        path: "books/:bookId/edit",
        element: <EditBook/>,
        errorElement: <ErrorPage/>
    },
    {
        path: "/reviews",
        element: <ReviewList/>,
        errorElement: <ErrorPage/>
    },
    {
        path: "/reviews/:reviewId",
        element: <ShowReview/>,
        errorElement: <ErrorPage/>
    },
    {
        path: "/reviews/create",
        element: <CreateReview/>,
        errorElement: <ErrorPage/>
    },
    {
        path: "/reviews/:reviewId/edit",
        element: <EditReview/>,
        errorElement: <ErrorPage/>
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient()

root.render(
  <React.StrictMode>
      <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
          <Provider store={store}>
              <RouterProvider router={router} />
          </Provider>
          </AuthContextProvider>
      </QueryClientProvider>
  </React.StrictMode>
);