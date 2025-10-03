import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const PasswordInput = ({
  value,
  placeholder,
  name,
  required,
  onChange,
  className,
  onKeyDown,
  id,
  autoComplete
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    onChange(name, newValue);
  };

  const handlePasswordShow = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative">
      <input
        value={value}
        onChange={handleInputChange}
        className={`inline-block text-sm md:text-sm lg:text-base font-normal rounded-sm  px-3 sm:px-3 md:px-4 lg:px-4 py-2 sm:py-2 md:py-2 lg:py-4 bg-secondary text-primary border-[1px] border-borderColor focus:border-theme !outline-0 !ring-0 focus:!ring-0  w-full  text-primary placeholder:text-primary placeholder:opacity-[0.6] ${className}`}
        placeholder={placeholder}
        type={`${showPassword ? "text" : "password"}`}
        name={name}
        required={required}
        onKeyDown={onKeyDown}
        id={id}
        autoComplete={autoComplete}
      />
      <p
        onClick={handlePasswordShow}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary cursor-pointer text-xs"
      >
        {showPassword ? <FiEye /> : <FiEyeOff />}
      </p>
    </div>
  );
};

export default PasswordInput;