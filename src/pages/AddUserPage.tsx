import React, {  useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';

import Header from '../components/Header'
import { formArray } from '../common/data/dataArray'
import { useAxiosTypes, userDataType } from '../common/types'
import { useAxios } from '../hooks/useAxios'



const AddUserPage = () => {
  const apiKey = import.meta.env.VITE_TOKEN_KEY;
  
  const { response, callApi, error }: useAxiosTypes = useAxios();
  const [result,setResult]=useState<number|null>(null)
  

  const [formData, setFormData] = useState<userDataType>({
    name: '',
    email: '',
    gender: '',
    status: ''
  })

  useEffect(() => {
    if(response&&!error){
      setResult(response.status);
     }
    
  }, [response,error])
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState, [name]: value
    }));
  }
  

  
  const handleAddUser =  async() => {
    const isEmpty = Object.values(formData).some((value) => value === '');
    if (isEmpty) {
      alert("All fields are required!");
      return;
    }
   await callApi({ url: '/v1/users', headers: { Authorization: `Bearer ${apiKey}` }, method: 'post', body: formData });
      
      if (result === 201) {
        toast.success('User successfully added');
      } else if (error?.status === 422) {
        toast.warning('Email is already added');
      } else {
        toast.error('User data is not added');
      }
  

  }

  return (
    <div>
      <Header />
      <ToastContainer />
      <h1 className='text-center mt-10 text-2xl font-bold'>Add User</h1>

      <form onSubmit={(e) => { e.preventDefault(); handleAddUser() }} className='lg:p-20 lg:mx-50 xl:mx-100 bg-white shadow-sm'>
        {formArray.map((item) => (
          item.type === 'select' ? (
            <div key={item.id} className="mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-900 ">Select {item.name}</label>
              <select name={item.name} onChange={(e) => handleChange(e)} value={formData[item.name as keyof userDataType]} className="bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600  dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="">Select {item.name}</option>
                {item.categories?.map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                ))}
              </select>
            </div>
          ) : (
            <div key={item.id} className="mb-5">
              <label className="block mb-2 text-sm font-medium text-black">{item.name}</label>
              <input type={item.type} name={item.name} value={formData[item.name as keyof userDataType]}
                onChange={(e) => handleChange(e)} className=" border text-black-500   text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                placeholder={`Enter ${item.name}`} />
            </div>
          )
        ))}
        <button
          type='submit'
          className="px-4 py-2 bg-black rounded text-white shadow-md hover:opacity-90 focus:ring-2 focus:ring-offset-2"
        >
          Add Product
        </button>
      </form>
    </div>
  )
}

export default AddUserPage