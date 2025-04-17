import axios from "axios";
import {  useState } from "react";

const useAxios = () => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    axios.defaults.baseURL = 'https://gorest.co.in/public/v1/users?'
    const fetchData = async (props) => {
        const { url, method, body = null, headers = null } = props;
        console.log(headers, "kk")
        try {
            const res = (await axios[method](url,headers, body));
            setResponse(res)
        } catch (err) {
    
            setError(err)
        } finally {
            setIsLoading(false);
        }
        
    }
    
    return { response, error, isLoading, fetchData }
}

export default useAxios