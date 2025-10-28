import React from "react";
import MinTitle from "../../Layout/Title/MinTitle";

const PaymentGateway = ({
  paymentMethods = [],
  selectedPayment,
  setSelectedPayment,
  loading,
}) => {
  // ✅ Default fallback data if parent sends nothing
  const defaultPaymentMethods = [
    {
      id: 1,
      name: "Bkash",
      icon: "https://upload.wikimedia.org/wikipedia/commons/9/9d/BKash_logo.svg",
    },
    {
      id: 2,
      name: "Nagad",
      icon: "https://upload.wikimedia.org/wikipedia/en/8/8e/Nagad_Logo.svg",
    },
    {
      id: 3,
      name: "Rocket",
      icon: "https://play-lh.googleusercontent.com/ea9mD0aNshw1EFS5_VzS1x2ONpUZ5uMY5WZ02KciW5sC8nbVySjr8DK0b4vSmGMBQHo",
    },
    {
      id: 4,
      name: "Visa",
      icon: "https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg",
    },
    {
      id: 5,
      name: "MasterCard",
      icon: "https://upload.wikimedia.org/wikipedia/commons/0/0c/Mastercard_logo.png",
    },
    {
      id: 6,
      name: "Cash on Delivery",
      icon: "https://cdn-icons-png.flaticon.com/512/2038/2038854.png",
    },
  ];

  // ✅ Use props if provided, else fallback
  const availablePayments =
    paymentMethods.length > 0 ? paymentMethods : defaultPaymentMethods;

  return (
    <div>
      <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="bg-skeletonLoading animate-pulse p-1 rounded-lg h-20"
              ></div>
            ))
          : availablePayments.map((item, index) => (
              <div
                key={index}
                onClick={() => setSelectedPayment && setSelectedPayment(item?.id)}
                className={`bg-secondary shadow-sm hover:shadow-theme active:scale-90 duration-300 p-1 rounded-lg cursor-pointer border ${
                  selectedPayment === item.id ? "border-theme" : "border-transparent"
                }`}
              >
                <div className="p-1 border rounded-lg border-secondary">
                  <div className="aspect-[4/4] max-h-[30px] m-auto">
                    <img
                      className="w-full h-full object-contain"
                      src={item?.icon}
                      alt={item?.name}
                    />
                  </div>
                  <MinTitle className="text-center py-2" text={item?.name} />
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default PaymentGateway;
