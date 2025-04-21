import React from "react";

import { PageNumberProps } from "../common/types"


const PageNumber: React.FC<PageNumberProps> = (props) => {
    const { pagination, handlePageChange } = props
    return (
      <>
        {Array.from({ length: 10 }, (_, i) => {
          const page = pagination.page - 5 + i
          return (
            page > 0 && page <= pagination.pages && (
              <button key={page} onClick={() => handlePageChange(page)} className={`px-2 rounded-sm ${pagination.page === page ? 'bg-blue-500 text-white' : ''}`}>{page}</button>
            ))
        })}
      </>
    )
  }
  export default PageNumber;
