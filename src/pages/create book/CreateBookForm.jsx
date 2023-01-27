import React from 'react';
import {Link} from "react-router-dom";
import {LeftOutlined} from "@ant-design/icons";
import { Form, Field } from 'react-final-form'
import {Input} from "antd";
import TextArea from "antd/es/input/TextArea";
import {DatePicker} from "antd/es";
import {FieldArray} from "react-final-form-arrays";
import {composeValidators, isbnNumbersCheck, mustBeNumber, required} from "../../utils/constants";


const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

function CreateBookForm(props) {

    const onSubmit = async value => {



          return  await props.mutation.mutateAsync(value).catch(e=> ({isbn:'error',publicationDate:'error'}));

    }


    return (
        <div>
            <Link to={'/'}><LeftOutlined/>Back</Link>
            <h1 style={{display: 'flex', justifyContent: 'center'}}>Create New Book</h1>
                    <Form
                        onSubmit={onSubmit}
                        id="createBookForm"
                        // debug={console.log}
                        render={({ handleSubmit, form, submitting, pristine, values }) => (
                            <form onSubmit={handleSubmit} style={{display: 'flex', alignItems: 'center', justifyContent:'center', flexDirection: 'column', gap: '20px', }}>
                                <Field style={{width: '400px', borderRadius: '5px', border: '1px solid gray',}}
                                       component="input"
                                       placeholder='isbn'
                                       name='isbn'
                                       validate={composeValidators(required, mustBeNumber,isbnNumbersCheck)}
                                >
                                    {({ input, meta }) => (
                                        <div>
                                            <Input {...input} type="text" placeholder="isbn" style={{width: '400px'}}
                                            />
                                            {(meta.error || meta.submitError) && meta.touched && (
                                                <span>{meta.error || meta.submitError}</span>
                                            )}
                                        </div>
                                    )}
                                </Field>
                                <Field style={{width: '400px',borderRadius: '5px', border: '1px solid gray'}}
                                       component="input"
                                       name='title'
                                       type="text"
                                       validate={required}
                                >
                                    {({ input, meta }) => (
                                        <div>
                                            <Input {...input} type="text" placeholder="title" style={{width: '400px'}}
                                            />
                                            {meta.error && meta.touched && <span>{meta.error}</span>}
                                        </div>
                                    )}
                                </Field>
                                <Field
                                       component="input"
                                       rows={4}
                                       name='description'
                                >
                                    {({ input, meta }) => (
                                        <div>
                                            <TextArea {...input} type="text" placeholder="description" style={{width: '400px'}}
                                            />
                                            {/*{meta.error && meta.touched && <span>{meta.error}</span>}*/}
                                        </div>
                                    )}
                                </Field>
                                <Field style={{width: '400px', borderRadius: '5px', border: '1px solid gray'}}
                                       component="input"
                                       placeholder='author'
                                       name='author'
                                       validate={required}
                                >
                                    {({ input, meta }) => (
                                        <div>
                                            <Input {...input} type="text" placeholder="author" style={{width: '400px'}}
                                            />
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
                                    {({ input,meta }) => (
                                        <div>
                                            <DatePicker {...input} type='date' name='publicationDate' style={{width: '400px'}}/>
                                            {(meta.error || meta.submitError) && meta.touched && (
                                                <span>{meta.error || meta.submitError}</span>
                                            )}
                                        </div>
                                    )}
                                </Field>
                                <p>Reviews</p>
                                <Field
                                       component="input"
                                       placeholder='reviews'
                                       type="text"
                                       name='reviews'
                                >
                                    {({ input }) => (
                                        <div>
                                            <Input {...input} type="text" style={{width: '400px'}}/>
                                        </div>
                                    )}
                                </Field>
                                <button
                                    style={{height: '40px', width:'80px', backgroundColor:'#1890ff', color:'white', border:'none', borderRadius: '5px'}}
                                    type="submit" onSubmit={handleSubmit} >
                                    Create
                                </button>
                            </form>
                        )}
                    />
            </div>
    );
}

export default CreateBookForm;
