import React from 'react'
import { PageButtonProps } from '../common/types'

const PageButton: React.FC<PageButtonProps> = (props) => {
    const { onClick, disabled, children } = props
    return (
      <button onClick={onClick} disabled={disabled} className={`mx-2 px-2 p-1 rounded-sm text-white ${disabled ? 'bg-blue-100' : 'bg-blue-500'}`}>{children}</button>
    )
  }

export default PageButton