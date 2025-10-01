import React from 'react'

const ExtraMinTitle = ({className , text , onClick}) => {
  return (
    <p onClick={onClick} className={`text-[10px] md:text-[10px] lg:text-xs  ${className}`}>{text}</p>
  )
}

export default ExtraMinTitle