import React from 'react';

import { PaginationProps } from '../common/types';
import PageButton from './PageButton';
import PageNumber from './PageNumber';

const PaginationComponent: React.FC<PaginationProps> = (props) => {
  const { pagination, handlePageChange } = props;
  
  if (!pagination) return null;
  const { page, pages, total } = pagination;
  return (
    <div className='flex gap-6 p-5 justify-between items-center'>
      <p>{total} of data from {pages} pages</p>
      <div className='flex'>

        <PageButton onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
          Prev
        </PageButton>
        {pagination.page > 10 && (
          <>
            <button onClick={() => handlePageChange(1)} className={`px-2 rounded-sm ${page === 1 ? 'bg-blue-500 text-white' : ''}`}>{1}</button>
            <span>...</span>
          </>
        )}

        <PageNumber pagination={pagination} handlePageChange={handlePageChange} />
        {page < pages - 5 && (
          <>
            <span>...</span>
            <button onClick={() => handlePageChange(pages)} disabled={page === pages}>
              {pages}
            </button>
          </>
        )}
        <PageButton onClick={() => handlePageChange(page + 1)} disabled={page === pages}>
          Next
        </PageButton>
      </div>
    </div>
  )
}

export default PaginationComponent;




