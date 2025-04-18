import React from 'react';

import { tableProps } from '../common/types';

const CommonTable:React.FC<tableProps> = (props) => {
  const { data, header } = props;

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
                  {header.map((column) => (
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
                {data?.map((row) => (
                  <tr key={row.id} className='dark:hover:bg-gray-400 '>
                    {header.map(({ selector,cell }, index) => (
                       cell?(
                        <td key={index} className="px-4 py-3 text-white">{cell(row)}</td>
                       ):(
                        <td key={index} className={"px-6 py-4 whitespace-nowrap text-sm font-medium text-black-800 "}>{row[selector]}</td>
                       )
                      
                    ))}
                  </tr>
                ))}

              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  )
}

export default CommonTable