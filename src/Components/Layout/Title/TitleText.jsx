import React from 'react'

const TitleText = ({className , text}) => {
  return (
    <h1 className={`text-3xl md:text-4xl lg:text-5xl ${className}`}>{text}</h1>
  )
}

export default TitleText