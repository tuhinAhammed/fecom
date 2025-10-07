import React from 'react'

const MinTitle = ({className , text , onClick}) => {
  return (
    <p onClick={onClick} className={`text-[12px] sm:text-xs md:text-sm  ${className}`}>{text}</p>
  )
}

export default MinTitle