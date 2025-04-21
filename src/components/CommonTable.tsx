import React from 'react';

import { TableProps } from '../common/types';

const CommonTable:React.FC<TableProps> = (props) => {
  const { data, header } = props;

  return (
    <div className="flex flex-col p-6">
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-200">
                <tr>
                
                  {header.map((column) => (
                    <th key={column.id} className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">{column.title}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
               
                {data?.map((row) => (
                  <tr key={row.id} className='dark:hover:bg-gray-100 transition'>
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
            {(!data || data.length === 0) && (
              <div className="text-center py-4 text-gray-500">No Data</div>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}

export default CommonTable