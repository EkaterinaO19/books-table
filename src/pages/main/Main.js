import React from "react";
import {useQuery} from '@tanstack/react-query'
import {Button, Layout} from "antd";
import 'antd/dist/antd.css';
import ErrorPage from "../../components/UI/ErrorPage";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import {Link} from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';


function Main() {

    const { isLoading, error, data } = useQuery({
        queryKey: ['booksData'],
        queryFn: () =>
            fetch(`https://demo.api-platform.com/books`).then(
                (res) => res.json(),
            ),
    })

    if (isLoading) return <LoadingSpinner />

    if (error) return <ErrorPage />


    return (
        <Layout>
            <h1 style={{display:'flex', justifyContent: 'center', fontSize:'30px', margin:'10px'}}>Book List</h1>
                <Link to={'/create'}><Button type="primary">Create Book</Button></Link>
                 <table>
                    <tr>
                        <th>id</th>
                        <th>isbn</th>
                        <th>title</th>
                        <th>description</th>
                        <th>author</th>
                        <th>publication date</th>
                        <th>reviews</th>
                        <th>actions</th>
                    </tr>
                        {data && Array?.isArray(data['hydra:member'])
                            && data['hydra:member']?.map((book, index) => {
                                return (
                                <tr key={uuidv4()}>
                                    <td key={book.id}><Link to={`/books/${book?.id}`}>{`/books/${book?.id}`}</Link></td>
                                        <td>{book?.isbn}</td>
                                        <td>{book?.title}</td>
                                        <td>{book?.description}</td>
                                        <td>{book?.author}</td>
                                        <td>{new Date(book?.publicationDate).toLocaleDateString()}</td>
                                    <td key={uuidv4()}>
                                        {book?.reviews?.map(review =>
                                            <Link to={`reviews/${review?.id}`}>{review.id}</Link>)}
                                        </td>
                                        <td key={uuidv4()}>
                                            <Link to={`/books/${book?.id}`}><button>show</button></Link>
                                            <Link to={`/books/${book?.id}/edit`}><button>edit</button></Link>
                                        </td>
                                    </tr>
                                );
                        })}

                </table>
        </Layout>
  );
}

export default Main;
