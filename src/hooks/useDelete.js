import {useMutation, useQueryClient} from '@tanstack/react-query';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import ErrorPage from "../components/UI/ErrorPage";

const useDelete=(nameOfObject)=>{

    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation(removeObject => {
        return axios.delete(`https://demo.api-platform.com${removeObject["@id"]}`)
    }, {
        onSuccess: async () => {
            alert(nameOfObject+' successfully deleted!')
            await queryClient.invalidateQueries('booksData', 'reviewsData')
            navigate('/');
        },
        onError: async () => {
           return <ErrorPage/>
        }
    });
}

export default useDelete;