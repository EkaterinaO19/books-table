import React from 'react';
import {BASE_URL, required} from "../../utils/constants";
import { Form, Field } from 'react-final-form'
import {Input, Layout} from "antd";
import {redirect, useNavigate} from "react-router-dom";

function LoginPage(props) {
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
    const navigate = useNavigate();

    const onLogIn = async (values, event) => {
        event.preventDefault();
        await sleep(300);

        fetch(BASE_URL + `/authentication_token`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer`
                },
                body: JSON.stringify({
                    email: values.email,
                    password: values.password
                })
            })
            .then(response => response.json())
            .then((response) => localStorage.setItem('token',response.token))
            .catch((err) => console.error(err));
    }


    return (
        <Layout style={{height:'100vh', display:'flex',flexWrap: 'wrap', alignContent: 'center', justifyContent: 'center'}}>

            <Form
                onSubmit={onLogIn}
                initialValues={{ email: 'admin@example.com', password: 'admin' }}
                render={({ handleSubmit, form, submitting, pristine, values }) => (
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>email</label>
                            <Field
                                name="email"
                                component="input"
                                type="text"
                                validate={required}
                            >
                                {({ input, meta }) => (
                                    <div>
                                        <Input {...input} name="email" type="text" placeholder="email"
                                        />
                                        {(meta.error || meta.submitError) && meta.touched && (
                                            <span>{meta.error || meta.submitError}</span>
                                        )}
                                    </div>
                                )}
                            </Field>
                        </div>
                        <div>
                            <label>password</label>
                            <Field
                                name="password"
                                component="input"
                                type="password"
                                validate={required}
                            >
                                {({ input, meta }) => (
                                    <div>
                                        <Input {...input} name="password" type="password" placeholder="Password"
                                        />
                                        {(meta.error || meta.submitError) && meta.touched && (
                                            <span>{meta.error || meta.submitError}</span>
                                        )}
                                    </div>
                                )}
                            </Field>
                        </div>
                        <button type="submit" >
                            Submit
                        </button>
                    </form>
                )}
            />
        </Layout>
    );
}

export default LoginPage;