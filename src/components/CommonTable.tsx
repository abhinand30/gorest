import React from 'react'

const CommonTable = (props) => {
    const {data,header,handleNext}=props;
    console.log(data,'>>>');
  return (
    <div className="flex flex-col p-6">
  <div className="-m-1.5 overflow-x-auto">
    <div className="p-1.5 min-w-full inline-block align-middle">
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-200">
            <tr>
              {/* <th scope="col" className="py-3 ps-4">
                <div className="flex items-center h-5">
                  <input id="hs-table-checkbox-all" type="checkbox" className="border-gray-200 rounded-sm text-blue-600 focus:ring-blue-500"/>
                  <label  className="sr-only">Checkbox</label>
                </div>
              </th> */}
              {header.map((column)=>(
                 <th key={column.id} className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">{column.title}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {/* <tr> */}
              {/* <td className="py-3 ps-4">
                <div className="flex items-center h-5">
                  <input id="hs-table-checkbox-1" type="checkbox" className="border-gray-200 rounded-sm text-blue-600 focus:ring-blue-500"/>
                  <label  className="sr-only">Checkbox</label>
                </div>
              </td> */}
             {data?.map((row)=>(
                <tr key={row.id} className='dark:hover:bg-gray-700'>
                    {header.map(({selector},index)=>(
                          <td key={index} className={"px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 "}>{row[selector]}</td>
                    ))}
                </tr>
             ))}
               
          </tbody>
        </table>
      </div>
      <div className='flex justify-end gap-6 p-5'>
             <button className='bg-blue-500 p-1 px-5 rounded-lg text-white'>Prev</button>
             <button  onClick={handleNext} className='bg-blue-500 p-1 px-5 rounded-lg text-white'>Next</button>
      </div>
    </div>
  </div>
</div>
  )
}

export default CommonTable