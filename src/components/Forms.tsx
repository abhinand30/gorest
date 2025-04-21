import React from 'react'
import { FormProps, UserData } from '../common/types';

const Forms:React.FC<FormProps> = (props) => {
    const {formArray,formData,setFormData,onClick,isLoading,isEdit,handleModal}=props;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData((prevState) => ({
        ...prevState, [name]: value
      }));
    }
  
    
  return (
    
    <form onSubmit={(e) => { e.preventDefault(); onClick() }} className='lg:p-20  xl:mx-100 bg-white shadow-sm'>
        {formArray?.map((item) => (
          <div key={item.id} className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              {item.type === 'select' ? `Select ${item.name}` : item.name}
            </label>

            {item.type === 'select' ? (

              <select name={item.name} onChange={(e) => handleChange(e)} value={formData[item.name as keyof UserData]} className="bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600  dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="">Select {item.name}</option>
                {item.categories?.map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                ))}
              </select>

            ) : (

              <input type={item.type} name={item.name} value={formData[item.name as keyof UserData]}
                onChange={(e) => handleChange(e)} className=" border text-black-500   text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                placeholder={`Enter ${item.name}`} />

            )}
          </div>
        ))}
        <div className='flex gap-10'>
        <button
          type='submit'
          disabled={isLoading}
          className={`px-4 py-2 bg-blue-600 ${isLoading && 'bg-gray-500'} rounded text-white shadow-md hover:opacity-90 focus:ring-2 focus:ring-offset-2`}
        >
          {isEdit?'Edit User':'Add User'}
        </button>
        {isEdit&&(
          <button
          disabled={isLoading}
          onClick={handleModal}
          className={`px-4 py-2 bg-black ${isLoading && 'bg-gray-500'} rounded text-white shadow-md hover:opacity-90 focus:ring-2 focus:ring-offset-2`}
        >
          Cancel
        </button>
        )}
        </div>
      </form>
  )
}

export default Forms;