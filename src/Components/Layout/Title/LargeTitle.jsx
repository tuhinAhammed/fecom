import React from 'react'

const LargeTitle = ({className , text}) => {
  return (
    <h1 className={`text-3xl md:text-4xl lg:text-6xl ${className}`}>{text}</h1>
  )
}

export default LargeTitle