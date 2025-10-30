import React, { useState } from "react";
import MinTitle from "../../Layout/Title/MinTitle";
import MidTitle from "../../Layout/Title/MidTitle";
import mobileBanking from "../../assets/PaymentGateway/mobileBanking.png"
import bkashImg from "../../assets/PaymentGateway/bkashImg.jpg"
import nogodImg from "../../assets/PaymentGateway/nogodImg.png";
import rocket from "../../assets/PaymentGateway/rocket.png";
import stripeImg from "../../assets/PaymentGateway/stripeImg.png";
import visaImg from "../../assets/PaymentGateway/visaImg.png";
import pp from "../../assets/PaymentGateway/PP.png";

const PaymentGateway = ({
  paymentMethods = [],
  selectedPayment,
  setSelectedPayment,
  loading,
}) => {
  const defaultPaymentMethods = [
    {
      id: "bkash",
      name: "Bkash",
      type: "mobile",
      icon: bkashImg,
    },
    {
      id: "nagad",
      name: "Nagad",
      type: "mobile",
      icon: nogodImg,
    },
    {
      id: "rocket",
      name: "Rocket",
      type: "mobile",
      icon: rocket,
    },
    {
      id: "visa",
      name: "Visa",
      type: "mobile",
      icon: visaImg,
    },
    {
      id: "cod",
      name: "Cash on Delivery",
      type: "cod",
      icon: "https://cdn-icons-png.flaticon.com/512/2038/2038854.png",
    },
  ];

  const availablePayments =
    paymentMethods.length > 0 ? paymentMethods : defaultPaymentMethods;

  // Local state for mobile banking sub-selection
  const [selectedMobileMethod, setSelectedMobileMethod] = useState(null);

  const handleMainSelect = (type, id) => {
    if (type === "cod") {
      setSelectedPayment("cod");
      setSelectedMobileMethod(null); // reset
    } else if (type === "mobile") {
      setSelectedPayment("mobile");
    }
  };

  return (
    <div>
      <div className="pt-4 grid grid-cols-1 sm:grid-cols-1 gap-3 px-4">
        {loading
          ? Array.from({ length: 2 }).map((_, index) => (
              <div
                key={index}
                className="bg-skeletonLoading animate-pulse p-1 rounded-lg h-20"
              ></div>
            ))
          : (
            <>
              {/* Cash on Delivery */}
              <div
                onClick={() => handleMainSelect("cod")}
                className={`bg-secondary shadow-sm hover:shadow-theme active:scale-90 duration-300 p-1 rounded-lg cursor-pointer border ${
                  selectedPayment === "cod" ? "border-theme bg-theme bg-opacity-[0.2]" : "border-transparent"
                }`}
              >
                <div className="flex items-center gap-4 py-1 px-4 border rounded-lg  border-borderColor ">
                  <div className="aspect-[4/4] max-h-[20px] ">
                    <img
                      className="w-full h-full object-contain"
                      src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
                      alt="Cash on Delivery"
                    />
                  </div>
                  <MidTitle className="text-center py-2" text="Cash on Delivery" />
                </div>
              </div>

              {/* Mobile Banking (main option) */}
              <div
                onClick={() => handleMainSelect("mobile")}
                className={`bg-secondary shadow-sm hover:shadow-theme active:scale-90 duration-300 p-1 rounded-lg cursor-pointer border ${
                  selectedPayment === "mobile" ? "border-theme bg-theme bg-opacity-[0.2]" : "border-transparent"
                }`}
              >
                <div className="flex items-center gap-4 py-1 px-4 border rounded-lg  border-borderColor ">
                  <div className="aspect-[4/4] max-h-[25px] ">
                    <img
                      className="w-full h-full object-contain"
                      src={mobileBanking}
                      alt="Mobile Banking"
                    />
                  </div>
                  <MidTitle className="text-center py-2" text="Mobile Banking" />
                </div>
              </div>
            </>
          )}
      </div>

      {/* Sub-options for Mobile Banking */}
      {selectedPayment === "mobile" && (
        <div className="mt-5">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 px-4">
            {availablePayments
              .filter((item) => item.type === "mobile")
              .map((item) => (
                <div
                  key={item.id}
                  style={{
                    boxShadow: "0px 0px 8px  rgba(0,0,0,0.20)",
                }}
                  onClick={() => setSelectedMobileMethod(item.id)}
                  className={`bg-secondary shadow-lg hover:shadow-theme active:scale-90 duration-300 p-1 rounded-lg cursor-pointer border-[1px] md:border-[2px] text-center ${
                    selectedMobileMethod === item.id
                      ? "border-theme shadow-theme"
                      : "border-transparent "
                  }`}
                >
                  <img
                    className="w-10 h-10 mx-auto object-contain"
                    src={item.icon}
                    alt={item.name}
                  />
                  <p className="text-sm mt-2 font-medium">{item.name}</p>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentGateway;
