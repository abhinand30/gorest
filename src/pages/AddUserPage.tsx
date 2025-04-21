import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';

import Header from '../components/Header'
import { formArray } from '../common/data/dataArray'
import { useAxios } from '../hooks/useAxios'
import { ApiResponse, UserData } from '../common/types';
import Forms from '../components/Forms';


const AddUserPage = () => {
  const apiKey = import.meta.env.VITE_TOKEN_KEY;

  const { callApi, isLoading } = useAxios();

  const [formData, setFormData] = useState<UserData>({
    name: '',
    email: '',
    gender: '',
    status: ''
  })

  const handleAddUser = async () => {
    const isEmpty = Object.values(formData).some((value) => value === '');
    if (isEmpty) {
      alert("All fields are required!");
      return;
    }
    const res: ApiResponse<UserData> = await callApi({ url: '/v1/users', headers: { Authorization: `Bearer ${apiKey}` }, method: 'post', body: formData });

    if (res?.status === 201) {
      toast.success('User successfully added');
      setFormData({
        name: '',
        email: '',
        gender: '',
        status: ''
      });
    } else if (res?.status === 422) {
      toast.warning('Email is already added');
    } else {
      toast.error('Failed to add data');
      setFormData({
        name: '',
        email: '',
        gender: '',
        status: ''
      });
    }
  };

  return (
    <div>

      <Header />
      <ToastContainer />
      <h1 className='text-center mt-10 text-2xl font-bold'>Add User</h1>

      <Forms onClick={handleAddUser} isLoading={isLoading} setFormData={setFormData} formArray={formArray} formData={formData} />
    </div>
  )
}

export default AddUserPage