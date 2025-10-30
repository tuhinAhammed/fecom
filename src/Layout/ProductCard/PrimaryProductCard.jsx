import React, { useEffect } from "react";
import MinTitle from "../Title/MinTitle";
import PrimaryButton from "../Button/PrimaryButton";
import { FaExchangeAlt, FaEye, FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import { BiCartDownload, BiGitCompare } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
// import Ratting from "./Ratting";
// import { addToWishlistApi, api, version } from "../../Api/Api";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../Redux/Slice/cartSlice";
import AddToCartButton from "../Button/AddToCartButton";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Ensure you import the CSS
import { useState } from "react";
// import ProductQuickView from "../Modals/ProductQuickView";
import axios from "axios";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FaXmark } from "react-icons/fa6";
import BuyNowButton from "../Button/BuyNowButton";
import { MdAddShoppingCart, MdShoppingCartCheckout } from "react-icons/md";
import SelectButton from "../Button/SelectButton";
import { LiaCartArrowDownSolid, LiaCartPlusSolid } from "react-icons/lia";
import { toastr_position } from "../../Api";
import MidTitle from "../Title/MidTitle";
import { CgPentagonTopRight } from "react-icons/cg";
import { addWishlistItem } from "../../Redux/Slice/wishlistSlice";
import { IoMdHeart } from "react-icons/io";
// import { addCompareItem } from "../../Redux/Slices/compareSlice";
const DOMAIN_NAME = import.meta.env.VITE_API_DOMAIN_NAME;

const PrimaryProductCard = ({
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
  // For Quick View Modals

  // Fetch Currency From Local Storage
  const currencyData = useSelector(
    (state) => state.currency?.selectedCurrency || []
  );
  const { currency, } = currencyData;
  const currency_symbol = "৳"
  const conversion_rate_to_tk = "0"
  const productImage = `${DOMAIN_NAME}/${thumbnail}`;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems); // Access cartItems from Redux store
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems); // Access cartItems from Redux store
  // const compareItems = useSelector((state) => state.compare.compareItems);

  const loginToken = useSelector((state) => state.userData?.data?.token);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isInWishlist = wishlistItems.some(item => item.productId === productId);
  // Product Details Page
  const handleProductFetch = async () => {
    const productSlug = name
      .toLowerCase()
      .replace(/[^\w\s]/g, '') // Remove special characters
      .replace(/\s+/g, '-')    // Replace spaces with hyphens
      .replace(/-+/g, '-')     // Replace multiple hyphens with single hyphen
      .trim();
    navigate(`/product/${productSlug}`, { state: { productId: productId } });
  };
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
// Buy Now

  // Add To WishList
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

  // Add to compare
  const handleAddToCompare = async (slug) => {
    try {
      // Check if the product already exists in the compare list
      // const existingCompareItem = compareItems.find(
      //   (item) => item.slug === slug
      // );

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

  // Modals Functionality
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
  const displayName = name;

  return (
    <div className="group pb-4"  >
      <div className="">
        {loading ? (
          <div className="border-[1px] border-skeletonLoading  ">
            <div className="images">
              <div className="aspect-[4/4.5] bg-skeletonLoading animate-pulse rounded-lg rounded-b-none"></div>
            </div>
            <div className="productName mt-4 px-4">
              <div className="w-full h-3  bg-skeletonLoading animate-pulse rounded-lg"></div>
              <div className="w-full h-3 mt-2  bg-skeletonLoading animate-pulse rounded-lg"></div>
            </div>

            <div className="price flex gap-2 py-1 md:py-1 lg:py-2 items-end justify-center mt-2">
              <p className="w-12 h-4 bg-skeletonLoading animate-pulse rounded-lg"></p>
              <span className="w-12 h-3 bg-skeletonLoading animate-pulse rounded-lg"></span>
            </div>
            <div className="ratting flex gap-1 mt-2 justify-center">
              {[...Array(5)].map((_, index) => (
                <FaStar
                  key={index}
                  className="text-[10px] sm:text-[10px] md:text-xs lg:text-sm text-skeletonLoading  animate-pulse"
                />
              ))}
            </div>
            <div className="button my-3 w-[60%] m-auto h-8 rounded-lg bg-skeletonLoading  animate-pulse"></div>
          </div>
        ) : (
          <div className="relative border-[1px] border-tertiary border-opacity-[0.1]  overflow-hidden bg-secondary duration-300 group/outer  hover:border-tertiary hover:border-opacity-[0.3] hover:shadow-xl/20 h-auto z-[4]  " style={{ boxShadow: "0px 8px 10px 0px rgba(0 0 0 / 10%)" }}>

            <div className="">
              {/* Discount Badge */}
              {regularPrice < finalPrice && (
                <div className="absolute  top-1 sm:top-2 md:top-3 lg:top-3 left-1 sm:left-2 md:left-3 lg:left-3 bg-theme text-secondary text-[8px] md:text-[10px] lg:text-xs md:font-medium px-[6px] md:px-2 py-[2px] md:py-1 rounded-sm md:rounded-md z-10">
                  <p className="text-xs font-normal">
                    {Math.round(((regularPrice - finalPrice) / regularPrice) * 100)}% OFF
                  </p>
                </div>
              )}

              {/* Wishlist and Compare Icons */}
              <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-100 group-hover/outer:opacity-100 transition-opacity duration-300 z-10 ">
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

              <div
                className={`relative w-full bg-gray-100 overflow-hidden cursor-pointer 
  after:absolute after:inset-0 after:bg-primary after:opacity-0 
  after:transition-opacity after:duration-300 group-hover/outer:after:opacity-20 
  after:pointer-events-none`}  // 👈 this fixes it
              >
                {loading ? (
                  <div className="h-[250px] w-full animate-pulse bg-skeletonLoading"></div>
                ) : (
                  <div className="block">
                    <img
                      onClick={handleProductFetch}
                      loading="lazy"
                      src={productImage}
                      alt={name}
                      className="w-full object-fit vertical-middle group-hover/outer:scale-125 group-hover/outer:translate-x-0 group-hover/outer:translate-y-0 transition-transform duration-500 ease-in-out transform origin-center aspect-[4/5] "
                    />
                  </div>
                )}
                <div className="absolute bottom-0 w-full z-[10]" >
                  {stock === "yes" ? (
                    <div className="" >
                        <div className="grid-cols-1 gap-1 grid transform transition-all duration-300 ease-out translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 ">
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

              {/* Product Info */}
              <div className="w-full p-1 sm:p-1 md:p-2 lg:p-3 xl:p-3 flex flex-col flex-grow">
                {/* Product Category */}
                <MinTitle className="text-tertiary pb-2" text={category} />

                <div onClick={handleProductFetch} className="cursor-pointer">
                  <MidTitle
                    className="hover:text-theme  font-medium text-primary h-[30px] sm:h-[45px] md:[40px] lg:h-[40px]"
                    text={
                      displayName?.length > 60
                        ? `${displayName.substring(0, 60)}...`
                        : displayName
                    }
                  />
                </div>
                <div className="flex justify-between pt-[6px] md:pt-2 lg:pt-2 items-center">

                  <div className="price flex gap-2  items-end ">
                    <p className="text-[12px] md:text-[16px] font-semibold font-normal text-primary">
                      {currency_symbol}
                      {(
                        finalPrice / (parseFloat(conversion_rate_to_tk) || 1)
                      ).toFixed(2)}
                    </p>
                    {finalPrice !== regularPrice && (
                      <span className="text-[10px] md:text-[12px] font-semibold font-normal text-gray-400 line-through">
                        {currency_symbol}
                        {(
                          regularPrice / (parseFloat(conversion_rate_to_tk) || 1)
                        ).toFixed(2)}
                      </span>
                    )}
                  </div>
                  <div className="">
                    {
                      stock === "yes" ?
                        <MinTitle text="In Stock" className="text-green-500" />
                        :
                        <MinTitle text="Out Of Stock" className="text-red-500" />
                    }
                  </div>
                </div>
                {/* <div className="m-auto pb-[6px] sm:pb-[10px] md:pb-[12px] lg:pb-[14px]">
                  <Ratting ratting={ratting} />
                </div> */}

              </div>
            </div>
          </div>
        )}
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
                <ProductQuickView slug={slug} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
};

export default PrimaryProductCard;
