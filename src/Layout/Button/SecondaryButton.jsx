import React, { useState } from "react";
import { MdHome } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const SecondaryButton = ({ text, className, slug , icon , disabled}) => {
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    setIsClicked(true);

    // Set a timeout to reset the click state after a brief moment
    setTimeout(() => setIsClicked(false), 200); // 200ms delay
    if(slug){
      navigate(`/${slug}`);
    }
  };

  return (
    <div
      onClick={handleButtonClick}
      disabled={disabled}
      className={`text-xs md:text-sm lg:text-base text-center px-2 sm:px-4 md:px-5 py-[4px] sm:py-[6px] md:py-[6px] lg:py-3   bg-transparent text-primary rounded-sm hover:bg-theme hover:text-secondary cursor-pointer
    duration-300 active:bg-buttonHover active:border-buttonHover  border-[1px] border-theme hover:border-buttonHover flex items-center gap-1 md:gap-2  justify-center ${
      isClicked ? "bg-buttonHover" : ""
    } ${className}`}
    >
      {
        icon && <p >{icon}</p>
      }
      
      <p>{text}</p>
    </div>
  );
};

export default SecondaryButton;
