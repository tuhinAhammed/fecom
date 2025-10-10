import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import MidTitle from "../Title/MidTitle";
import { Link, Navigate, useNavigate } from "react-router-dom"
const ViewAllButton = ({  link  , className}) => {
const navigate = useNavigate()
const handleClick = () => {
  if(link){
    navigate(`${link}`)
  }
}


  // Function to get the translated text


  return (
    <div onClick={handleClick}>
      <button
        className={` text-tertiary active:text-tertiary group hover:text-theme text-xl cursor-pointer font-medium  duration-100 flex items-center   block   justify-end relative ${className}`}
      >
        <span className="w-full h-[2px] bg-theme absolute right-[30%] group-hover:right-0 bottom-0 opacity-0 group-hover:opacity-100   duration-300 "></span>
        <p className=" text-xs sm:text-xs md:text-sm  duration-300 font-primary">
          View All
        </p>
        <MdKeyboardArrowRight className="text-xs sm:text-sm md:text-md lg:text-lg group-hover:ml-2  duration-300 " />
      </button>
    </div>
  );
};

export default ViewAllButton;
