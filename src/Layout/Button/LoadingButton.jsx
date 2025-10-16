import React, { useState } from "react";

const LoadingButton = ({
  text,
  onClick,
  type = "button",
  className = "",
  loadingTime,
  icon,
  
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async (e) => {
    setIsLoading(true);

    // Simulate 3-second loading time
    const timer = setTimeout(async () => {
      if (onClick && typeof onClick === "function") {
        await onClick(e); // Only call onClick if it's a valid function
      }
      setIsLoading(false); // Reset loading state after 3 seconds
    }, loadingTime);

    // Optional: Clear timeout if component unmounts before 3 seconds
    return () => clearTimeout(timer);
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      className={`inline-block text-xs md:text-sm lg:text-sm font-medium  lg:rounded-md px-3 sm:px-3 md:px-5 py-[6px] md:py-[10px]  bg-theme rounded-md text-secondary  cursor-pointer font-medium border-[1px] border-theme  duration-300 active:bg-theme active:text-secondary ${className}`}
      disabled={isLoading}
    >
      <div className="flex items-center justify-center space-x-2">
        {isLoading ? (
          <div className="w-3 h-3 border-[3px] border-t-transparent border-[var(--text-secondary)] rounded-full animate-spin"></div>
        ):
        <span className={``}>{icon}</span>
        
        }
        <span className={`${isLoading ? "opacity-50" : ""}`}>{text}</span>
      </div>
    </button>
  );
};

export default LoadingButton;
