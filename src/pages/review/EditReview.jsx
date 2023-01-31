import React from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import {LeftOutlined} from "@ant-design/icons";
import {Button, Input} from "antd";
import {useMutation, useQuery} from "@tanstack/react-query";
import axios from "axios";
import ErrorPage from "../../components/UI/ErrorPage";
import useDelete from "../../hooks/useDelete";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import {BASE_URL} from "../../utils/constants";

function EditReview(props) {

    let  { reviewId }  = useParams();
    const navigate = useNavigate();

    const { isLoading, error, data } = useQuery(['showReview',reviewId], () =>
        fetch(BASE_URL+`/reviews/${reviewId}`).then(res =>
            res.json()
        )
    );


    const editReview = useMutation(editReview => {
            return axios.put(BASE_URL+`/reviews/${reviewId}`, {
                headers: {'Content-Type': 'application/json'}
            })
        },
        {
            onSuccess: async () => {
                await alert('Review successfully edited!')
                navigate('/');
            },
            onError: async () => {
                return <ErrorPage/>
            }
        });


    const remove = useDelete("Review");

    const handleToReplaceReview = value => {
        editReview.mutate(value);
    }

    const handleToDeleteReview = value => {
        remove.mutate(value);
    }

    if (isLoading) return <LoadingSpinner />

    if (error) return <ErrorPage />

    return (
        <div>
            <Link to={'/reviews'}><LeftOutlined/>Back</Link>
            <h1>Edit Review: {`/reviews/${data?.id}`}</h1>
            <table style={{width: '70%'}}>
                <tr style={{backgroundColor: 'lightgray'}}>
                    <th style={{width: '10%'}}>Field</th>
                    <th>Value</th>
                </tr>
                <tr>
                    <td>body</td>
                    <td>
                        <Input defaultValue={data?.body}/>
                    </td>
                </tr>
                <tr>
                    <td>rating</td>
                    <td>
                        <Input defaultValue={data?.rating}/></td>
                </tr>
                <tr>
                    <td>book</td>
                    <td>
                        <Input defaultValue={data?.book["@id"]}/></td>
                </tr>
                <tr>
                    <td>author</td>
                    <td><Input defaultValue={data?.author}/></td>
                </tr>
                <tr>
                    <td>publication date</td>
                    <td><Input defaultValue={data?.publicationDate}/></td>
                </tr>
            </table>
            <Button type="primary" onClick={handleToReplaceReview}>Submit</Button>
            <Button danger onClick={()=>handleToDeleteReview(data)}>Delete</Button>
        </div>
    );
}

export default EditReview;