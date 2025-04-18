import axios from "axios";
import { useState } from "react";

import { axiosProps } from "../common/types";


const useAxios = () => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    axios.defaults.baseURL = 'https://gorest.co.in/public';
    
    const callApi = async (props:axiosProps) => {
        const { url, method, body = null, headers = {} } = props;
        setResponse(null);
        setError(null)
        setIsLoading(true)
        try {
            const res = await axios({url,method, headers: headers || undefined,data:body});
            setResponse(res);
          
        } catch (err) {
            
            setError(err)
        } finally {
            setIsLoading(false);
        }
        
    }
    
    return { response, error, isLoading, callApi }
}

export { useAxios}