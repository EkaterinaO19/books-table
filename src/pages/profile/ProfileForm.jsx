import React, {useContext, useRef} from 'react';
import classes from './ProfileForm.module.css'
import {useNavigate, useNavigation} from "react-router-dom";
import {AuthContext} from "../../store/auth-context";


// import AuthContext from '../../store/auth-context';

function ProfileForm(props) {

    const navigate = useNavigate();

    const newPasswordInputRef = useRef();
    const authCtx = useContext(AuthContext);

    const submitHandler = (event) => {
        event.preventDefault();
    }
        // add validation

    const newPassword = newPasswordInputRef.current.value;

    fetch('https://demo.api-platform.com/authentication_token', {
            method: 'POST',
            body: JSON.stringify({
                idToken: authCtx.token,
                password: newPassword,
                returnSecureToken: false
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            // assumption: Always succeeds!
            navigate('/');
        });


    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <div className={classes.control}>
                    <h1 className={classes.title}>Your User Profile</h1>
                <label htmlFor='new-password'>New Password</label>
                <input type='password' id='new-password' minLength="7" ref={newPasswordInputRef} />
            </div>
            <div className={classes.action}>
                <button>Change Password</button>
            </div>
        </form>
    );
}

export default ProfileForm;