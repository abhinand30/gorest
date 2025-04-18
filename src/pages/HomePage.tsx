import { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

import CommonTable from '../components/CommonTable'
import Header from '../components/Header'
import {   paginationTypes, useAxiosTypes, userType } from '../common/types'
import Loader from '../components/Loader'
import SearchContainer from '../components/SearchContainer'
import PaginationComponent from '../components/PaginationComponent'
import {useAxios} from '../hooks/useAxios'



const HomePage = () => {
    const apiKey = import.meta.env.VITE_TOKEN_KEY;
    const navigate = useNavigate();
    
    const { response, callApi,error,isLoading}:useAxiosTypes=useAxios();

    const [data, setData] = useState<userType[]>();
    const [pagination, setPagination] = useState<paginationTypes|undefined>(undefined);
   
  

    useEffect(() => {
            fetchUserData(1);
            
    },[]);

   useEffect(() => {
    if(!isLoading&&response?.data&&!error){
        setData(response.data.data);
        setPagination(response.data.meta.pagination)
       }
       
   }, [response,error,isLoading])
   

    const fetchUserData = async (page: number) => {
            await callApi({url:`/v1/users?page=${page}`,method:'get'});
           
    }

    const handlePageChange = (id: number) => {
        fetchUserData(id)
    }

    const handleSearch = async (text:string) => { 
        if (!text){
            fetchUserData(1)
        }
            await callApi({url:`/v1/users?email=${text}`,method:'get'})
            console.log(response)
    }

    const handleDelete=async(id:number)=>{
        const confirmed=window.confirm('Are sure want to delete')
        if(!confirmed) return

            await callApi({url:`/v1/users/${id}`,method:'delete',headers:{Authorization:`Bearer ${apiKey}`}})
            console.log(response)
            if(response.status===200){
               
                toast.success('user Successfully deleted')
            }else{
                toast.error('failed to delete user data')
            }
            if(pagination){
                fetchUserData(pagination.page);
            }
           
    }

    const tableHeader = [
        { id: 1, title: 'id', selector: 'id' },
        { id: 2, title: 'Name', selector: 'name' },
        { id: 3, title: 'Email', selector: 'email' },
        { id: 4, title: 'Gender', selector: 'gender' },
        { id: 5, title: 'Status', selector: 'status' },
        {
            id: 6,title:'Action', cell: (row: userType) => <div className="flex gap-10"> <button className="bg-red-400 text-white px-3 py-1 rounded-md shadow hover:bg-red-600 transition"
              onClick={() => handleDelete(row.id)}>
              Delete
            </button>
            </div>
              
          }
    ];
    return (
        <div>
            <ToastContainer/>
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