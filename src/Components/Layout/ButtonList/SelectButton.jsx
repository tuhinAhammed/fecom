import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SelectButton = ({ text, className, onClick, icon }) => {
  const [isClicked, setIsClicked] = useState(false);
  //   const navigate = useNavigate();

  const handleButtonClick = () => {
    setIsClicked(true);

    // Set a timeout to reset the click state after a brief moment
    // setTimeout(() => setIsClicked(false), 200); // 200ms delay

    // navigate(`/${slug}`);
  };

  return (
    <div
      onClick={onClick}
      className={`text-[10px] md:text-[12px] text-center px-1 sm:px-[2px] md:px-5 py-[6px] md:py-[10px] rounded-md  bg-static text-secondary hover:bg-theme hover:border-theme
    duration-300 cursor-pointer   border-[1px] border-static active:bg-static active:border-static hover:border-buttonHover flex items-center gap-1  justify-center ${
      isClicked ? "bg-buttonHover" : ""
    } ${className}`}
    >
      <p className="">{icon}</p>
      {text}
    </div>
  );
};

export default SelectButton;
