import React, {useState} from 'react';
import {BASE_URL, required} from "../../utils/constants";
import {Field, Form} from 'react-final-form'
import {Input, Layout} from "antd";
import {useNavigate} from "react-router-dom";

export const token ="eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2Nzc1MDAwMDEsImV4cCI6MTY3NzUwMzYwMSwicm9sZXMiOlsiUk9MRV9BRE1JTiIsIlJPTEVfVVNFUiJdLCJ1c2VybmFtZSI6ImFkbWluQGV4YW1wbGUuY29tIn0.pwFHS84aTy-hl0hKhSzy1Sp8jsDMyEp7nPeJI8fmpu7uqduPSbY9MT0eqdY4EwPuwQAPe8-y-tnfBvYEPc5jVv6UWfpGUAOTRLln6pciByYwkA5iWSeHDdfCoYabCd_ZJ0b8yOYLZRauAmvIML_sJplllgGDYk9fbyPh9awvnK3ueh2TL-QKJVAw_ywvdmxAh6qi7MW3C0VXi6aV5EamWmVTuYgxVCvtp9OkBDYx-cqSzVWU2p3fK7T69yNRzGconGTN6FwimCP3IANHbh375tClSLLknNQ8zDo8oIlPvw65RhH0c-v3upLalc8OcgR4rzgxVKNTMiC_e7zhb3h1BK20tVgYjMnFej9XsDaPaUPxulKydrw0Nf7Z8MSrgAFV3YPxg7sCcWYCUtiJlsIxWWYUfNYc9Ioy_5ZhE9Bc5xpZiaqG0JOi9tOQ5d4fu-_kWNnsMVVKGC--FITJZyspkfKE9Jpp9QWsb3a2EFR2bo-tlHUtamUlAEK2e0dD5PPsrwJycGPuohrRHuEUKOpJ-rBpzXQcDW9BAWp0wE_ZheY_S_JwIoOJ7nKAJZAbm_atVrYL1OoFKt0hmLYyhG1b5OjWGCEG3DtMQgv36N9qf_qyi686hzbpMF8Dp8h8M9rNx1xk5-f7sUNZ0vp7mIrCMSda7eKb1_byxypIPqADhbU";
function LoginPage(props) {
    const [isLogin, setIsLogin] = useState(false)

    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
    const navigate = useNavigate();
    const onLogIn = async (e, values) => {
        e.preventDefault();

        await sleep(300);

        if(isLogin){
            fetch(BASE_URL + `/authentication_token`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': "Bearer" + {token}
                    },
                    body: JSON.stringify({
                        email: values.email,
                        password: values.password
                    }),
                })
                .then(response => response.json())
                .then((response) => localStorage.setItem('token', response.token))
                .then(() =>
                    setTimeout(() => {
                        navigate('/');
                    }, 500))
                .catch((err) => {
                    console.error(err)
                    alert("Unable to login. Please try after some time.");
                })
        }else{

        }

    }

    return (
        <Layout style={{
            height: '100vh',
            display: 'flex',
            flexWrap: 'wrap',
            alignContent: 'center',
            justifyContent: 'center'
        }}>
            <Form
                onSubmit={onLogIn}
                initialValues={{email: 'admin@example.com', password: 'admin'}}
                render={({handleSubmit, form, submitting, pristine, values}) => (
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>email</label>
                            <Field
                                name="email"
                                component="input"
                                type="text"
                                validate={required}
                            >
                                {({input, meta}) => (
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
                                {({input, meta}) => (
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
                        <button type="submit">
                            Submit
                        </button>
                    </form>
                )}
            />
        </Layout>
    );
}

export default LoginPage;