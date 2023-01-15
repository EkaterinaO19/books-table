import React from 'react';
import {Link} from "react-router-dom";
import {LeftOutlined} from "@ant-design/icons";
import { Form, Field } from 'react-final-form'


const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

function CreateBookForm(props) {

    const onSubmit = value => {
        props.mutation.mutate(value);
    }

    return (
        <div>
            <Link to={'/'}><LeftOutlined/>Back</Link>
            <h1 style={{display: 'flex', justifyContent: 'center'}}>Create New Book</h1>
                    <Form
                        onSubmit={onSubmit}
                        method="post"
                        id="createBookForm"
                        render={({ handleSubmit, form, submitting, pristine, values }) => (
                            <form onSubmit={handleSubmit} style={{display: 'flex', alignItems: 'center', justifyContent:'center', flexDirection: 'column', gap: '20px', }}>
                                <Field style={{width: '400px', borderRadius: '5px', border: '1px solid gray',}}
                                       component="input"
                                       placeholder='isbn'
                                       name='isbn'
                                       type="text"
                                       required
                                />
                                <Field style={{width: '400px',borderRadius: '5px', border: '1px solid gray'}}
                                       component="input"
                                       placeholder='title'
                                       name='title'
                                       type="text"
                                       required
                                />
                                <Field style={{width: '400px', borderRadius: '5px', border: '1px solid gray'}}
                                       component="input"
                                       placeholder='description'
                                       rows={4}
                                       name='description'
                                       type="text"
                                />
                                <Field style={{width: '400px', borderRadius: '5px', border: '1px solid gray'}}
                                       component="input"
                                       placeholder='author'
                                       name='author'
                                       type="text"
                                       required
                                />
                                <Field style={{width: '400px', borderRadius: '5px', border: '1px solid gray', color: 'gray'}}
                                       component="input"
                                       placeholder='publicationDate'
                                       type="date"
                                       name='publicationDate'
                                />
                                <Field style={{width: '400px', borderRadius: '5px', border: '1px solid gray'}}
                                       component="input"
                                       placeholder='reviews'
                                       rows={10}
                                       type="text"
                                       name='reviews'
                                />
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
