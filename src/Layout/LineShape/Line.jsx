import React from 'react'

const Line = ({className}) => {
  return (
    <div className={`w-[70px] md:w-[100px] py-[2px] md:py-[4px] rounded-full bg-theme mt-2  md:mt-3 ${className}`}></div>
  )
}

export default Line