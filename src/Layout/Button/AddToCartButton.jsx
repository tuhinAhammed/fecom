import React, { useState } from "react";
import { MdAddShoppingCart } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const AddToCartButton = ({ text, className , onClick , icon}) => {
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
      className={`text-[10px] md:text-sm text-center px-1 sm:px-[2px] md:px-4 lg:px-2  py-1 md:py-2   bg-theme text-secondary hover:bg-buttonHover 
    duration-300 cursor-pointer active:bg-static border-[1px] border-theme active:border-static hover:border-buttonHover flex items-center gap-1  justify-center ${
      isClicked ? "bg-buttonHover" : ""
    } ${className}`}
    >
      <p className="text-[12px]  lg:!text-[14px] font-bold">{icon}</p>
      {text}
    </div>
  );
};

export default AddToCartButton;
