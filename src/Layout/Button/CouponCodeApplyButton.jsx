import React from "react";
import PrimaryButton from "./PrimaryButton";
import { useSelector } from "react-redux";

const CouponCodeApplyButton = ({
  onApply,
  onChange,
  onClick,
  couponCode,
  couponApplyLoading,
  translations,
}) => {

  return (
    <div className="flex items-center overflow-hidden">
      <input
        onChange={onChange}
        value={couponCode} // Bind the input field with couponCode state
        type="text"
        className="text-[10px] md:text-sm lg:text-base leading-0 p-2 py-2 pl-4 w-full !ring-0 focus:!ring-0 text-tertiary placeholder-gray-500 !border-[1px] border-borderColor focus:border-theme border-r-0 rounded-md rounded-r-none"
        placeholder="Enter coupon code"
      />
      <div
        onClick={onClick}
        className="button text-[10px] md:text-sm lg:text-base text-center text-white bg-theme   px-4 rounded-r-md hover:bg-theme-dark active:bg-static active:border-static leading-0 duration-200 cursor-pointer py-3 lg:py-2 !border-[1px] border-theme"
      >
        {couponApplyLoading ? (
          <div className="w-6 h-6 border-[3px] py-2 border-secondary border-t-theme rounded-full animate-spin"></div>
        ) : (
          <p>
            Apply
          </p>
        )}
      </div>
    </div>
  );
};

export default CouponCodeApplyButton;
