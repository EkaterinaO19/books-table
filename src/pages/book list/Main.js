import React from "react";
import {useQuery} from '@tanstack/react-query'
import {Button, Layout} from "antd";
import BooksTable from "./BooksTable";
import 'antd/dist/antd.css';
import ErrorPage from "../../components/UI/ErrorPage";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import {Link, useNavigate} from "react-router-dom";


function Main() {

    const { isLoading, error, data } = useQuery({
        queryKey: ['booksData'],
        queryFn: () =>
            fetch(`https://demo.api-platform.com/books`).then(
                (res) => res.json(),
            ),
    })


    if (isLoading) return <LoadingSpinner />

    if(error) return error.message

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
                                <tr key={index}>
                                    <td><Link to={`books/${book?.id}`}>{book?.id}</Link></td>
                                        <td>{book?.isbn}</td>
                                        <td>{book?.title}</td>
                                        <td>{book?.description}</td>
                                        <td>{book?.author}</td>
                                        <td>{new Date(book?.publicationDate).toLocaleDateString()}</td>
                                    <td>
                                        {book?.reviews?.map(review =>
                                            <Link to={`reviews/${review?.id}`}>{review.id}</Link>)}
                                        </td>
                                        <td>
                                            <Link to={``}><button>show</button></Link>

                                            <button>edit</button>
                                        </td>
                                    </tr>
                                );
                        })}

                </table>
                {/*{data && data['hydra:member'] && Array?.isArray(data['hydra:member']) &&*/}
                {/*    <BooksTable*/}
                {/*        data={data['hydra:member']}*/}
                {/*    />*/}
                {/*}*/}
        </Layout>
  );
}

export default Main;
