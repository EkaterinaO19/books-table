import React from 'react';
import Layout from '../../components/UI/Layout';
import ProfileForm from "./ProfileForm";
import Navbar from "../../components/UI/Navbar";

function ProfilePage(props) {
    return (
        <>
            <Navbar />
            <Layout>
                <ProfileForm />
            </Layout>
        </>

    );
}

export default ProfilePage;
