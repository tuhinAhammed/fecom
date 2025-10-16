import React from 'react'

const MinTitle = ({className , text , onClick}) => {
  return (
    <p onClick={onClick} className={`text-xs md:text-sm  ${className}`}>{text}</p>
  )
}

export default MinTitle