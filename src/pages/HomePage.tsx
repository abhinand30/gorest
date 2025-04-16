import { useEffect, useState } from 'react'
import CommonTable from '../components/CommonTable'
import Header from '../components/Header'
import { userDataType } from '../common/types'
import axios from 'axios'


const HomePage = () => {
    const [data, setData] = useState<userDataType[]>([]);
    const [pagination,setPagination]=useState({});
    const [currentPage,setCurrentPage]=useState<number>(1)

    useEffect(() => {
        const fetchData = async () => {
            try {
               const result=await axios.get(`https://gorest.co.in/public/v1/users?page=${currentPage}`);
               console.log(',,,',result.data.meta.pagination)
               setData(result.data.data);
               setPagination(result.data.meta.pagination)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [currentPage]);

    console.log(data)
    const tableHeader=[
        {id:1,title:'id',selector:'id'},
        {id:2,title:'Name',selector:'name'},
        {id:3,title:'Email',selector:'email'},
        {id:4,title:'Gender',selector:'gender'},
        {id:5,title:'Status',selector:'status'}
    ];
    const handleNextPage=()=>{
        setCurrentPage((prevState)=>prevState+1)
        
    }
    const handlePrevPage=()=>{
        setCurrentPage((prevState)=>prevState-1)
    }

    return (
        <div>
            
            <Header />
            {data.length>0?(
                 <CommonTable data={data} header={tableHeader} handleNext={handleNextPage} handlePrev={handlePrevPage} pagination={pagination}/>
            ):(
               
                <div>
                <p>No data</p>
            </div>
            )}
           
        </div>
    )
}

export default HomePage