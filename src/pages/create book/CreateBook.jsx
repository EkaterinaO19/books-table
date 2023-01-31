import React from 'react';
import { useNavigate,} from "react-router-dom";
import axios from "axios";
import { useMutation} from "@tanstack/react-query";
import CreateBookForm from "./CreateBookForm";
import {BASE_URL} from "../../utils/constants";


const CreateBook = () => {

    const navigate = useNavigate();
    const mutation = useMutation(createBook => {
        return axios.post(BASE_URL+'/books', createBook)
    }, {
        onSuccess: async () => {
            alert('Book successfully created!')
            navigate('/');
        },
        onError: async (error) => {
            // console.log(error['@context']['hydra:description'])
            alert(error.message)
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
                             <div style={{color: 'red', fontWeight:'bold', textAlign:'center', marginTop: '20px'}}>{mutation.error.message}</div>
                         )}
                </>
            )}
        </div>
    );
}

export default CreateBook;