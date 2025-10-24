import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MinTitle from "../../Layout/Title/MinTitle";
import MidTitle from "../../Layout/Title/MidTitle";
// import MinCartCard from "../Cart/MinCartCard";
import PrimaryButton from "../../Layout/Button/PrimaryButton";
// import QuaternaryButton from "../../Layout/Button/QuaternaryButton";
// import { updateCartSummary } from "../../Redux/Slice/cartSlice";
// import { currency } from "../../CommonData/CommonData";
import { Link } from "react-router-dom";
// import ExtraMinTitle from "../../Layout/Title/ExtraMinTitle";
import { TbShoppingCartX } from "react-icons/tb";
import { BsCartX } from "react-icons/bs";
// import TertiaryButton from "../../Layout/Button/TertiaryButton";
import { FaCartShopping, FaCheckToSlot } from "react-icons/fa6";
import { IoArrowUndo, IoArrowUndoCircleSharp, IoBagCheckOutline, IoClose } from "react-icons/io5";
import { FaMoneyCheckAlt, FaPlus } from "react-icons/fa";
import { currency_symbol, singleProductApi } from "../../Api";
import axios from "axios";
import MinCartCard from "./MinCartCard";

const CartTotal = ({ isVisibleValue, onClose }) => {
  const [cartItems, setCartItems] = useState([])
  console.log(cartItems);
  const dispatch = useDispatch();

  // Access cart items from Redux store

  const cartData = useSelector((state) => (state.cart.cartItems));
  // console.log(cartData);
  useEffect(() => {
    const productFetch = async () => {
      // if (!cartData || cartData.length === 0) return;

      try {
        const responses = await Promise.all(
          cartData.map(item => axios.get(`${singleProductApi}${item.productId}`))
        );

        const mergedProducts = responses.map((res, i) => ({
          ...res.data.product, // full product info
          quantity: cartData[i].quantity,
          variant: cartData[i].variant || null,
        }));

        setCartItems(mergedProducts);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    productFetch();
  }, [cartData]); // Add dependencies

  const totalCartPrice = cartItems.reduce(
    (acc, item) => {
      const price = item.offer_price || 0;
      const quantity = item.quantity || 0;
      return acc + (price * quantity);
    },
    0
  );

  // Disable scrolling when the component is active
  useEffect(() => {
    if (isVisibleValue) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isVisibleValue]);

  const handleQuantityChange = (index, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateCartSummary({ index, quantity: newQuantity }));
    }
  };
  // Translations
  const getTranslatedName = (translations) => {
    // If no translations available, return null (you'll need to handle this case)
    if (!translations || !translations.length) return null;

    // Try to find matching translation
    const match = translations.find(
      (t) => t.lang_code === selectedLanguage?.lang_code
    );

    // If no match found, return the first available translation's name or the original name
    return match?.name || translations[0]?.name || null;
  };

console.log(cartItems);
  return (
    <div>
      {/* Backdrop */}
      {isVisibleValue && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 !z-[999]"
          onClick={onClose} // Close the offcanvas when the backdrop is clicked
        ></div>
      )}

      {/* Offcanvas */}
      {/* <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[70%] md:w-[60%] lg:w-[30%] bg-white shadow-lg transform transition-transform duration-300 z-[99999] ${isVisibleValue ? "translate-x-0" : "translate-x-full"
          }`}
      > */}

      {/* Body */}
      <div
        className={`h-[76vh] md:h-[65vh]   ${cartItems?.length > 2 && "overflow-y-scroll"} `}
      >
        <div className="grid grid-cols-1 items-center  gap-2 sm:gap-3 md:gap-4   ">
          {cartItems?.length > 0 ? (
            cartItems.map((item, index) => {
              // console.log(item.productImage);
              return (
                <MinCartCard
                  key={index}
                  index={index}
                  productId={item.id}
                  productImage={`${item?.photos[0].file_path}/${item?.photos[0].file_name}`}
                  productName={item.product_name}
                  productVarient={item.variant} // ✅ pass selected variant
                  variants={item.variants}
                  productPrice={item.offer_price}
                  quantity={item.quantity}
                  isLastItem={index === cartItems.length - 1}
                  onClose={onClose}
                />
              );
            })
          ) : (
            <div className="pt-44 lg:pt-28">
              <div className="m-auto text-center">
                <p className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl text-tertiary text-opacity-[0.2] text-center">
                  <BsCartX className="text-center m-auto" />
                </p>
                <MinTitle
                  className="py-3 sm:py-4 md:py-6 text-tertiary"
                  text={`Your Cart is Empty !`}
                />
                <div onClick={onClose}>
                  <PrimaryButton
                    className="hover:text-theme !text-base hover:bg-transparent  w-[50%] m-auto !uppercase !text-xs active:text-secondary hover:border-theme active:border-"
                    text="Browse Products"
                    slug="shop"
                    icon={<FaPlus />}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      {cartItems?.length > 0 && (
        <div className="grid grid-cols-1 gap-1 sm:gap-2 md:gap-3 bg-secondary py-2 sm:py-2 md:py-3 px-4 fixed bottom-0 left-0 w-full ">
          <div className="flex items-center gap-4 text-primary">
            <MidTitle className="font-medium" text=
              "Total Price :" />
            <MidTitle
                className="font-medium"
                text={`${currency_symbol} ${(
                  totalCartPrice).toFixed(2)}`}
              />
          </div>
          {/* <Link to="" > */}
          <div onClick={onClose} className="">
            <PrimaryButton
              className=" !bg-transparent hover:!bg-theme !text-theme hover:!text-secondary !border-theme "
              text="View Cart"
              slug="cart"
              icon={<FaCartShopping />}
            />
          </div>
          {/* </Link> */}
          <div onClick={onClose} className="">
            <PrimaryButton
              className="hover:text-theme  hover:bg-transparent !border-theme "
              text="Checkout"
              slug="checkout"
              icon={<IoArrowUndo />}
            />
          </div>
        </div>
      )}
      {/* </div> */}
    </div>
  );
};

export default CartTotal;
