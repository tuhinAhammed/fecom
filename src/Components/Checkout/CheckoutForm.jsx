import React, { useState } from "react";
import ExtraMidTitle from "../../Layout/Title/ExtraMidTitle";
import InputLabel from "../../Layout/Input/InputLabel";
import UserAuthInput from "../../Layout/Input/UserAuthInput";
import MinTitle from "../../Layout/Title/MinTitle";
import MidTitle from "../../Layout/Title/MidTitle";

const CheckoutForm = ({
  billingFormData,
  setBillingFormData,
  inputErrors,
  setInputErrors,
  onDeliveryTypeChange, // ✅ callback to parent
}) => {
  const [selectedDelivery, setSelectedDelivery] = useState(""); // inside/outside dhaka

  const handleChange = (name, value) => {
    setBillingFormData({
      ...billingFormData,
      [name]: value,
    });
    setInputErrors({ ...inputErrors, [name]: "" });
  };

  const handleDeliverySelect = (type) => {
    setSelectedDelivery(type);
    onDeliveryTypeChange(type); // ✅ send to parent
  };

  return (
    <div className="py-[20px] sm:py-sectionSm lg:py-sectionSm bg-secondary">
      <div
        className="rounded-md border-b-[1px] border-theme border-opacity-[0.4] overflow-hidden"
        style={{ boxShadow: "0px 0px 25px rgba(0,0,0,0.20)" }}
      >
        {/* Header */}
        <div className="py-4 bg-theme bg-opacity-[0.18] px-4">
          <ExtraMidTitle className="!font-semibold" text="Billing Information" />
          <MinTitle className="pt-1 text-tertiary" text="Fill in your details below" />
        </div>

        {/* Form */}
        <form className="px-4 py-sectionXl ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">

          {/* Name */}
          <div>
            <InputLabel text="Your Name" required />
            <UserAuthInput
              onChange={(name, value) => handleChange("name", value)}
              type="text"
              value={billingFormData.name}
              placeholder="Your Full Name"
              name="name"
              required
              className="border-borderColor focus:border-theme mt-1 lg:mt-2"
            />
            {inputErrors.name && (
              <p className="text-red-500 text-xs pt-[2px]">{inputErrors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <InputLabel text="Email Address" required={false} />
            <UserAuthInput
              onChange={(name, value) => handleChange("email", value)}
              type="email"
              value={billingFormData.email}
              placeholder="Enter Your Email"
              name="email"
              required
              className="border-borderColor focus:border-theme mt-1 lg:mt-2"
            />
            {inputErrors.email && (
              <p className="text-red-500 text-xs pt-[2px]">{inputErrors.email}</p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <InputLabel text="Phone Number" required />
            <UserAuthInput
              onChange={(name, value) => handleChange("number", value)}
              type="text"
              value={billingFormData.number}
              placeholder="Enter Your Phone Number"
              name="number"
              required
              className="border-borderColor focus:border-theme mt-1 lg:mt-2"
            />
            {inputErrors.number && (
              <p className="text-red-500 text-xs pt-[2px]">{inputErrors.number}</p>
            )}
          </div>

          {/* Address */}
          <div>
            <InputLabel text="Address" required />
            <textarea
              onChange={(e) => handleChange("billingAddress", e.target.value)}
              name="billingAddress"
              placeholder="Enter Your Address"

              className="text-sm md:text-sm lg:text-base w-full mt-1 lg:mt-2 rounded-md border-[1px] border-borderColor h-14 px-4 py-2 focus:!border-theme focus:!outline-none"
              value={billingFormData.billingAddress}
            ></textarea>
            {inputErrors.billingAddress && (
              <p className="text-red-500 text-xs pt-[2px]">
                {inputErrors.billingAddress}
              </p>
            )}
          </div>
          </div>
        {/* Delivery Type */}
        <div className=" py-4 grid grid-cols-1 sm:grid-cols-2 gap-4 w-[60%]">
          {/* Inside Dhaka */}
          <div className={`flex gap-2 px-4 items-center py-3 rounded-md cursor-pointer duration-200 border ${
              selectedDelivery === "inside"
                ? "bg-theme text-white bg-opacity-[0.9] border-theme"
                : "bg-theme bg-opacity-[0.1] border-theme"
            }`}
            onClick={() => handleDeliverySelect("inside")}
          >
            <input
              type="radio"
              name="delivery"
              checked={selectedDelivery === "inside"}
              readOnly
              className={`accent-theme w-5 h-5`}
            />
            <MidTitle
              className={`${
                selectedDelivery === "inside" ? "text-white" : "text-tertiary"
              }`}
              text="Inside Dhaka"
            />
          </div>

          {/* Outside Dhaka */}
          <div className={`flex gap-2 px-4 items-center py-3 rounded-md cursor-pointer duration-200 border ${
              selectedDelivery === "outside"
                ? "bg-theme text-white bg-opacity-[0.9] border-theme"
                : "bg-theme bg-opacity-[0.1] border-theme"
            }`}
            onClick={() => handleDeliverySelect("outside")}
          >
            <input
              type="radio"
              name="delivery"
              checked={selectedDelivery === "outside"}
              readOnly
              className={`accent-theme w-5 h-5`}
            />
            <MidTitle
              className={`${
                selectedDelivery === "outside" ? "text-white" : "text-tertiary"
              }`}
              text="Outside Dhaka"
            />
          </div>
        </div>
        </form>

      </div>
    </div>
  );
};

export default CheckoutForm;
