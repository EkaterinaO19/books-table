import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import {LeftOutlined} from "@ant-design/icons";
import {DatePicker, Input} from "antd";
import {useMutation} from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import {Field, Form} from "react-final-form";
import {BASE_URL} from "../../utils/constants";


function CreateReview(props) {

    const navigate = useNavigate();
    const createReview = useMutation(createReview => {
        return axios.post(BASE_URL + '/reviews', createReview)
    }, {
        onSuccess: async () => {
            alert('Review successfully created!')
            navigate('/reviews');
        },
        onError: async (error) => {
            console.log(error.message)
        }
    });

    const onSubmit = async value => {
        value.rating = +value.rating
        console.log(value)
        createReview.mutate(value);
    }

    const required = value => (value ? undefined : <p style={{color: 'red'}}>Required field</p>);
    const mustBeNumber = value => (isNaN(value) ? <p style={{color: 'red'}}>Must be a number</p> : undefined)
    const minValue = min => value =>
        isNaN(value) || value >= min ? undefined : <p style={{color: 'red'}}>Should be greater than ${min}</p>;
    const maxValue = max => value =>
        isNaN(value) || value <= max ? undefined : <p style={{color: 'red'}}>`Should be less than ${max}`</p>;
    const composeValidators = (...validators) => value =>
        validators.reduce((error, validator) => error || validator(value), undefined)

    return (
        <>
            {createReview.isLoading ? (
                <LoadingSpinner/>
            ) : (
                <>
                    <Link to={'/reviews'}><LeftOutlined/>Back</Link>
                    <Form
                        onSubmit={onSubmit}
                        render={({handleSubmit}) => (
                            <form onSubmit={handleSubmit}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexDirection: 'column',
                                    gap: '10px'
                                }}>
                                    <h2>Create review</h2>
                                    <Field
                                        name="body"
                                        component="input"
                                        validate={required}
                                    >
                                        {({input, meta}) => (
                                            <div>
                                                <Input {...input} type="text" placeholder="Review body"
                                                       style={{width: '400px'}}
                                                />
                                                {meta.error && meta.touched && <span>{meta.error}</span>}
                                            </div>
                                        )}
                                    </Field>
                                    <Field validate={composeValidators(mustBeNumber, minValue(1), maxValue(5))}
                                           name="rating" component="number" min={'0'} max={'5'}>
                                        {({input, meta}) => (
                                            <div>
                                                <Input {...input} type="number" placeholder="Review rating" style={{width: '400px'}} />
                                                {meta.error && meta.touched && <span>{meta.error}</span>}
                                            </div>
                                        )}
                                    </Field>
                                    <Field validate={required} name="book" component="input">
                                        {({input, meta}) => (
                                            <div>
                                                <Input {...input} type="text"
                                                       placeholder="The item that`s being reviewed"
                                                       style={{width: '400px'}}
                                                />
                                                {meta.error && meta.touched && <span>{meta.error}</span>}
                                            </div>
                                        )}
                                    </Field>
                                    <Field validate={required} name="author" component="input">
                                        {({input, meta}) => (
                                            <div>
                                                <Input {...input} type="text" placeholder="Review Author" style={{width: '400px',}}/>
                                                {meta.error && meta.touched && <span>{meta.error}</span>}
                                            </div>
                                        )}
                                    </Field>
                                    <Field component="input" name='publicationDate'>
                                        {({input, meta}) => (
                                            <div>
                                                <DatePicker {...input} placeholder="Review publicationDate" style={{width: '400px'}}/>
                                                {meta.error && meta.touched && <span>{meta.error}</span>}
                                            </div>
                                        )}
                                    </Field>
                                    <button type="submit">Submit</button>
                                </div>
                            </form>
                        )}
                    />

                    {createReview.error &&
                        <p style={{color: 'red', textAlign: 'center', marginTop: '20px'}}>
                            Smth went wrong. Please try again
                        </p>
                    }
                </>
            )}
        </>
    );
}

export default CreateReview;