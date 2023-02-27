// import React, {useState} from 'react';
// import {BrowserRouter, Navigate, Route, Router, Routes, useLocation, useRoutes} from "react-router-dom";
// import ErrorPage from "./components/UI/ErrorPage";
// import TablePage from "./pages/main/TablePage";
// import LoginPage from "./pages/login/LoginPage";
// import {Switch} from "antd";
// import {PrivateRoute} from "./PrivateRoute";
// import * as PropTypes from "prop-types";
// import {AuthContext} from "./store/auth-context";
//
//
// export const App = (props) => {
//     return (
//         <AuthProvider>
//             <Routes>
//                 <Route path='/login' element={<LoginPage/>}/>
//                 <Route path='/' element={
//                     <RequireAuth>
//                         <TablePage/>
//                     </RequireAuth>
//                 }
//                 />
//                 <Navigate to='/login'/>
//             </Routes>
//         </AuthProvider>
//     )
// };

// const useAuth = () => {
//     const token = localStorage.getItem('token')
//     if (token) {
//         return true
//     } else {
//         return false
//     }
// };

// function RequireAuth({children}) {
//     let auth = useAuth();
//     let location = useLocation();
//
//     if (!auth.user) {
//         return <Navigate to="/login" state={{from: location}} replace/>;
//     }
//     return children;
// }
//
//
// function AuthProvider({children}) {
//     let [user, setUser] = useState(null);
//
// }
//
