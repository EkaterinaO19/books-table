import React from 'react';
import {useQuery, useMutation} from '@tanstack/react-query'
import axios from "axios";
import {Input} from "antd";
import TextArea from "antd/es/input/TextArea";
import {LeftOutlined} from "@ant-design/icons";
import {Link, useNavigate, useParams} from "react-router-dom";
import useDelete from "../../hooks/useDelete";
import ErrorPage from "../../components/UI/ErrorPage";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import { Form, Field } from 'react-final-form'
import arrayMutators from 'final-form-arrays'
import { FieldArray } from 'react-final-form-arrays'
import {composeValidators, isbnNumbersCheck, mustBeNumber, required} from "../../utils/constants";



function EditBook() {
    let {bookId} = useParams();
    const navigate = useNavigate();
    const remove = useDelete("BooksData");

    const {isLoading, isError, data} = useQuery(['booksData', bookId], () =>
        fetch(`https://demo.api-platform.com/books/${bookId}`).then(res =>
            res.json()),
    );


    const editBook = useMutation(editBook =>
            axios.put(`https://demo.api-platform.com/books/${bookId}`, editBook, {
                headers: {'Content-Type': 'application/json'}
            })
        ,
        {
            onSuccess: async () => {
                await alert('Done successfully!')
                navigate('/');
            },
            onError: async () => {
                return <ErrorPage/>
            }
        });


    const onSubmit = async value => {
        value.reviews = value.reviews.map(review => review["@id"])
        console.log(value)
        editBook.mutate(value);
    }

    const handleToDelete = value => {
        remove.mutate(value);
    }


    if (isLoading) return <LoadingSpinner/>
    if (isError) return <ErrorPage/>

    return (
        <div>
            <Link to={'/'}><LeftOutlined/>Back</Link>
            <h1 style={{display: 'flex', justifyContent: 'center'}}>Edit Book: <p>"{data?.title}"</p></h1>

            <>
                {editBook.isLoading ? (
                    <LoadingSpinner/>
                ) : (
                    <>
                        <Form
                            onSubmit={onSubmit}
                            mutators={{ ...arrayMutators}}
                            initialValues={data}
                            render={({handleSubmit, form, submitting, pristine, values}) => (
                                <form onSubmit={handleSubmit} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexDirection: 'column',
                                    gap: '20px',
                                }}>
                                    <Field style={{width: '400px', borderRadius: '5px', border: '1px solid gray',}}
                                           component="input"
                                           placeholder='isbn'
                                           name='isbn'
                                           type="text"
                                           validate={composeValidators(required, mustBeNumber,isbnNumbersCheck)}
                                    >
                                        {({ input, meta }) => (
                                            <div>
                                                <Input {...input} type='text' name='isbn' style={{width: '400px'}} />
                                                {meta.error && meta.touched && <span>{meta.error}</span>}
                                            </div>
                                        )}
                                    </Field>
                                    <Field
                                           component="input"
                                           placeholder='title'
                                           name='title'
                                           type="text"
                                           validate={required}
                                    >
                                        {({ input, meta }) => (
                                            <div>
                                                <Input {...input} type='text' name='title' style={{width: '400px'}} />
                                                {meta.error && meta.touched && <span>{meta.error}</span>}
                                            </div>
                                        )}
                                    </Field>
                                    <Field
                                           component="textarea"
                                           name='description'
                                           type="text"
                                    >
                                        {({ input }) => (
                                            <div>
                                                <TextArea {...input} type='text' name='description' style={{width: '400px'}} rows={4}/>
                                            </div>
                                        )}
                                    </Field>
                                    <Field
                                           component="input"
                                           placeholder='author'
                                           name='author'
                                           type="text"
                                           validate={required}
                                    >
                                        {({ input, meta }) => (
                                            <div>
                                                <Input {...input} type='text'  name='author' style={{width: '400px'}}/>
                                                {meta.error && meta.touched && <span>{meta.error}</span>}
                                            </div>
                                        )}
                                    </Field>
                                    <Field
                                           component="input"
                                           placeholder='publicationDate'
                                           type="date"
                                           name='publicationDate'
                                    >
                                        {({ input }) => (
                                            <div>
                                                <Input {...input} type='date' name='publicationDate' style={{width: '400px'}}/>
                                            </div>
                                        )}
                                    </Field>
                                    <p>Reviews</p>
                                    <FieldArray name="reviews">
                                        {({fields}) => (
                                            <div>
                                                {fields.map((name) => (
                                                    <div key={name}>
                                                        <Field name={`${name}["@id"]`} component="input">
                                                            {({ input }) => (
                                                                <div>
                                                                    <Input {...input} type='text' name='isbn' style={{width: '400px'}} />
                                                                </div>
                                                            )}
                                                        </Field>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                    </FieldArray>
                                    <button
                                        style={{
                                            height: '40px',
                                            width: '80px',
                                            backgroundColor: '#1890ff',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '5px'}}
                                        type="submit">
                                        Edit
                                    </button>
                                    <button
                                        style={{height: '40px', width:'80px', backgroundColor:'#b61c37', color:'white', border:'none', borderRadius: '5px'}}
                                        onSubmit={() => handleToDelete()} >
                                        Delete
                                    </button>
                                </form>
                            )}
                        />
                        {editBook.isError && (
                            <div style={{
                                color: 'red',
                                fontWeight: 'bold',
                                textAlign: 'center',
                                marginTop: '20px'
                            }}>
                                <p>Ooops, something went wrong...</p>
                                hydra:description
                            </div>
                        )}
                    </>
                )}
            </>
        </div>
    );
}

export default EditBook;