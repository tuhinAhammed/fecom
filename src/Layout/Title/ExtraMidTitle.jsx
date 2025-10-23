import React from 'react'

const ExtraMidTitle = ({className , text}) => {
  return (
    <h1 className={`capitalize text-sm sm:text-base md:text-lg ${className}`}>{text}</h1>
  )
}

export default ExtraMidTitle