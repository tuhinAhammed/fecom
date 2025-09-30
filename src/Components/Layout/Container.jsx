import React from 'react'

const Container = ({className , children}) => {
  return (
    <div className={`container px-2 mx-auto  ${className}`}>{children}</div>
  )
}

export default Container