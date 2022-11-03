import React from 'react';
import {Link, useNavigate,} from "react-router-dom";
import axios from "axios";
import {useMutation} from "react-query";
import BookForm from "../book list/BookForm";



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
                     <BookForm mutation={mutation}/>
                     {mutation.isError && (
                             <div style={{color: 'red', fontWeight:'bold', textAlign:'center', marginTop: '20px'}}>Ooops, something went wrong...</div>
                         )}
                </>
            )}
        </div>
    );
}

export default CreateBook;