import React, { useState, useEffect } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { useSelector } from "react-redux";


const CartTotal = () => {
  const { cartItems } = useSelector((state) => state.cart); // Access cartItems from Redux store
  const [cartItemCount, setCartItemCount] = useState(0);
  // Currency Data Fetch From Local Storage
  const commonData =
    useSelector((state) => state?.currency?.selectedCurrency) || {};
  const { currency, conversion_rate_to_tk, currency_symbol } = commonData || {};
  // const demo = useSelector((state) => console.log(state)
  // ) || {};
  // Recalculate the cart item count whenever cartItems changes

  useEffect(() => {
    if (Array.isArray(cartItems)) {
      const selectedItemsCount = cartItems?.length;
      setCartItemCount(selectedItemsCount);
      console.log(cartItems);
    } else {
      setCartItemCount(0); // Fallback when cartItems is not an array
    }
  }, [cartItems]);

  // Calculate the total amount for selected items
  const cartAmount = Array.isArray(cartItems)
    ? cartItems.reduce(
        (sum, item) =>
          sum + (item?.selected ? parseFloat(item?.total_price || 0) : 0),
        0
      )
    : 0;

  const formatAmount = (amount) => {
    if (amount >= 1_000_000_000_000) {
      return `${(amount / 1_000_000_000_000).toFixed(1)}T`; // Trillion format
    } else if (amount >= 1_000_000_000) {
      return `${(amount / 1_000_000_000).toFixed(1)}B`; // Billion format
    } else if (amount >= 1_000_000) {
      return `${(amount / 1_000_000).toFixed(1)}M`; // Million format
    }
    return amount.toFixed(2); // Regular format
  };

  const formattedAmount = formatAmount(cartAmount);

  const pathName = (location.pathname.split("/")[1]);
  return (
    <>

    <div
      className="relative inline-flex items-center gap-2 hidden lg:block "
    >
      {/* Cart Icon with Amount */}
      <div className={`text-base wishList text-tertiary hover:text-theme  rounded-full p-[12px] border-[1px] border-borderColor relative cursor-pointer duration-200 hover:border-theme hover:text-theme rounded-full gap-2 duration-200 cursor-pointer relative ${pathName === "cart" && "border-theme text-theme"}`}>
        <p className="text-base">
          <FaCartShopping />
        </p>

        {/* <MinTitle text={`${currency}${formattedAmount}`} />{" "} */}
        {/* Display the cart amount */}
        {/* Cart Item Count Badge */}
        {cartItemCount > 0 && (
          <div className="absolute -top-2 -right-2 bg-theme text-secondary text-[10px] rounded-full w-5 h-5 flex items-center justify-center">
            {cartItemCount} {/* Display the number of selected items */}
          </div>
        )}
      </div>
    </div>
      :
      <div
      className="relative inline-flex items-center gap-2 hidden lg:block w-[130px]"
    >
      {/* Cart Icon with Amount */}
      <div className="text-base md:text-xs lg:text-sm flex items-center justify-center py-[10px] px-5 border-tertiary border-opacity-[0.6] hover:border-theme border-[1px] text-tertiary hover:text-theme rounded-full gap-2 duration-200 cursor-pointer relative">
        <p className="text-base">
          <FaCartShopping />
        </p>

        <p className="text-[10px] sm:text-xs md:text-sm">
          {currency_symbol}
          {(formattedAmount / (parseFloat(conversion_rate_to_tk) || 1)).toFixed(
            2
          )}
        </p>

        {/* <MinTitle text={`${currency}${formattedAmount}`} />{" "} */}
        {/* Display the cart amount */}
        {/* Cart Item Count Badge */}
        {cartItemCount > 0 && (
          <div className="absolute -top-2 -right-2 bg-theme text-secondary text-[10px] rounded-full w-5 h-5 flex items-center justify-center">
            {cartItemCount} {/* Display the number of selected items */}
          </div>
        )}
      </div>
    </div>
    
    </>
  );
};

export default CartTotal;
