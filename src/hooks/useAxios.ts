import axios from "axios";
import { useState } from "react";

import { AxiosProps } from "../common/types";


const useAxios = () => {
    
    const [isLoading, setIsLoading] = useState<boolean>(false);

    axios.defaults.baseURL = 'https://gorest.co.in/public';
    
    const callApi = async  <T>(props:AxiosProps) => {
        const { url, method, body = null, headers = {} } = props;
        setIsLoading(true);
        try {
            const res = await axios({url,method, headers: headers || undefined,data:body});
            return res as T;
        } catch (err) {
            return err as T;
        } finally {
            setIsLoading(false);
        }
    }
    return {  isLoading, callApi }
}

export { useAxios}