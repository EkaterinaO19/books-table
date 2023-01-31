import {useMutation, useQueryClient} from '@tanstack/react-query';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import ErrorPage from "../components/UI/ErrorPage";
import {BASE_URL} from "../utils/constants";

const useDeleteForId=(nameOfdeletedObject)=>{
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation(id => {
        return axios.delete(BASE_URL+`${id}`)
    }, {
        onSuccess: async () => {
            console.log(nameOfdeletedObject+' successfully deleted!')
            await queryClient.invalidateQueries('booksData', 'reviewsData')
            navigate('/');
        },
        onError: async () => {
           return <ErrorPage/>
        }
    });
}

export default useDeleteForId;