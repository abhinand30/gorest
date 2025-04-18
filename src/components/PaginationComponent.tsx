import React from 'react'
import {  paginationProps } from '../common/types';
import PageButton from './PageButton';
import PageNumber from './PageNumber';

const PaginationComponent: React.FC<paginationProps> = (props) => {
  const { pagination, handlePageChange } = props;
  console.log(pagination)
  return (
    <div className='flex gap-6 p-5 justify-between items-center'>
      <p>{pagination?.total} of data from {pagination?.pages} pages</p>
      <div className='flex'>

        <PageButton onClick={() => handlePageChange(pagination?.page - 1)} disabled={pagination?.page === 1}>
          Prev
        </PageButton>
        {pagination.page > 10 && (
          <>
            <button onClick={() => handlePageChange(1)} className={`px-2 rounded-sm ${pagination?.page === 1 ? 'bg-blue-500 text-white' : ''}`}>{1}</button>
            <span>...</span>
          </>
        )}

        <PageNumber pagination={pagination} handlePageChange={handlePageChange} />
        {pagination?.page < pagination?.pages - 10 && (
          <>
            <span>...</span>
            <button onClick={() => handlePageChange(pagination?.pages)} disabled={pagination?.page === pagination?.pages}>
              {pagination?.pages}
            </button>
          </>
        )}
        <PageButton onClick={() => handlePageChange(pagination?.page + 1)} disabled={pagination?.page === pagination?.pages}>
          Next
        </PageButton>
      </div>
    </div>
  )
}

export default PaginationComponent;




