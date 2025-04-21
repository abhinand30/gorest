import { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

import CommonTable from '../components/CommonTable'
import Header from '../components/Header'
import { ApiResponse, Pagination, User, UserData, Users, } from '../common/types'
import Loader from '../components/Loader'
import SearchContainer from '../components/SearchContainer'
import { useAxios } from '../hooks/useAxios'
import PaginationComponent from '../components/PaginationComponent'
import Modal from '../components/Modal'
import Forms from '../components/Forms'
import { formArray } from '../common/data/dataArray'



const HomePage = () => {
    const apiKey = import.meta.env.VITE_TOKEN_KEY;
    const navigate = useNavigate();

    const { callApi, isLoading } = useAxios();

    const [data, setData] = useState<User[]>();
    const [pagination, setPagination] = useState<Pagination | undefined>();
    const [modal, setModal] = useState<boolean>(false);

    const [formData, setFormData] = useState<Users>({
        id: null,
        name: '',
        email: '',
        gender: '',
        status: ''
    });

    useEffect(() => {
        fetchUserData(1);

    }, []);

    const fetchUserData = async (page: number) => {
        const res: ApiResponse<User[]> = await callApi({ url: `/v1/users?page=${page}`, method: 'get' });
        if (res?.data) {
            setData(res.data.data);
            setPagination(res.data.meta?.pagination);
        }
    }

    const handlePageChange = (id: number) => {
        fetchUserData(id)
    }

    const handleSearch = async (text: string) => {
        if (!text) {
            fetchUserData(1)
        }
        const res: ApiResponse<User[]> = await callApi({ url: `/v1/users?email=${text}`, method: 'get' })
        if (res?.data) {

            setData(res.data.data);
            setPagination(res?.data.meta?.pagination)
        }
    }

    const handleDelete = async (id: number) => {
        const confirmed = window.confirm('Are sure want to delete')
        if (!confirmed) return

        const res: ApiResponse<number> = await callApi({ url: `/v1/users/${id}`, method: 'delete', headers: { Authorization: `Bearer ${apiKey}` } })
        console.log(res)
        if (res?.status === 200) {

            toast.success('user data Successfully deleted');

            if (pagination) fetchUserData(pagination.page);

        } else if (res?.status === 204) {
            toast('sucessfully processed');
        }
        else {
            toast.error('failed to delete user data')
        }
    }

    const handleEdit = async () => {
        const isEmpty = Object.values(formData).some((value) => value === '');
        if (isEmpty) {
            alert("All fields are required!");
            return;
        }
        
        const res: ApiResponse<UserData> = await callApi({ url: `/v2/users/${formData.id}`, method: 'put', headers: { Authorization: `Bearer ${apiKey}` }, body: formData })
        if (res?.status === 200) {
            toast.success('sucessfully updated user data');
            if (pagination) fetchUserData(pagination.page);
            handleModal()
        } else {
            toast.error('failed to update user data')
        }
    }


    const handleOpen = (row: User) => {
        setModal(true);
        setFormData(row);

    }

    const handleModal = () => {
        setModal(!modal)
    }

    const tableHeader = [
        { id: 1, title: 'id', selector: 'id' },
        { id: 2, title: 'Name', selector: 'name' },
        { id: 3, title: 'Email', selector: 'email' },
        { id: 4, title: 'Gender', selector: 'gender' },
        { id: 5, title: 'Status', selector: 'status' },
        {
            id: 6, title: 'Action', cell: (row: User) => <div className="flex gap-10">
                <button className="bg-red-400 text-white px-3 py-1 rounded-md shadow hover:bg-red-600 transition"
                    onClick={() => handleDelete(row.id)}>
                    Delete
                </button>
                <button className="bg-blue-400 text-white px-3 py-1 rounded-md shadow hover:bg-blue-600 transition"
                    onClick={() => handleOpen(row)}>
                    Edit
                </button>
            </div>

        }
    ];

    return (
        <div>
            <ToastContainer />
            <Header />
            <div className='flex p-5 justify-between items-center'>
                <SearchContainer handleSearch={handleSearch} />
                <button className='bg-blue-600 h-10 px-2 text-white rounded-lg' onClick={() => navigate('/adduser')}>Add Data</button>
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
            {modal && (
                <Modal handleModal={handleModal}>
                    <Forms onClick={handleEdit} isLoading={isLoading} setFormData={setFormData} formArray={formArray} formData={formData} handleModal={handleModal} isEdit={true} />
                </Modal>
            )}

        </div>
    )
}

export default HomePage