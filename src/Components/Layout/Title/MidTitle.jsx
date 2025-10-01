import React from 'react'

const MidTitle = ({className , text , key}) => {
  return (
    <h1 key={key} className={`text-xs sm:text-sm md:text-base capitalize  ${className}`}>{text}</h1>
  )
}

export default MidTitle