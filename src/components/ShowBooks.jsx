import React from 'react';
import {LeftOutlined} from "@ant-design/icons";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useMutation, useQuery} from "react-query";
import {Button, Table} from "antd";
import { removeBook } from "../api";
import axios from "axios";


function ShowBooks() {
    let  { bookId }  = useParams();

    const navigate = useNavigate();
    const handelToEditBook = () => {
        navigate(`/edit`)
    }

    const { isLoading, error, data, redirect } = useQuery(['showBook',bookId], () =>
        fetch(`https://demo.api-platform.com/books/${bookId}`).then(res =>
            res.json()
        )
    );


    const handleToDelete = value => {
        mutation.mutate(value);
    }

    const mutation = useMutation(removeBook => {
        return axios.delete('https://demo.api-platform.com/books', removeBook)
    }, {
        onSuccess: async () => {
            alert('Book successfully deleted!')
            navigate('/');
        },
        onError: async () => {
        }
    });

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
            <Button onClick={handelToEditBook} type="primary">Edit</Button>
            <Button danger onSubmit={handleToDelete}>Delete</Button>
        </>
    );
}

export default ShowBooks;