import React from 'react';
import {Button, Input} from "antd";
import TextArea from "antd/es/input/TextArea";
import {LeftOutlined} from "@ant-design/icons";
import {Link, useParams} from "react-router-dom";
import {useQuery} from "react-query";


function BookCard() {
    let  { bookId }  = useParams();

    const { isLoading, error, data } = useQuery(['booksData',bookId], () =>
        fetch(`https://demo.api-platform.com/books/${bookId}`).then(res =>
            res.json()
        )
    );

    if (isLoading) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message

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
                <Button type="primary">Submit</Button>
            </form>
        </>
    );
}

export default BookCard;