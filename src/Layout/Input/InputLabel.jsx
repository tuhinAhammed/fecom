import React from 'react'

const InputLabel = ({text , required , className}) => {
  return (
    <label className={`text-sm md:text-sm lg:text-base block ${className}`} htmlFor="" >{text }<span className="text-red-500">{required ? " *" : ""}</span></label>
  )
}

export default InputLabel