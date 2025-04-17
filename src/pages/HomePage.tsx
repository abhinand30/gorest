import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import CommonTable from '../components/CommonTable'
import Header from '../components/Header'
import {  userType } from '../common/types'
import Loader from '../components/Loader'
import SearchContainer from '../components/SearchContainer'
import { tableHeader } from '../common/data/dataArray'
import PaginationComponent from '../components/PaginationComponent'


const HomePage = () => {
    const navigate = useNavigate()
    const [data, setData] = useState<userType[]>();
    const [pagination, setPagination] = useState({});
    const [isLoading, setIsLoading] = useState<boolean>(false);
  

    useEffect(() => {
            fetchUserData(1);
    }, []);

   

    const fetchUserData = async (page: number) => {
        setIsLoading(true);
        try {
            const result = await axios.get(`https://gorest.co.in/public/v1/users?page=${page}`);
            setData(result.data.data);
            setPagination(result.data.meta.pagination)
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    }

    const handlePageChange = (id: number) => {
        fetchUserData(id)
    }

    const handleSearch = async (text:string) => { 
        if (!text){
            fetchUserData(1)
        }
        try {
            const result = await axios.get(`https://gorest.co.in/public/v1/users?email=${text}`);
            setData(result.data.data);
            setPagination(result.data.meta.pagination)
        } catch (error) {
            console.error(error);

        }
    }

    return (
        <div>

            <Header />
            <div className='flex p-5 justify-between items-center'>
                <SearchContainer handleSearch={handleSearch}  />
                <button className='bg-blue-400 h-10 px-2 text-white rounded-lg' onClick={() => navigate('/adduser')}>Add Data</button>
            </div>

            {isLoading ?
                (
                    <Loader />
                ) :
                (
                    <>
                        <CommonTable data={data} header={tableHeader} />
                        <PaginationComponent handlePageChange={handlePageChange} pagination={pagination} />
                    </>
                )}
        </div>
    )
}

export default HomePage