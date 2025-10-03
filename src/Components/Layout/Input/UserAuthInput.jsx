import React from 'react'

const UserAuthInput = ({value , placeholder , type , name , required , autoComplete , onChange , id, className , onKeyDown}) => {
  const handleInputChange = (e) => {
    const newValue = (e.target.value)
    onChange(name , newValue)
  }
  return (
    <input onKeyDown={onKeyDown} value={value} onChange={handleInputChange} className={`inline-block text-sm md:text-sm lg:text-base font-normal rounded-sm  px-3 sm:px-3 md:px-4 lg:px-4 py-2 sm:py-2 md:py-2 lg:py-4 bg-secondary text-primary border-[1px] border-borderColor focus:border-theme !outline-0 !ring-0 focus:!ring-0  w-full placeholder:text-primary placeholder:opacity-[0.6] ${className}`} placeholder={placeholder} type={type} name={name} id={id}  required={required} autoComplete={autoComplete}/>
  )
}

export default UserAuthInput