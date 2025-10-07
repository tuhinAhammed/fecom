
import React from 'react'

const CategoryTitle = ({className , text}) => {
  return (
    <h1 className={`text-lg sm:text-xl md:text-2xl lg:text-3xl  font-medium ${className}`}>{text}</h1>
  )
}

export default CategoryTitle