import React from 'react';
import {Link, useNavigate,} from "react-router-dom";
import axios from "axios";
import {useMutation} from "@tanstack/react-query";
import CreateBookForm from "./CreateBookForm";
import {message} from "antd";


const CreateBook = () => {

    const navigate = useNavigate();
    const mutation = useMutation(createBook => {
        return axios.post('https://demo.api-platform.com/books', createBook)
    }, {
        onSuccess: async () => {
            alert('Book successfully created!')
            navigate('/');
        },
        onError: async () => {
        }
    });

    return (
        <div>
            {mutation.isLoading ? (
                'Adding book...'
            ) : (
                <>
                     <CreateBookForm mutation={mutation}/>
                     {mutation.isError && (
                             <div style={{color: 'red', fontWeight:'bold', textAlign:'center', marginTop: '20px'}}>smth went wrong</div>
                         )}
                </>
            )}
        </div>
    );
}

export default CreateBook;