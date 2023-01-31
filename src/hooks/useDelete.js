import {useMutation, useQueryClient} from '@tanstack/react-query';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import ErrorPage from "../components/UI/ErrorPage";
import {BASE_URL} from "../utils/constants";

const useDelete=(nameOfObject)=>{
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation(removeObject => {
        return axios.delete(BASE_URL+`${removeObject["@id"]}`)
    }, {
        onSuccess: async () => {
            console.log(nameOfObject+' successfully deleted!')
            await queryClient.invalidateQueries('booksData', 'reviewsData')
            navigate('/');
        },
        onError: async () => {
           return <ErrorPage/>
        }
    });
}

export default useDelete;