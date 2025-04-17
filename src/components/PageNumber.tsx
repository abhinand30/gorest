import React from "react"
import { pageNumberProps } from "../common/types"


const PageNumber: React.FC<pageNumberProps> = (props) => {
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
