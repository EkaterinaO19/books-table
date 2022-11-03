import React from 'react';
import {LeftOutlined} from "@ant-design/icons";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {Button} from "antd";
import axios from "axios";


function ShowBook() {
    let  { bookId }  = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();


    const { isLoading, error, data, redirect } = useQuery(['showBook',bookId], () =>
        fetch(`https://demo.api-platform.com/books/${bookId}`).then(res =>
            res.json()
        )
    );

    const remove = useMutation(removeBook => {
        return axios.delete(`https://demo.api-platform.com/books/${bookId}`)
    }, {
        onSuccess: async () => {
            await alert('Book successfully deleted!')
            await queryClient.invalidateQueries('booksData')
            navigate('/');
        },
        onError: async () => {
        }
    });

    const handleToEdit = () => {
        navigate('edit')
    }

    const handleToDelete = value => {
        remove.mutate(value);
    }



    if (isLoading) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message

    return (
        <>
            <Link to={'/'}><LeftOutlined/>Back</Link>
                <h1>Edit Book: {data.title}</h1>
            <table style={{width: '70%'}}>
                <tr style={{backgroundColor: 'lightgray'}}>
                    <th style={{width: '10%'}}>Field</th>
                    <th>Value</th>
                </tr>
                <tr>
                    <td>isbn</td>
                    <td>{data.isbn}</td>
                </tr>
                <tr>
                    <td>author</td>
                    <td>{data.author}</td>
                </tr>
                <tr>
                    <td>title</td>
                    <td>{data.title}</td>
                </tr>
                <tr>
                    <td>description</td>
                    <td>{data.description}</td>
                </tr>
                <tr>
                    <td>publicationDate</td>
                    <td>{data.publicationDate}</td>
                </tr>
                <tr>
                    <td>reviews</td>
                    <td>{data.reviews.map(review => review.body)}</td>
                </tr>
            </table>
            <Button onClick={handleToEdit} type="primary">Edit</Button>
            <Button danger onClick={handleToDelete}>Delete</Button>
        </>
    );
}

export default ShowBook;