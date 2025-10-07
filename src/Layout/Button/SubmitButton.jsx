import React, { useState } from "react";

const SubmitButton = ({
  text,
  onClick,
  type ,
  className = "",
  loadingTime,
  disabled, // Add a prop to control the disabled state externally
  onKeyDown,
  icon
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async (e) => {
    if (disabled) return; // Prevent click if disabled
    setIsLoading(true);

    // Simulate the loading time
    const timer = setTimeout(async () => {
      if (onClick && typeof onClick === "function") {
        await onClick(e); // Call the onClick function if provided
      }
      setIsLoading(false); // Reset loading state after loading
    }, loadingTime);

    // Clear the timeout if component unmounts during the delay
    return () => clearTimeout(timer);
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      className={`inline-block text-xs md:text-sm lg:text-base font-medium rounded-md px-3 sm:px-3 md:px-5 py-[6px] md:py-2 lg:py-3 bg-theme text-secondary cursor-pointer border-2 border-theme duration-300 active:bg-theme active:text-secondary ${
        disabled ? "cursor-not-allowed opacity-50" : ""
      } ${className}`}
      disabled={disabled || isLoading} // Disable when loading or based on the external prop
    >
      <div className="flex items-center justify-center space-x-2">
        {isLoading ? (
          <div className="w-3 h-3 border-[3px] border-t-transparent border-[var(--text-secondary)] rounded-full animate-spin"></div>
        )
        :
        <span className={`${isLoading ? "opacity-50" : ""}`}> {icon}</span>
      }

        <span className={`${isLoading ? "opacity-50" : ""}`}>{text}</span>
      </div>
    </button>
  );
};

export default SubmitButton;
