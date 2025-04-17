import React, { useState } from 'react'
import Header from '../components/Header'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import { formArray } from '../common/data/dataArray'
import { userDataType } from '../common/types'


const AddUserPage = () => {
  const apiKey = import.meta.env.VITE_TOKEN_KEY;
      

  const navigate=useNavigate()
  

  const [formData, setFormData] = useState<userDataType>({
    name: '',
    email: '',
    gender: '',
    status: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState, [name]: value
    }));
  }

  const handleAddUser = async () => {
    const isEmpty = Object.values(formData).some((value) => value === '');
    if (isEmpty) {
      alert("All fields are required!");
      return;
    }

    try{
      const response = await axios.post("https://gorest.co.in/public/v1/users", formData, {
        headers: {
          Authorization: `Bearer ${apiKey}`
        }
      })
    
      if(response.status==201){
        alert('user data successfully added');
        
      }else{
        alert('user data not added');
      }
    }catch(error){
      console.log(error);
    }finally{
      navigate('/')
    }
  }

  return (
    <div>
      <Header />
      <h1 className='text-center mt-10 text-2xl font-bold'>Add User</h1>

      <form onSubmit={(e) => { e.preventDefault(); handleAddUser() }} className='lg:p-20 lg:mx-20 bg-white shadow-sm'>
        {formArray.map((item) => (
          item.type === 'select' ? (
            <div key={item.id} className="mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select {item.name}</label>
              <select name={item.name} onChange={(e) => handleChange(e)} value={formData[item.name as keyof userDataType]} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="">Select {item.name}</option>
                {item.categories?.map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                ))}
              </select>
            </div>
          ) : (
            <div key={item.id} className="mb-5">
              <label className="block mb-2 text-sm font-medium text-black dark:text-black">{item.name}</label>
              <input type={item.type} name={item.name} value={formData[item.name as keyof userDataType]}
                onChange={(e) => handleChange(e)} className="bg-green-50 border border-white text-white dark:text-white placeholder-white dark:placeholder-white text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500"
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