import React, { useEffect, useState } from "react";
import MinTitle from "../../Layout/Title/MinTitle";
import PrimaryButton from "../../Layout/Button/PrimaryButton";
import { FaExchangeAlt, FaEye, FaHeart, FaRegHeart } from "react-icons/fa";
import { BiGitCompare } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AddToCartButton from "../../Layout/Button/AddToCartButton";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Ensure you import the CSS
import axios from "axios";
// import Ratting from "./Ratting";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FaXmark } from "react-icons/fa6";
// import ProductQuickView from "../Modals/ProductQuickView";
import SelectButton from "../../Layout/Button/SelectButton";
import { LiaCartArrowDownSolid, LiaCartPlusSolid } from "react-icons/lia";
import { addItem } from "../../Redux/Slice/cartSlice";
import { api, conversion_rate_to_tk, currency_symbol, toastr_position } from "../../Api";
import MidTitle from "../Title/MidTitle";
import BuyNowButton from "../Button/BuyNowButton";
import { CgPentagonTopRight } from "react-icons/cg";
import { addWishlistItem } from "../../Redux/Slice/wishlistSlice";
const SecondaryProductCard = ({
  thumbnail,
  name,
  finalPrice,
  regularPrice,
  slug,
  loading,
  onQuickView,
  isVariant,
  quantity,
  productId,
  category,
  variants,
  sku,
  stock
}) => {
  const productImage = `${api}/${thumbnail}`;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginToken = useSelector((state) => state.userData?.data?.token);
  const cartItems = useSelector((state) => state.cart.cartItems); // Access cartItems from Redux store
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isInWishlist = wishlistItems.some(item => item.productId === productId);
  // const compareItems = useSelector((state) => state.compare.compareItems);
  // Fetch Currency From Local Storage
  const currencyData = useSelector(
    (state) => state.currency?.selectedCurrency || []
  );

  // Add to Cart
  const handleAddToCart = () => {
    const newItem = {
      productId: productId,
      quantity: 1,                             // Default quantity
      variant:  null,
    };

    // Check if the product already exists in the cart
    const existingItemIndex = cartItems.findIndex(
      (item) => item.productId === newItem.productId // Compare based on productId
    );

    if (existingItemIndex !== -1) {
      // If product exists, increase quantity
      const existingItem = cartItems[existingItemIndex];
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };

      dispatch(addItem(updatedItem));
    } else {
      // If product doesn't exist, add the new product to the cart
      dispatch(addItem(newItem));
    }

    toast.success("Successfully added!", {
      position: `${toastr_position}`,
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  // Add to compare
  const handleAddToCompare = async (slug) => {
    try {
      // Check if the product already exists in the compare list
      const existingCompareItem = compareItems.find(
        (item) => item.slug === slug
      );

      if (existingCompareItem) {
        toast.info("Product already added to compare!", {
          position: `${toastr_position}`,
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        return; // Stop execution if the product is already added
      }

      // Create the product object
      const newItem = {
        productName: name,
        slug: slug,
        sku: sku,
      };

      // Dispatch the action to add the product to the compare list
      dispatch(addCompareItem(newItem));
      navigate("/compare");

      toast.success("Successfully added!", {
        position: `${toastr_position}`,
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } catch (error) {
      console.error("Error adding product to compare:", error);
    }
  };
  //   for text limit name
  // State to track the window width
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    // Initialize with the window width on first render
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Function to determine the character limit based on screen size
  const getCharacterLimit = () => {
    if (windowWidth < 240) return 5; // Small devices (Mobile)
    if (windowWidth < 340) return 10; // Small devices (Mobile)
    if (windowWidth < 420) return 20; // Small devices (Mobile)
    if (windowWidth < 620) return 30; // Small devices (Mobile)
    if (windowWidth < 768) return 60; // Medium devices (Tablet)
    if (windowWidth < 1024) return 70; // Large tablets / Small desktop
    return 90; // Large devices (Desktop)
  };

  // Add  To Wishlist

  const handleAddToWishlist = () => {
    const alreadyExists = wishlistItems.some(
      (item) =>
        item.productId === productId 
    );
  
    if (alreadyExists) {
      toast.warning("Already exists in wishlist", {position: `${toastr_position}`, autoClose: 1500 });
      return;
    }
  
    dispatch(
      addWishlistItem({
        productId: productId,
        variant: null,
      })
    );
  
    toast.success("Added to wishlist ❤️", {position: `${toastr_position}`, autoClose: 1500 });
  };
  const handleProductFetch = async () => {
    const productSlug = name
      .toLowerCase()
      .replace(/[^\w\s]/g, '') // Remove special characters
      .replace(/\s+/g, '-')    // Replace spaces with hyphens
      .replace(/-+/g, '-')     // Replace multiple hyphens with single hyphen
      .trim();
    navigate(`/product/${productSlug}`, { state: { productId: productId } });
  };

  // Handle Modals
  const handleViewModal = async (slug) => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden"; // Disable scrolling
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto"; // Enable scrolling
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  // Reset overflow when component unmounts
  useEffect(() => {
    return () => {
      document.body.style.overflow = "auto"; // Ensure scrolling is enabled when component unmounts
    };
  }, []);

  // Translation
  // Fetch the selected language from Redux


  // Find the translation based on the selected language


  const displayName = name;

  return (
    <div className="relative  border-[1px] border-primary border-opacity-[0.2] outer/ rounded-md overflow-hidden bg-secondary duration-300 group/outer  hover:border-theme z-[4]">
      <div className="grid grid-cols-12 gap-4 items-center ">

        {/* Wishlist and Compare Icons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-1 group-hover/outer:opacity-100 transition-opacity duration-300 z-10">
          {/* Wishlist Button */}
                {/* Wishlist Button */}
                <div className="relative w-full">
                  <div
                    onClick={handleAddToWishlist}
                    className={`flex items-center justify-center p-[6px]  bg-opacity-[0.8] bg-secondary text-primary shadow-md rounded-full cursor-pointer ${isInWishlist ? "hover:bg-secondary" : "hover:bg-theme"}  hover:text-secondary active:bg-secondary active:text-theme duration-200 group/inner`}
                  >
                    {
                      isInWishlist ? 
                    <FaHeart className="text-base text-red-500" />
                    :
                    <FaRegHeart className="text-base" />
                  }
                    {/* Tooltip on icon hover */}

                  </div>
                </div>
          {/* <div className="relative ">
            <div
              onClick={() => handleAddToCompare(slug)}
              className="flex items-center justify-center p-[6px] bg-secondary bg-opacity-[0.8] text-primary shadow-md rounded-md cursor-pointer hover:bg-theme hover:text-secondary active:bg-secondary active:text-theme duration-200 group/inner"
            >
              <BiGitCompare className="text-base" />

                    <span>
                      {(() => {
                        var fullText = "Compare";
                        var maxLength = 12;
                        return fullText.length > maxLength
                          ? fullText.slice(0, maxLength - 1) + "…"
                          : fullText;
                      })()}
                    </span>
            </div>
          </div> */}
          {/* <div className="relative w-full">
            <div
              onClick={handleViewModal}
              className="flex items-center justify-center p-[6px] bg-secondary bg-opacity-[0.8] text-primary shadow-md rounded-md cursor-pointer hover:bg-theme hover:text-secondary active:bg-secondary active:text-theme duration-200 group/inner w-full"
            >
              <FaEye className="text-base" />
              <span>
                      {(() => {
                        const fullText = "Quick View";
                        const maxLength = 12;
                        return fullText.length > maxLength
                          ? fullText.slice(0, maxLength - 1) + "…"
                          : fullText;
                      })()}
                    </span>
            </div>
          </div> */}
        </div>

        {/* Image container with dynamic aspect ratio */}

        <div className="col-span-4 md:col-span-3  rounded-md cursor-pointer">
          <div
            onClick={handleProductFetch}
            className="max-h-[250px] md:max-h-[180px] lg:max-h-[250px] aspect-[4/5] md:aspect-[4/5]  overflow-hidden"
          >
            <img
              src={productImage}
              alt={name}
              className="w-full h-full object-fill group-hover/outer:scale-125 group-hover/outer:translate-x-0 group-hover/outer:translate-y-0 transition-transform duration-500 ease-in-out transform origin-center"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="col-span-6 md:col-span-7 py-6 pr-3">
          <div className="">
            <div
              onClick={handleProductFetch}
              className="BiGitCompare cursor-pointer max-w-[80%] pt-1 lg:h-[50px]"
            >
              <MidTitle
                className="hover:text-theme  font-medium text-primary h-[30px] sm:h-[45px] md:[40px] lg:h-[40px]"
                text={
                  displayName?.length > 60
                    ? `${displayName.substring(0, 60)}...`
                    : displayName
                }
              />
            </div>
            <div className="price flex gap-4 py-1 md:py-340g:p25-4 items-end">
              <p className="text-[12px] md:text-lg font-bold text-primary">
                {currency_symbol}
                {(finalPrice / (parseFloat(conversion_rate_to_tk) || 1)).toFixed(
                  2
                )}
              </p>
              {finalPrice !== regularPrice && (
                <span className="text-[10px] md:text-base font-semibold text-gray-400 line-through">
                  {currency_symbol}
                  {(
                    regularPrice / (parseFloat(conversion_rate_to_tk) || 1)
                  ).toFixed(2)}
                </span>
              )}
              {/* Discount Badge */}
              {regularPrice < finalPrice && (
                <MinTitle
                  className=" font-normal text-green-500 px-3  py-1  rounded-full bg-green-500 bg-opacity-[0.2] font-semibold inline-block"
                  text={`${Math.round(((regularPrice - finalPrice) / regularPrice) * 100)}% OFF`}
                />
              )}
            </div>

            {/* Product Category */}
            <MinTitle className="text-tertiary pb-6 " text={category} />
            {/* <div className="m-auto pb-[6px] sm:pb-[10px] md:pb-[12px] lg:pb-[15px]">
            <Ratting ratting={ratting} />
          </div> */}
            {stock === "yes" ? (
              <div className="" >

                <div className="grid grid-cols-2 lg:grid-cols-2 gap-4 ">
                  <AddToCartButton
                    onClick={handleAddToCart}
                    className="w-full m-auto"
                    // link={"/"}
                    text={(() => {
                      const fullText = "Add to Cart"

                      const maxLength = 12;
                      return fullText.length > maxLength
                        ? fullText.slice(0, maxLength - 1) + "…"
                        : fullText;
                    })()}
                    icon={
                      <LiaCartPlusSolid className="font-bold text-lg" />
                    }
                  // slug={slug}
                  />
                  <BuyNowButton
                    onClick={handleProductFetch}
                    className="w-full m-auto"
                    // link={"/"}
                    text={(() => {
                      const fullText = "Buy Now"

                      const maxLength = 12;
                      return fullText.length > maxLength
                        ? fullText.slice(0, maxLength - 1) + "…"
                        : fullText;
                    })()}
                    icon={
                      <CgPentagonTopRight className="font-bold text-lg" />
                    }
                  // slug={slug}
                  />

                </div>
              </div>
            ) : (
              <div className="">
                <SelectButton
                  className="w-[80%] sm:w-[80%] md:w-[65%] lg:w-[70%] xl:w-[70%] m-auto  !cursor-default !bg-red-500 !border-red-500 hover:!bg-red-500"
                  // link={"/"}
                  text={(() => {
                    const fullText = "Out Of Stock"

                    const maxLength = 13;
                    return fullText.length > maxLength
                      ? fullText.slice(0, maxLength - 1) + "…"
                      : fullText;
                  })()}

                // slug={slug}
                />
              </div>
            )}
          </div>

        </div>
      </div>
      {createPortal(
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50  "
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleBackdropClick} // Detect backdrop click
            >
              {/* {loading ? (
                <div className="w-12 h-12 bg-skeletonLoading"></div>
              ) : ( */}

              {/* )} */}
              <motion.div
                className="bg-white !rounded-lg shadow-lg  !relative w-[95%] rounded-lg h-[80%] overflow-y-auto md:overflow-visible md:h-[95%] "
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <button
                  onClick={handleCloseModal}
                  className="fixed top-[75px] sm:top-[75px] right-[15px] sm:right-[30px] md:absolute md:right-[6px] md:top-[6px] text-red-500 text:lg md:text-xl lg:text-2xl rounded z-[20] "
                >
                  <FaXmark />
                </button>
                {/* <ProductQuickView slug={slug} /> */}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
};

export default SecondaryProductCard;
