import React, { useState } from 'react';

const ContactTextarea = ({ name, className, placeholder , onInputChange , value}) => {
    const [inputValue, setInputValue] = useState(''); // Track the textarea value

    const handleInputChange = (e) => {
        const newValue = e.target.value
        setInputValue(newValue); // Update the textarea value state
        onInputChange(name , newValue)
    };

    return (
        <div className="relative w-full mt-10">
            {/* The textarea field */}
            <textarea
                name={name}
                id={name}
                value={value} // Bind the value to the state
                onChange={handleInputChange} // Handle input changes
                className={`peer w-full pt-4  py-3 text-primary  border-b-2 border-lightBorder focus:border-b-theme focus-visible:outline-none focus-visible:outline-0 text-lg ${className}`}
                placeholder=" " // Blank placeholder for space
            ></textarea>
            {/* The floating label */}
            <label
                htmlFor={name}
                className={`absolute text-lg left-0 top-0 text-[#a6a6a6] transition-all duration-300 transform origin-left 
                ${value ? 'scale-90 translate-y-[-19px]' : 'scale-100 translate-y-0]'} 
                peer-focus:scale-90 peer-focus:-translate-y-5 pointer-events-none`}
            >
                Your Message*
            </label>
        </div>
    );
};

export default ContactTextarea;
