import React, {useContext, useRef, useState} from 'react';
import classes from './AuthForm.module.css'
import Layout from '../../components/UI/Layout';
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import {BEARER_TOKEN} from "../../utils/constants";
import {AuthContext} from "../../store/auth-context";
import {useNavigate} from "react-router-dom";
import Navbar from "../../components/UI/Navbar";

function AuthForm(props) {
    // const emailInputRef = useRef();
    // const passwordInputRef = useRef();
    //
    //
    // const navigate = useNavigate();
    //
    // const [isLogin, setIsLogin] = useState(true);
    // const [isLoading, setIsLoading] = useState(false);
    // const switchAuthModeHandler = () => {
    //     setIsLogin((prevState) => !prevState);
    // };
    //
    // const submitHandler = (e) => {
    //     e.preventDefault();
    //
    //     const enteredEmail = emailInputRef.current.value;
    //     const enteredPassword = passwordInputRef.current.value;
    //
    //     setIsLoading(true)
    //     let url = `https://demo.api-platform.com/admin#/login`;
    //
    //     fetch(url, {
    //         method: 'POST',
    //         body: JSON.stringify({
    //             email: enteredEmail,
    //             password: enteredPassword,
    //         }),
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `bearer` +  BEARER_TOKEN
    //         }
    //
    //     })
            // .then((response) => {
            //
            //     setIsLoading(false);
            //
            //     if(response.ok) {
            //         return <p>Created!</p>
            //     } else {
            //         let errorMessage = 'Authentication failed'
            //         throw new Error(errorMessage);
            //     }
            // }).then((data) => {
            //             if (data.ok) {
            //                 navigate('/');
            //             }
            //     })
            //         .catch((err) => {
            //             alert(err.message);
            //         })
            //         .then((data) => {
            //             if (data.ok) {
            //                 navigate('/books');
            //             }
            //         })
            //         .catch((err) => {
            //             alert(err.message);
            //         });




    return (
        <>
        {/*<Navbar />*/}
            {/*<Layout>*/}
                <section>
                    skkdndnmsndsds
                    {/*<h1>{isLogin ? 'Login' : 'Sign Up'}</h1>*/}
                    {/*<form onSubmit={submitHandler}>*/}
                    {/*    <div className={classes.control}>*/}
                    {/*        <label htmlFor='email'>Your Email</label>*/}
                    {/*        <input type='email' id='email' required ref={emailInputRef} autoComplete="on"/>*/}
                    {/*    </div>*/}
                    {/*    <div className={classes.control}>*/}
                    {/*        <label htmlFor='password'>Your Password</label>*/}
                    {/*        <input type='password' id='password' required ref={passwordInputRef} autoComplete="on"/>*/}
                    {/*    </div>*/}
                    {/*    <div className={classes.actions}>*/}
                    {/*        {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}*/}
                    {/*        {isLoading && <LoadingSpinner />}*/}
                    {/*        <button*/}
                    {/*            type='button'*/}
                    {/*            className={classes.toggle}*/}
                    {/*            onClick={switchAuthModeHandler}*/}
                    {/*        >*/}
                    {/*            {isLogin ? 'Create new account' : 'Login with existing account'}*/}
                    {/*        </button>*/}
                    {/*    </div>*/}
                    {/*</form>*/}
                </section>
            {/*</Layout>*/}
        </>
    );
}

export default AuthForm;