import React from "react";
import { useDispatch, useSelector } from "react-redux";
// import {
//   toggleSelectItem,
//   deleteItem,
//   updateCartSummary,
// } from "../../Redux/Slices/cartSlice";
import { FaTrashCan } from "react-icons/fa6";
import MidTitle from "../../Layout/Title/MidTitle";
import MinTitle from "../../Layout/Title/MinTitle";
import { useNavigate } from "react-router-dom";
import ExtraMinTitle from "../../Layout/Title/ExtraMinTitle";
import { api, conversion_rate_to_tk, currency_symbol } from "../../Api";
import { updateCartSummary, deleteItem } from "../../Redux/Slice/cartSlice";

const CheckoutCartCard = ({
    index,
    productId,
    productImage,
    productName,
    productVarient,
    productPrice,
    quantity,
    isLastItem,
    slug,
    variants,
    onClose,
    isSingleProductCheckout
}) => {
    const dispatch = useDispatch();
    const { selectedCurrency } = useSelector((state) => state.currency) || {};

    const navigate = useNavigate();

    const handleSelectItem = () => {
        dispatch(toggleSelectItem({ index }));
    };

    const handleDeleteItem = () => {
        dispatch(deleteItem({ index }));
    };
    const handleProductFetch = async () => {
        const productSlug = productName
            .toLowerCase()
            .replace(/[^\w\s]/g, '') // Remove special characters
            .replace(/\s+/g, '-')    // Replace spaces with hyphens
            .replace(/-+/g, '-')     // Replace multiple hyphens with single hyphen
            .trim();
        if (onClose) {
            onClose();
        }
        navigate(`/product/${productSlug}`, { state: { productId: productId } });
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
            maxLength = 35;
        }

        return productName?.length > maxLength
            ? `${productName.slice(0, maxLength)}...`
            : productName;
    };

    const parsedPrice = Number(productPrice) || 0; // Ensure productPrice is a number

    // Handle Go Product Full Pages
    const handleGoProduct = () => {
        toggleCartVisibility();
        navigate(`/product/${slug}`);
    };
    return (
        <div className="pt-4">
            <div
                className={`bg-secondary grid grid-cols-1 grid-cols-12 gap-[6px] sm:gap-2 md:gap-2 lg:gap-4 items-center pb-2 sm:pb-4 md:pb-5 ${isLastItem ? "border-b-[1px]" : "border-b-[1px]"
                    } border-borderColor`}
            >
                {/* Product Image */}
                <div className="col-span-3">
                    <div className="max-h-[90px] sm:max-h-[100px] md:max-h-[120px] aspect-[4/5] overflow-hidden rounded-sm">
                        <img
                            onClick={handleProductFetch}
                            loading="lazy"
                            className="object-fill w-full h-full cursor-pointer"
                            src={`${api}/${productImage}`}
                            alt={productName || "Product"}
                        />
                    </div>
                </div>

                {/* Product Details */}
                <div className="col-span-9">
                    <div>
                        {/* Product Name */}
                        <h1
                            onClick={handleProductFetch}
                            className="text-xs sm:text-sm md:text-sm lg:text-base font-medium text-primary cursor-pointer hover:text-theme duration-200"
                        >
                            {truncateProductName()}
                        </h1>

                        {/* Price Calculation */}
                        <div className="flex justify-between items-center py-1">
                            <p className="text-sm text-primary text-opacity-[0.9]">

                                Price

                                : ({quantity} X {currency_symbol}
                                {(
                                    parsedPrice / (parseFloat(conversion_rate_to_tk) || 1)
                                ).toFixed(2)}
                                )
                            </p>
                            <p className="text-sm md:text-sm font-medium text-primary text-opacity-[0.9]">
                                {currency_symbol}
                                {(
                                    (parsedPrice * quantity) /
                                    (parseFloat(conversion_rate_to_tk) || 1)
                                ).toFixed(2)}
                            </p>
                        </div>

                        {/* Quantity and Delete */}
                        {
                            isSingleProductCheckout ?
                                <div className="flex items-center gap-2 ">
                                    <MinTitle
                                        className="font-normal text-xs sm:text-sm md:text-base"
                                        text={`Quantity : ${quantity}`}
                                    />
                                </div>
                                :
                                <div className="flex justify-between items-center md:pt-2">
                                    <div className="flex items-center space-x-4 md:space-x-4 lg:space-x-5 bg-theme rounded-sm md:rounded-md p-[2px] px-3 md:px-4">
                                        <button
                                            onClick={() => handleQuantityChange(quantity - 1)}
                                            className="text-secondary text-[10px] sm:text-xs md:text-sm lg:text-base font-bold px-[2px]"
                                        >
                                            -
                                        </button>
                                        <MinTitle className="text-secondary" text={quantity} />
                                        <button
                                            onClick={() => handleQuantityChange(quantity + 1)}
                                            className="text-secondary text-[10px] sm:text-xs md:text-sm lg:text-base px-[2px]"
                                        >
                                            +
                                        </button>
                                    </div>
                                    {/* <div className="delete">
                                <p
                                    onClick={handleDeleteItem}
                                    className="text-red-500 text-xs sm:text-sm md:text-base cursor-pointer mr-2"
                                >
                                    <FaTrashCan />
                                </p>
                            </div> */}
                                </div>
                        }
                        {/* Variant */}
                        {/* Variant Selection */}
                        {variants && variants.length > 0 && (
                            <div className="mt-2 flex gap-6">
                                <div className="flex items-center gap-2 ">
                                    <MinTitle
                                        className="font-normal text-xs sm:text-sm md:text-base"
                                        text={`${productVarient == null ? "Select Size" : "Size"}   `}
                                    />
                                    :
                                </div>
                                {
                                    isSingleProductCheckout ?
                                        <div className="text-xs sm:text-sm md:text-xs px-2 sm:px-2 py-1 sm:py-1 border rounded-md  bg-theme text-white border-theme">{productVarient}</div>
                                        :
                                        <div className="flex flex-wrap gap-2 ">
                                            {variants.map((variant, vIndex) => (
                                                <button
                                                    key={vIndex}
                                                    onClick={() =>
                                                        dispatch(updateCartSummary({ index, variant }))
                                                    }
                                                    className={`text-xs sm:text-sm md:text-xs px-2 sm:px-2 py-1 sm:py-1 border rounded-md transition-colors duration-200
            ${productVarient === variant
                                                            ? "bg-theme text-white border-theme"
                                                            : "bg-white text-primary border-gray-300 hover:border-theme"
                                                        }`}
                                                >
                                                    {variant}
                                                </button>
                                            ))}
                                        </div>
                                }
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutCartCard;
