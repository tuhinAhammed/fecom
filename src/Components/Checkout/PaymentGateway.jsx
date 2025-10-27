import React from "react";
import MinTitle from "../../Layout/Title/MinTitle";

const PaymentGateway = ({
  paymentMethods,
  selectedPayment,
  setSelectedPayment,
  loading,
}) => {
  
  return (
    <div>
      <div className="pt-4 grid grid-cols-3 gap-3">
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="bg-skeletonLoading animate-pulse p-1 rounded-lg h-20"
              ></div>
            ))
          : paymentMethods?.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  setSelectedPayment(item?.id);
                }}
                className={`bg-secondary shadow-sm hover:shadow-theme active:scale-90 duration-300 p-1 rounded-lg cursor-pointer border-[1px] md:border-[1px]`}
              >
                <div
                  className={`p-1 border rounded-lg border-secondary ${
                    selectedPayment === item.id ? "border-theme" : ""
                  }`}
                >
                  <div className="aspect-[4/4] max-h-[30px] m-auto">
                    <img
                      className="w-full h-full object-fill"
                      src={`${api}/${item?.icon}`}
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
