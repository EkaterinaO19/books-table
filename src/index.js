import React from 'react';
import ReactDOM from 'react-dom/client';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ErrorPage from "./components/UI/ErrorPage";
import ReviewList from "./pages/review/ReviewList";
import ShowReview from "./pages/review/ShowReview";
import CreateReview from "./pages/review/CreateReview";
import EditReview from "./pages/review/EditReview";
import 'antd/dist/antd.min.css';
import {Provider} from "react-redux";
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import LoginPage from "./pages/login/LoginPage";
import TablePage from "./pages/main/TablePage";
import CreateBook from "./pages/create book/CreateBook";
import ShowBook from "./pages/show book/ShowBook";
import EditBook from "./pages/edit book/EditBook";
// import rootReducer from './reducers/index'



const router = createBrowserRouter([


    {
        path: "/login",
        element: <LoginPage/>,
        errorElement: <ErrorPage />,
    },
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
    <AuthContextProvider>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router}/>
        </QueryClientProvider>
    </AuthContextProvider>
);