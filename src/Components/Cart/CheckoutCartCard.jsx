import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaTrashCan } from "react-icons/fa6";
import MidTitle from "../../Layout/Title/MidTitle";
import MinTitle from "../../Layout/Title/MinTitle";
import { useNavigate } from "react-router-dom";
import ExtraMidTitle from "../../Layout/Title/ExtraMidTitle";
import ExtraMinTitle from "../../Layout/Title/ExtraMinTitle";

const CheckoutCartCard = ({
  index,
  productImage,
  productName,
  productVarient,
  productSize,
  productPrice,
  totalPrice,
  quantity,
  selected,
  isLastItem,
  slug,
}) => {
  const dispatch = useDispatch();
  const { selectedCurrency } = useSelector((state) => state.currency) || {};
  const { currency_symbol, conversion_rate_to_tk } = selectedCurrency || {};
  const navigate = useNavigate();
  const handleSelectItem = () => {
    dispatch(toggleSelectItem({ index }));
  };

  const handleDeleteItem = () => {
    dispatch(deleteItem({ index }));
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateCartSummary({ index, quantity: newQuantity }));
    }
  };

  const truncateProductName = () => {
    const screenWidth = window.innerWidth;
    let maxLength;

    if (screenWidth < 480) {
      // sm
      maxLength = 30;
    } else if (screenWidth < 620) {
      // md
      maxLength = 35;
    } else if (screenWidth < 768) {
      // md
      maxLength = 30;
    } else if (screenWidth < 1024) {
      // lg
      maxLength = 40;
    } else {
      // xl and above
      maxLength = 25;
    }

    return productName?.length > maxLength
      ? `${productName.slice(0, maxLength)}...`
      : productName;
  };

  const parsedPrice = Number(productPrice) || 0; // Ensure productPrice is a number

  // Handle Go Product Full Pages
  const handleGoProduct = () => {
    navigate(`/product/${slug}`);
  };
  return (
    <div className="">
      <div
        className={`bg-secondary grid grid-cols-1 grid-cols-12 gap-[6px] sm:gap-2 md:gap-2 lg:gap-4 items-center p-2 sm:p-4 md:p-4 border-b-[1px]  `}
      >
        {/* Product Image */}
        <div className="col-span-3">
          <div className="aspect-[5/7] max-h-[80px] sm:max-h-[120px] md:max-h-[150px] overflow-hidden rounded-sm">
            <img
              onClick={() => {
                handleGoProduct();
                toggleCartVisibility;
              }}
              loading="lazy"
              className="w-full h-full object-cover cursor-pointer"
              src={productImage}
              alt={productName || "Product"}
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="col-span-9">
          <div>
            {/* Product Name */}
            <h1
              onClick={() => {
                handleGoProduct();
                toggleCartVisibility;
              }}
              className="text-xs sm:text-sm md:text-sm lg:text-sm font-medium text-primary cursor-pointer hover:text-theme duration-200 text-tertiary 
  line-clamp-2 sm:line-clamp-2 md:line-clamp-2 lg:line-clamp-2"
            >
              {productName}
            </h1>
            {/* Product Variant */}
            {productVarient !== null && (
              <ExtraMinTitle
                className="text-xs text-primary text-opacity-[0.9] pt-1 text-tertiary"
                text={`${productVarient}`}
              />
            )}
            {/* Price Calculation */}
            <div className="flex justify-between items-center py-1 mt-2">
              <div className="flex items-center space-x-3 md:space-x-3 lg:space-x-3 bg-theme rounded-sm md:rounded-md p-[2px] px-3 md:px-3">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  className="text-secondary text-[10px] sm:text-xs md:text-sm lg:text-sm font-bold px-[2px]"
                >
                  -
                </button>
                <ExtraMinTitle className="text-secondary" text={quantity} />
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="text-secondary text-[10px] sm:text-xs md:text-sm lg:text-sm px-[2px]"
                >
                  +
                </button>
              </div>
              <p className="text-xs md:text-sm font-medium text-primary text-opacity-[0.9]">
                {currency_symbol}
                {(
                  (parsedPrice * quantity) /
                  (parseFloat(conversion_rate_to_tk) || 1)
                ).toFixed(2)}
              </p>
            </div>

            {/* Quantity and Delete */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutCartCard;
