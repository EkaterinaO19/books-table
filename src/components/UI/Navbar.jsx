import React, {useContext} from 'react';
import classes from './Navbar.module.css'
import {AuthContext} from "../../store/auth-context";
function Navbar(props) {
    const authCtx = useContext(AuthContext);

    const isLoggedIn = authCtx.isLoggedIn;

    const logoutHandler = () => {
        authCtx.logout();
    }

    return (
        <nav className={classes.navbar}>
            <div className={classes.navbar__title}>My Library</div>
            {!isLoggedIn && <div className={classes.navbar__item}>Login</div>}
            {isLoggedIn && <div className={classes.navbar__item}>Profile</div>}
            {isLoggedIn && <div onClick={logoutHandler} className={classes.navbar__item}>Logout</div>}
        </nav>
    );
}

export default Navbar;