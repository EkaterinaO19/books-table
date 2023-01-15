import React from 'react';
import {useMutation, useQuery} from "react-query";
import axios from "axios";
import {Button, Input} from "antd";
import TextArea from "antd/es/input/TextArea";
import {LeftOutlined} from "@ant-design/icons";
import {Link, useNavigate, useParams} from "react-router-dom";
import useDelete from "../../hooks/useDelete";
import ErrorPage from "../../components/UI/ErrorPage";
import LoadingSpinner from "../../components/UI/LoadingSpinner";



function BookCard() {
    let  { bookId }  = useParams();
    const navigate = useNavigate();

    const { isLoading, isError, data} = useQuery(['booksData',bookId], () =>
        fetch(`https://demo.api-platform.com/books/${bookId}`).then(res =>
            res.json()),
    );

    const editBook = useMutation(editBook => {
        return axios.put(`https://demo.api-platform.com/books/${bookId}`, {
            headers: {'Content-Type': 'application/json'}
        })

    },
        {
        onSuccess: async () => {
            await alert('Book successfully replaced!')
            navigate('/');
        },
        onError: async () => {
            return <ErrorPage/>
        }
    });


    const remove = useDelete("Book");

    const handleToReplace = value => {
        editBook.mutate(value);
    }

    const handleToDelete = value => {
        remove.mutate(value);
    }


    if (isLoading) return <LoadingSpinner/>
    if (isError) return <ErrorPage/>

    return (
        <>
            <Link to={'/'}><LeftOutlined/>Back</Link>
            <h1 style={{display:'flex', justifyContent:'center'}}>Edit Book: <p>"{data?.title}"</p></h1>
            <form style={{display:'flex', alignItems:'center', flexDirection:'column', gap:'10px'}}>
                <Input style={{width:'400px'}} defaultValue={data?.isbn}/>
                <Input style={{width:'400px'}} defaultValue={data?.title} />
                <TextArea style={{width:'400px'}} defaultValue={data?.description} rows={4} />
                <Input style={{width:'400px'}} defaultValue={data?.author}/>
                <Input style={{width:'400px'}} defaultValue={data?.publicationDate}/>
                <TextArea style={{width:'400px'}} defaultValue={data?.reviews } rows={10} />
                <div style={{display: 'flex', flexDirection:'row', gap:'20px'}}>
                    <Button onClick={handleToReplace} type="primary">Edit</Button>
                    <Button danger onClick={()=>handleToDelete(data)}>Delete</Button>
                </div>
            </form>
        </>
    );
}

export default BookCard;