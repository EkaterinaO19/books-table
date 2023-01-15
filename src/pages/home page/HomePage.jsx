import React from 'react';
import Navbar from "../../components/UI/Navbar";
import Layout from '../../components/UI/Layout';
import classes from './HomePage.module.css'

function HomePage(props) {
    return (
        <>
            <Navbar />
            <Layout>
                <div className={classes.welcome} >
                    <p className={classes.title}>Welcome to My Library!</p>
                </div>
            </Layout>
        </>

    );
}

export default HomePage;