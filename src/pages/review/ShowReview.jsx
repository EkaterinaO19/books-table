import React from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import {LeftOutlined} from "@ant-design/icons";
import {Button} from "antd";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import ErrorPage from "../../components/UI/ErrorPage";
import useDelete from "../../hooks/useDelete";

function ShowReview(props) {

    let  { reviewId }  = useParams();
    // const navigate = useNavigate();
    // const queryClient = useQueryClient();

    const { isLoading, error, data } = useQuery(['showReview',reviewId], () =>
        fetch(`https://demo.api-platform.com/reviews/${reviewId}`).then(res =>
            res.json()
        )
    );

    const remove = useDelete("Review");
    const handleToDeleteReview = value => {
        remove.mutate(value);
    }


    if (isLoading) return <LoadingSpinner/>

    if (error) return <ErrorPage/>

    return (
        <div>
            <Link to={'/reviews'}><LeftOutlined/>Back</Link>
            <h1>Show Review: {`/reviews/${data?.id}`}</h1>
            <table style={{width: '70%'}}>
           reviewStore     <tr style={{backgroundColor: 'lightgray'}}>
                    <th style={{width: '10%'}}>Field</th>
                    <th>Value</th>
                </tr>
                <tr>
                    <td>body</td>
                    <td>{data?.body}</td>
                </tr>
                <tr>
                    <td>rating</td>
                    <td>{data?.rating}</td>
                </tr>
                <tr>
                    <td>book</td>
                    <td>
                        <Link to={`${data?.book["@id"]}`}>
                            {data?.book["@id"]}
                        </Link>
                    </td>
                </tr>
                <tr>
                    <td>author</td>
                    <td>{data?.author}</td>
                </tr>
                <tr>
                    <td>publication date</td>
                    <td>{data?.publicationDate}</td>
                </tr>
            </table>
            <Button type="primary">
                <Link to={`/reviews/${data?.id}/edit`}>Edit</Link>
            </Button>
            <Button danger onClick={()=>handleToDeleteReview(data)}>Delete</Button>
        </div>
    );
}

export default ShowReview;