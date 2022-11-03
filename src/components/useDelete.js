import {useMutation, useQueryClient} from "react-query";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const useDelete=(nameOfObject)=>{

    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation(removeObject => {
        return axios.delete(`https://demo.api-platform.com${removeObject["@id"]}`)
    }, {
        onSuccess: async () => {
            alert(nameOfObject+' successfully deleted!')
            await queryClient.invalidateQueries('booksData')
            navigate('/');
        },
        onError: async () => {
            alert('Something went wrong!')
        }
    });
}

export default useDelete;