import React from 'react';

const ContactInput = ({ name, className, type, placeholder, onInputChange, value }) => {
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    onInputChange(name, newValue);
  };

  return (
    <div className="relative w-full">
      <input
        type={type}
        name={name}
        id={name}
        value={value} // Controlled by parent component
        onChange={handleInputChange}
        className={`peer py-3 text-primary w-full border-b-2 border-lightBorder focus:border-b-theme focus-visible:outline-none focus-visible:outline-0 text-lg ${className}`}
        placeholder=" "
      />
      <label
        htmlFor={name}
        className={`absolute text-lg left-0 top-2 text-[#a6a6a6] transition-all duration-300 transform origin-left 
          ${value ? 'scale-90 -translate-y-5' : 'scale-100 translate-y-0'} 
          peer-focus:scale-90 peer-focus:-translate-y-5 pointer-events-none`}
      >
        {placeholder}
      </label>
    </div>
  );
};

export default ContactInput;
