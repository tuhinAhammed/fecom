import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCartShopping, FaTrashCan, FaXmark } from "react-icons/fa6";
import { Bounce, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../Redux/Slice/cartSlice";
import Container from "../Layout/Container";
import MinTitle from "../Layout/Title/MinTitle";
import { useNavigate, useParams } from "react-router-dom";
import LoadingButton from "../Layout/Button/LoadingButton";
import MidTitle from "../Layout/Title/MidTitle";
import ExtraMinTitle from "../Layout/Title/ExtraMinTitle";
import emptyWishlist from "../assets/Wishlist/emptyWishlist.svg";
import PrimaryButton from "../Layout/Button/PrimaryButton";
import Breadcrumb from "../Layout/Breadcrumb/Breadcrumb";
import SelectButton from "../Layout/Button/SelectButton";
import { LiaCartArrowDownSolid, LiaCartPlusSolid } from "react-icons/lia";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import AddToCartButton from "../Layout/Button/AddToCartButton";
import { api, conversion_rate_to_tk, currency_symbol, singleProductApi, toastr_position } from "../Api";
import BuyNowButton from "../Layout/Button/BuyNowButton";
import { deleteWishlistItem } from "../Redux/Slice/wishlistSlice";
import { CgPentagonTopRight } from "react-icons/cg";
const WishlistPage = () => {
    const [wishlistData, setWishlistData] = useState([]);
    const [visibleItems, setVisibleItems] = useState(6);
    const [isLoading, setIsLoading] = useState(true);
    const wishlistItems = useSelector((state) => state.wishlist?.wishlistItems)
    const loginToken = useSelector((state) => state.userData?.data?.token);
    const cartItems = useSelector((state) => state.cart.cartItems);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSlug, setSelectedSlug] = useState(null);

    const handleViewModal = (slug) => {
        setSelectedSlug(slug);
        setIsModalOpen(true);
        document.body.style.overflow = "hidden"; // Disable scrolling
    };



    useEffect(() => {
        const fetchWishlistProducts = async () => {
            if (!wishlistItems || wishlistItems.length === 0) {
              setWishlistData([]);
              setIsLoading(false);
              return;
            }
            
            try {
              const productRequests = wishlistItems.map((item) =>
                axios.get(`${singleProductApi}${item.productId}`) // Fixed: single slash
              );
              const responses = await Promise.all(productRequests);
              const allProducts = responses
                .map((res) => res.data?.product)
                .filter(Boolean);
              setWishlistData(allProducts);
            } catch (error) {
              console.error("Error fetching wishlist products:", error);
              // Add retry logic or show error message
            } finally {
              setIsLoading(false);
            }
          };

        fetchWishlistProducts();
    }, [wishlistItems]);


    // Use the translated name if available, otherwise fall back to the default name

    const handleAddToCart = (item) => {
        console.log(item);
        const newItem = {
          productId: item.id,
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

    const handleProductDetails = async (slug) => {
        const response = await axios.get(`${api}/${version}/product?slug=${slug}`);
        navigate(`/product/${slug}`, {
            state: { productData: response?.data },
        });
    };
    const handleLoadMore = () => {
        setVisibleItems((prev) => prev + 6);
    };

    const handleDelete = (index) => {
        dispatch(deleteWishlistItem({ index }));
        toast.success("Removed from wishlist 💔", { autoClose: 1500, position: `${toastr_position}` });
    };

    // Modals

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
    // Responsive Table
    const [expandedRow, setExpandedRow] = useState(null);
    const toggleRow = (index) => {
        setExpandedRow(expandedRow === index ? null : index);
    };

    return (
        <>
            <div className="py-sectionSm md:py-sectionMd lg:py-sectionLg xl:py-sectionXl bg-secondary">
                <Container>
                    <Breadcrumb title="Wishlist" />
                    <div className="pt-sectionSm">
                        {isLoading ? (
                            <table className="w-full table-auto" border="1">
                                <thead>
                                    <tr className="text-left font-normal">
                                        <th className="text-sm py-2 ">
                                            Image
                                        </th>
                                        <th className="text-sm">
                                            Product Name
                                        </th>
                                        <th className="text-sm hidden lg:table-cell">
                                            {" "}
                                            Price
                                        </th>
                                        <th className="text-sm hidden lg:table-cell">
                                            Availability
                                        </th>
                                        <th className=" text-sm text-right hidden lg:table-cell">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[...Array(visibleItems)].map((_, index) => (
                                        <tr
                                            key={index}
                                            className="border-y-[1px] border-borderColor mt-4"
                                        >
                                            <td className=" py-3 mt-4">
                                                <div
                                                    className="h-[90px] w-[70%] sm:w-[60%] md:w-[35%] lg:w-[60%] bg-skeletonLoading animate-pulse "
                                                    width="100"
                                                ></div>
                                            </td>
                                            <td className="">
                                                <div className="h-2 bg-skeletonLoading rounded animate-pulse w-[80%]"></div>
                                                <div className="h-2 mt-2 bg-skeletonLoading rounded animate-pulse w-[40%]"></div>
                                            </td>
                                            <td className="">
                                                <div className="h-4 bg-skeletonLoading rounded animate-pulse w-[80%]"></div>
                                            </td>
                                            <td className="">
                                                <div className="h-4 bg-skeletonLoading rounded animate-pulse w-[80%]"></div>
                                            </td>
                                            <td className="">
                                                <div className="h-4 bg-skeletonLoading rounded animate-pulse w-[80%]"></div>
                                            </td>
                                            <td className="">
                                                <div className="h-4 bg-skeletonLoading rounded animate-pulse w-1/2"></div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : wishlistData.length > 0 ? (
                            <>
                                <table className="w-full table-auto ">
                                    <thead>
                                        <tr className="text-left ">
                                            <th className=" text-sm py-2 ">
                                                Image
                                            </th>
                                            <th className=" text-sm ">
                                                Product Name
                                            </th>
                                            <th className=" text-sm hidden lg:table-cell">
                                                Price
                                            </th>
                                            <th className=" text-sm pl-6 hidden lg:table-cell">
                                                Availability
                                            </th>
                                            <th className=" text-sm text-right hidden lg:table-cell">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {wishlistData.slice(0, visibleItems).map((item, index) => {
                                            const content = item.
                                                product_name
                                            const image = `${api}/${item.photos[0].file_path}/${item.photos[0].file_name}`;
                                            return (
                                                <>
                                                    <tr key={index} className="border-y border-borderColor">
                                                        <td className="py-3">
                                                            <div className="flex items-center gap-2">
                                                                <button
                                                                    onClick={() => toggleRow(index)}
                                                                    className="text-secondary cursor-pointer w-[18px] h-[18px] text-xs bg-theme text-center duration-200 transition-all rounded-[3px] font-medium block lg:hidden"
                                                                >
                                                                    {expandedRow === index ? "-" : "+"}
                                                                </button>
                                                                <div
                                                                    onClick={() => handleProductDetails(item?.slug)}
                                                                    className="aspect-[5/6] max-h-[90px] overflow-hidden rounded-sm cursor-pointer"
                                                                >
                                                                    <img
                                                                        className="w-full h-full object-cover border border-gray-200"
                                                                        src={image}
                                                                        alt={item?.product_name}
                                                                        width="100"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="py-2 px-2">
                                                            <div onClick={() => handleProductDetails(item?.slug)}>
                                                                <MinTitle
                                                                    className="text-tertiary hover:text-theme cursor-pointer text-primary"
                                                                    text={
                                                                        content?.length >
                                                                            (window.innerWidth < 640
                                                                                ? 80
                                                                                : window.innerWidth < 1024
                                                                                    ? 80
                                                                                    : 80)
                                                                            ? `${content?.slice(
                                                                                0,
                                                                                window.innerWidth < 640
                                                                                    ? 80
                                                                                    : window.innerWidth < 1024
                                                                                        ? 80
                                                                                        : 80
                                                                            )}...`
                                                                            : content
                                                                    }
                                                                />
                                                            </div>
                                                        </td>
                                                        <td className="py-2 pl-3 text-sm font-medium hidden lg:table-cell">
                                                            {currency_symbol}
                                                            {(
                                                                item.offer_price /
                                                                (parseFloat(conversion_rate_to_tk) || 1)
                                                            ).toFixed(2)}
                                                        </td>
                                                        <td className="py-2 pl-6 hidden lg:table-cell">
                                                            {item?.stock === "yes" ? (
                                                                <MinTitle
                                                                    className="text-green-500 font-medium"
                                                                    text="In stock"
                                                                />
                                                            ) : (
                                                                <MinTitle
                                                                    className="text-red-500"
                                                                    text="Out of Stock"
                                                                />
                                                            )}
                                                        </td>
                                                        <td className="py-2 hidden lg:table-cell">
                                                            <div className="flex justify-end items-center gap-12">
                                                                {item.stock === "yes" ? (

                                                                    <div className="grid gap-4 grid-cols-2">
                                                                        <AddToCartButton
                                                                            onClick={() => handleAddToCart(item)}
                                                                            className="w-full"
                                                                            text={(() => {
                                                                                const fullText = "Add to Cart"
                                                                                const maxLength = 12;
                                                                                return fullText.length > maxLength
                                                                                    ? fullText.slice(0, maxLength - 1) + "…"
                                                                                    : fullText;
                                                                            })()}
                                                                            icon={
                                                                                <LiaCartPlusSolid />
                                                                            }
                                                                        />
                                                                        <BuyNowButton
                                                                            className="w-full"
                                                                            text={(() => {
                                                                                const fullText = "Buy Now"
                                                                                const maxLength = 12;
                                                                                return fullText.length > maxLength
                                                                                    ? fullText.slice(0, maxLength - 1) + "…"
                                                                                    : fullText;
                                                                            })()}
                                                                            icon={
                                                                                <CgPentagonTopRight  />
                                                                            }
                                                                        />


                                                                    </div>
                                                                ) : (
                                                                    <SelectButton
                                                                        className="w-full cursor-default !bg-red-500 !border-red-500 hover:!bg-red-500 !cursor-none !disabled"
                                                                        text={(() => {
                                                                            const fullText = "Out_Of_Stock"
                                                                            const maxLength = 13;
                                                                            return fullText.length > maxLength
                                                                                ? fullText.slice(0, maxLength - 1) + "…"
                                                                                : fullText;
                                                                        })()}
                                                                    />
                                                                )}
                                                                <p
                                                                    onClick={() => handleDelete(index)}
                                                                    className={`text-red-500 text-sm cursor-pointer border border-transparent p-2 rounded-sm flex items-center gap-2 
                  active:bg-transparent active:text-red-500 active:border-red-500 `}
                                                                >

                                                                    <FaTrashCan />
                                                                </p>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    {expandedRow === index && (
                                                        <tr className="bg-[#F9FAFB] lg:hidden">
                                                            <td colSpan="3" className="py-2 px-4">
                                                                <div className="grid grid-cols-2 gap-4">
                                                                    <div>
                                                                        <p className="text-sm font-semibold text-primary">
                                                                            Price
                                                                            :
                                                                        </p>{" "}
                                                                        <ExtraMinTitle
                                                                            className="text-tertiary !text-xs"
                                                                            text={`${currency_symbol}${(
                                                                                item.offer_price /
                                                                                (parseFloat(conversion_rate_to_tk) || 1)
                                                                            ).toFixed(2)}`}
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-sm font-semibold text-primary">
                                                                            "Availability"
                                                                            :
                                                                        </p>{" "}
                                                                        {item?.stock === "yes" ? (
                                                                            <MinTitle
                                                                                className="text-green-500 font-medium"
                                                                                text="In stock"
                                                                            />
                                                                        ) : (
                                                                            <MinTitle
                                                                                className="text-red-500"
                                                                                text="Out of Stock"
                                                                            />
                                                                        )}
                                                                    </div>
                                                                    <div className=" flex justify-between items-center gap-2">
                                                                        {item.stock === "yes" ? (

                                                                            <div className="grid gap-2 grid-cols-1">
                                                                                <AddToCartButton
                                                                                    onClick={() => handleAddToCart(item)}
                                                                                    className="w-full"
                                                                                    text={(() => {
                                                                                        const fullText = "Add to Cart"
                                                                                        const maxLength = 12;
                                                                                        return fullText.length > maxLength
                                                                                            ? fullText.slice(0, maxLength - 1) + "…"
                                                                                            : fullText;
                                                                                    })()}
                                                                                    icon={
                                                                                        <LiaCartPlusSolid />
                                                                                    }
                                                                                />
                                                                                <BuyNowButton
                                                                                    className="w-full"
                                                                                    text={(() => {
                                                                                        const fullText = "Buy Now"
                                                                                        const maxLength = 12;
                                                                                        return fullText.length > maxLength
                                                                                            ? fullText.slice(0, maxLength - 1) + "…"
                                                                                            : fullText;
                                                                                    })()}
                                                                                    icon={
                                                                                        <CgPentagonTopRight  />
                                                                                    }
                                                                                />


                                                                            </div>

                                                                        ) : (
                                                                            <SelectButton
                                                                                className="w-full sm:w-[60%] cursor-default bg-gray-300 text-gray-500"
                                                                                text={(() => {
                                                                                    const fullText = "Out Of Stock"
                                                                                    const maxLength = 13;
                                                                                    return fullText.length > maxLength
                                                                                        ? fullText.slice(0, maxLength - 1) + "…"
                                                                                        : fullText;
                                                                                })()}
                                                                            />
                                                                        )}
                                                                    </div>
                                                                    <div>
                                                                        <p
                                                                            onClick={() => handleDelete(index)}
                                                                            className={`text-red-500 text-sm cursor-pointer border border-transparent p-2 rounded-sm flex items-center gap-2 active:bg-transparent active:text-red-500  `}
                                                                        >
                                                                            <FaTrashCan />
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )}
                                                </>
                                            );
                                        })}
                                    </tbody>
                                </table>

                                {visibleItems < wishlistData.length && (
                                    <div className="text-center mt-4">
                                        <LoadingButton
                                            text="Load More"
                                            loadingTime="1000"
                                            onClick={handleLoadMore}
                                        />
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="text-center py-8 lg:py-14 ">
                                <img className="m-auto text-center" src={emptyWishlist} alt="" />
                                <MinTitle
                                    className="py-4 text-center text-tertiary"
                                    text="You have not added product to wishlist yet!"
                                />
                                <PrimaryButton
                                    className=" hover:text-theme !text-base hover:bg-transparent m-auto !uppercase !text-xs active:text-secondary hover:border-theme active:!border-transparent w-[80%] sm:w-[40%] md:w-[30%] lg:w-[20%]"
                                    text="Return To Shop"
                                    slug="shop"
                                    icon={<FaCartShopping />}
                                />
                            </div>
                        )}
                    </div>
                    {/* </Container>
      </div> */}
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
                                        <ProductQuickView translations={translations} slug={selectedSlug} />
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>,
                        document.body
                    )}
                </Container>
            </div>
        </>
    );
};

export default WishlistPage;
