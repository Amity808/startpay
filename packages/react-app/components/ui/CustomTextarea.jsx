import React from 'react'

const CustomTextarea = ({ children, ...props }) => {
  return (
    <div>
       <textarea className="textarea textarea-bordered" {...props}>{children}</textarea>
    </div>
  )
}

export default CustomTextarea