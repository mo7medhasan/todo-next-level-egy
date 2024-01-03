import React from 'react'

const LayoutAuth = ({children}) => {
  return (
    <div className='min-h-screen h-full w-full flex items-center justify-center'>
   <div className='max-w-xs border rounded-3xl shadow  bg-[#e9e9e9] h-full w-full text-center'> {children}</div></div>
  )
}

export default LayoutAuth