import React from 'react';
import {Link} from "react-router-dom";
import {Button, Layout} from "antd";
import {useQuery} from "@tanstack/react-query";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import ErrorPage from "../../components/UI/ErrorPage";
import { v4 as uuidv4 } from 'uuid';
import {BASE_URL} from "../../utils/constants";


function ReviewList(props) {

    const { isLoading, error, data } = useQuery({
        queryKey: ['reviewsData'],
        queryFn: () =>
            fetch(BASE_URL+`/reviews`).then(
                (res) => res.json(),
            ),
    })

    if (isLoading) return <LoadingSpinner />

    if (error) return <ErrorPage />

    return (
        <Layout>
            <h1 style={{display:'flex', justifyContent: 'center', fontSize:'30px', margin:'10px'}}>Reviews List</h1>
            <Link to={'/reviews/create'}>
                <Button type="primary">Create Review</Button>
            </Link>
            <table>
                <tr>
                    <th>id</th>
                    <th>body</th>
                    <th>rating</th>
                    <th>book</th>
                    <th>author</th>
                    <th>publication date</th>
                </tr>
                {data && Array?.isArray(data['hydra:member'])
                    && data['hydra:member']?.map((review) => {
                        return (
                            <tr key={uuidv4()}>
                                <td key={review.id}><Link to={`/reviews/${review?.id}`}>{`/reviews/${review?.id}`}</Link></td>
                                <td>{review?.body}</td>
                                <td>{review?.rating}</td>
                                <td key={review.id}>
                                    <Link to={`${review?.book["@id"]}`}>{`${review?.book["@id"]}`}</Link>
                                </td>
                                <td>{review?.author}</td>
                                <td>{new Date(review?.publicationDate).toLocaleDateString()}</td>
                                <td key={uuidv4()}>
                                    <Link to={`/reviews/${review?.id}`}><button>show</button></Link>
                                    <Link to={`/reviews/${review?.id}/edit`}><button>edit</button></Link>
                                </td>
                            </tr>
                        );
                    })}
            </table>
        </Layout>
    );
}

export default ReviewList;