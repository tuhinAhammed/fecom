import React, { useEffect, useState } from "react";
const DOMAIN_NAME = import.meta.env.VITE_API_DOMAIN_NAME;
import Container from "../Layout/Container";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import logo from "../assets/Header/logo.png"
import LargeTitle from "../Layout/Title/LargeTitle";
import MidTitle from "../Layout/Title/MidTitle";
import AddToCartButton from "../Layout/Button/AddToCartButton";
import MinTitle from "../Layout/Title/MinTitle";
import ExtraMinTitle from "../Layout/Title/ExtraMinTitle";
import { CiDeliveryTruck, CiShare2 } from "react-icons/ci";
import { addItem, updateCartSummary } from "../Redux/Slice/cartSlice";
import { GoPlus } from "react-icons/go";
import { HiMinus, HiOutlinePlusSm } from "react-icons/hi";
import { PiMinusLight } from "react-icons/pi";
import { HiMinusSmall } from "react-icons/hi2";
import { Bounce, toast } from "react-toastify";
import { FaCheck, FaStar } from "react-icons/fa";
import { RxCheck } from "react-icons/rx";
import { LiaCartPlusSolid } from "react-icons/lia";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Navigation } from "swiper/modules";
import { api, singleProductApi } from "../Api";
import { MdBrightnessLow, MdOutlineBrightness1 } from "react-icons/md";
import BuyNowButton from "../Layout/Button/BuyNowButton";
import { CgPentagonTopRight } from "react-icons/cg";

const SingleProduct = () => {
  const [productItem, setProductItem] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [updatedImages, setUpdatedImages] = useState([]);
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState({});
  const location = useLocation();
  const { slug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [variantLoading, setVariantLoading] = useState(true);
  const [variantProductInfo, setVariantProductInfo] = useState({});
  const [translations, setTranslations] = useState({});
  const selectedLanguage = useSelector(
    (state) => state.language?.selectedLanguage
  );
  const { productId } = location.state || {};

  useEffect(() => {
    const handleProductFetch = async () => {
      setLoading(true);
      setSelectedImage(null);
      setUpdatedImages([]);
      setSelectedColor(null);
      setSelectedVariant({});
      setVariantProductInfo({});

      try {
        const response = await axios.get(
          `${singleProductApi}${productId}`
        );

        console.log("API Response:", response.data);
        const product = response.data.product || {};
        setProductItem(product);
        // For related products, you might need to adjust based on your API
        setRelatedProduct([]); // Set empty for now, adjust if API provides related products

        // Process images from photos array
        const images = product?.photos || [];
        const updatedImagesArray = images.map(photo => ({
          image: `${photo.file_path}/${photo.file_name}`
        }));

        setUpdatedImages(updatedImagesArray);

        // Set first image as the default selected image
        if (updatedImagesArray.length > 0) {
          setSelectedImage(updatedImagesArray[0].image);
        }

        // Set initial variant if variants exist
        // let initialVariant = {};
        // if (product.variants && product.variants.length > 0) {
        //   initialVariant.Size = product.variants[0]; // Set first variant as default
        // }

        setSelectedVariant({});
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      handleProductFetch();
    }
  }, [productId, slug]);

  const [count, setCount] = useState(1); // Default to 1 since min_buying_qty is not in API

  const handleThumbnailClick = (image) => {
    setSelectedImage(image);
    setVariantProductInfo((prev) => ({ ...prev, image: null }));
  };

  const productImage = `${api}/${selectedImage}`;
  const variantProductInfoImage =
    variantProductInfo?.image === null
      ? `${api}/${selectedImage}`
      : `${api}/${variantProductInfo?.image}`;

  const cartItems = useSelector((state) => state.cart?.cartItems);
  const currencyData = useSelector(
    (state) => state.currency?.selectedCurrency || []
  );
  const { currency, conversion_rate_to_tk, } = currencyData;
  const currency_symbol = "৳"
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const image = e.target;
    const rect = image.getBoundingClientRect();
    const offsetX = clientX - rect.left;
    const offsetY = clientY - rect.top;

    const xPercent = (offsetX / rect.width) * 100;
    const yPercent = (offsetY / rect.height) * 100;

    image.style.transformOrigin = `${xPercent}% ${yPercent}%`;
    image.style.transform = "scale(1.5)";
  };

  const handleMouseLeave = () => {
    const image = document.querySelector(".zoom-image");
    image.style.transform = "scale(1)";
  };

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  useEffect(() => {
    setCount(1);
  }, [slug]);
console.log(productItem);
  // Calculate prices based on API response
  const finalPrice = parseFloat(productItem?.offer_price) ;
  const regularPrice = parseFloat(productItem?.regular_price) ;
  const hasVariants = productItem?.variants && productItem.variants.length > 0;
  const handleAddToCart = () => {
    const countValue =
      parseInt(document.getElementById("quantityInput")?.value) || 1;
  
    const hasVariants = productItem?.variants?.length > 0;
  
    // 🧠 Require variant selection if product has variants
    if (hasVariants && !selectedVariant) {
      toast.warning("Please select a variant before adding to cart!", {
        position: "top-right",
        autoClose: 1500,
        theme: "light",
        transition: Bounce,
      });
      return;
    }
  
    // 🛒 Build minimal cart item
    const newItem = {
      productId: productItem.id,
      quantity: countValue,
      variant: selectedVariant?.Size || null,
    };
  
    const existingItemIndex = cartItems.findIndex(
      (item) =>
        item.productId === newItem.productId &&
        item.variant === newItem.variant
    );
  
    if (existingItemIndex !== -1) {
      // ✅ Update quantity if already in cart
      const existingItem = cartItems[existingItemIndex];
      const updatedQuantity = existingItem.quantity + countValue;
  
      dispatch(
        updateCartSummary({
          index: existingItemIndex,
          quantity: updatedQuantity,
        })
      );
    } else {
      // ✅ Add new simple item
      dispatch(addItem(newItem));
    }
  
    toast.success("Added to cart!", {
      position: "top-right",
      autoClose: 1500,
      theme: "light",
      transition: Bounce,
    });
  };
  
  
  // 🛍 Buy Now Handler
  const handleBuyNow = () => {
    const hasVariants = productItem?.variants?.length > 0;
  
    // ⚠️ Show warning only for Buy Now (not for Add to Cart)
    if (hasVariants && !selectedVariant?.Size) {
      toast.warning("Please select a variant before Order!", {
        position: "top-right",
        autoClose: 1500,
        theme: "light",
        transition: Bounce,
      });
      return; // stop here — no navigate
    }
  
    // ✅ If variant selected or no variants exist, proceed to checkout
    navigate("/checkout");
  };
  
  

  // const handleBuyNow = () => {
  //   handleAddToCart();
  //   navigate("/checkout");
  // };

  const handleGoCategory = (categorySlug) => {
    navigate(`/categories/${categorySlug}`, {
      state: { categorySlug: categorySlug },
    });
  };

  const handleGoBrand = (brandSlug) => {
    navigate(`/brand/${brandSlug}`);
  };

  const handleGoTag = (query) => {
    navigate(`/search/${query}`, {
      state: { query: query },
    });
  };

  // Check if product is in stock
  const isInStock = productItem?.stock === "yes";

  const returnNote = "Return within 7 days of purchase. Taxes are non-refundable.";

  return (
    <>
      <div className="  bg-secondary">
        <Container>
          <div className=" py-sectionSm" >
            <div className="shadow-xl pb-sectionLg">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-18 items-start">
                <div className="col-span-1 md:col-span-5 lg:sticky lg:top-32 lg:h-fit">
                  {/* Main Thumbnail Image with Zoom on Hover */}
                  {loading ? (
                    <div className="aspect-[6/6] lg:aspect-[4/4.5] max-h-[200px] lg:max-h-[500px] overflow-hidden relative cursor-zoom-in m-auto md:m-none bg-skeletonLoading animate-pulse"></div>
                  ) : (
                    <div className="aspect-[6/6] lg:aspect-[4/4.5] max-h-[200px] lg:max-h-[500px] overflow-hidden relative cursor-zoom-in  m-auto md:m-none">
                      {variantProductInfo?.image ? (
                        <img
                          className="w-full h-full zoom-image transition-transform duration-300 ease-in-out object-fill"
                          src={`${api}/${variantProductInfo?.image || selectedImage}`}
                          alt="Product Thumbnail"
                          onMouseMove={handleMouseMove}
                          onMouseLeave={handleMouseLeave}
                          style={{
                            transform: "scale(1)",
                            transition: "transform 0.3s ease-in-out",
                          }}
                        />
                      ) : (
                        <img
                          className="w-full h-full zoom-image transition-transform duration-300 ease-in-out object-contain"
                          src={`${api}/${selectedImage}`}
                          alt="Product Thumbnail"
                          onMouseMove={handleMouseMove}
                          onMouseLeave={handleMouseLeave}
                          style={{
                            transform: "scale(1)",
                            transition: "transform 0.3s ease-in-out",
                          }}
                        />
                      )}
                    </div>
                  )}

                  {/* Gallery Images */}
                  {updatedImages.length > 0 && (
                    <div className="py-2 md:py-4 md:mr-[80px]">
                      <Swiper
                        slidesPerView={7}
                        spaceBetween={0}
                        navigation
                        modules={[Navigation]}
                        className="mySwiper"
                        breakpoints={{
                          640: {
                            slidesPerView: 4,
                          },
                          768: {
                            slidesPerView: 4,
                          },
                          1024: {
                            slidesPerView: 5,
                          },
                        }}
                      >
                        {updatedImages.map((item, index) => {
                          const galleryImage = `${api}/${item.image}`;
                          const isSelected =
                            selectedImage === item.image &&
                            !variantProductInfo?.image;
                          return (
                            <SwiperSlide key={index}>
                              <div
                                className={`aspect-[4/5] max-h-[60px] md:max-h-[90px] cursor-pointer duration-200 hover:border-theme border-[1px] lg:border-2 ${loading
                                  ? "bg-skeletonLoading animate-pulse"
                                  : ""
                                  } ${isSelected
                                    ? "border-theme"
                                    : "border-transparent"
                                  }`}
                                onClick={() => handleThumbnailClick(item.image)}
                              >
                                <img
                                  className="w-full h-full object-fill"
                                  src={galleryImage}
                                  alt={`Gallery Image ${index}`}
                                />
                              </div>
                            </SwiperSlide>
                          );
                        })}
                      </Swiper>
                    </div>
                  )}
                </div>

                <div className="col-span-1 md:col-span-7 rounded-sm !bg-secondary ">
                  {/* Product Details */}
                  <div className="flex items-center gap-4 pb-3 md:pb-5   ">
                    <div className="">
                      {loading ? (
                        <div className="h-2 md:h-7  w-12 md:w-20 lg:w-28 rounded-full bg-skeletonLoading animate-pulse"></div>
                      ) : (
                        <div className="">
                          {isInStock ? (
                            <MidTitle
                              className=" font-medium text-green-500 px-4  py-1 rounded-full bg-green-500 bg-opacity-[0.2] inline-block"
                              text="In Stock"
                            />
                          ) : (
                            <MidTitle
                              className=" font-medium text-red-500 px-4  py-1 rounded-full bg-red-500 bg-opacity-[0.2] inline-block"
                              text="Out Of Stock"
                            />
                          )}
                        </div>
                      )}
                    </div>
                    <div className="">
                      {loading ? (
                        <div className="h-2 md:h-7  w-12 md:w-20 lg:w-40 rounded-full bg-skeletonLoading animate-pulse"></div>
                      ) : (
                        <div
                          onClick={() =>
                            handleGoCategory(productItem?.category_id)
                          }
                          className=""
                        >
                          <MidTitle
                            className=" font-normal text-theme cursor-pointer px-4  py-1 rounded-full bg-theme bg-opacity-[0.2] inline-block"
                            text={productItem?.category_id}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="" style={{ boxShadow: "0px 0px 5px 0px rgba(0 0 0 / 10%)" }}>
                    {loading ? (
                      <div className="py-3">
                        <div className="w-full h-4 rounded-lg bg-skeletonLoading animate-pulse"></div>
                        <div className="w-[60%] mt-3 h-4 rounded-lg bg-skeletonLoading animate-pulse"></div>
                      </div>
                    ) : (
                      <LargeTitle
                        className=" leading-[30px] md:!leading-[34px] lg:!leading-[38px] !font-medium !text-primary"
                        text={productItem?.product_name}
                      />
                    )}
                    {/* Price */}
                    {loading ? (
                      <div className="price flex gap-2 my-3 md:my-5 items-end ">
                        <div className="text-[16px] md:text-[16px] lg:text-[24px] font-semibold text-primary md:h-4 lg:h-6 w-8 md:w-12 lg:w-28 rounded-md bg-skeletonLoading animate-pulse"></div>
                        <div className="text-[14px] md:text-[14px] lg:text-[16px] font-medium text-gray-400 line-through md:h-4 lg:h-4 w-8 md:w-12 lg:w-28 rounded-md  bg-skeletonLoading animate-pulse "></div>
                      </div>
                    ) : (
                      <div className="">
                        {hasVariants ? (
                          <div className="price flex gap-4 py-2 md:py-3 lg:py-5 items-end">
                            <p className="text-[16px] md:text-[16px] lg:text-[24px] font-semibold text-theme">
                              {currency_symbol}
                              {(
                                (variantProductInfo.final_price || finalPrice) /
                                (parseFloat(conversion_rate_to_tk) || 1)
                              ).toFixed(2)}
                            </p>
                            <div className="flex items-center gap-2">
                              {(variantProductInfo.final_price || finalPrice) !== regularPrice && (
                                <div className="text-[14px] md:text-[14px] lg:text-[16px] font-medium text-gray-400 line-through">
                                  {currency_symbol}
                                  {(
                                    regularPrice /
                                    (parseFloat(conversion_rate_to_tk) || 1)
                                  ).toFixed(2)}
                                </div>
                              )}
                              {/* Discount Badge */}
                              {regularPrice > finalPrice && (
                                <MinTitle
                                className=" font-normal text-green-500 cursor-pointer px-3  py-1 rounded-full bg-green-500 bg-opacity-[0.2] font-semibold inline-block"
                                text={`${Math.round(((regularPrice - finalPrice) / regularPrice) * 100)}% OFF`}
                              />

                              )}
                            </div>
                          </div>
                        ) : (
                          <div className="price flex gap-4 py-1 md:py-3 lg:py-5 items-end">
                            <p className="text-[16px] md:text-[16px] lg:text-[24px] font-semibold text-primary">
                              {currency_symbol}
                              {(
                                finalPrice /
                                (parseFloat(conversion_rate_to_tk) || 1)
                              ).toFixed(2)}
                            </p>
                            <div className="">
                              {finalPrice !== regularPrice && (
                                <span className="text-[14px] md:text-[14px] lg:text-[16px] font-medium text-gray-400 line-through">
                                  {currency_symbol}
                                  {(
                                    regularPrice /
                                    (parseFloat(conversion_rate_to_tk) || 1)
                                  ).toFixed(2)}
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Variants (Sizes) */}
                    { loading ?
                      <div className="price flex gap-2 my-3 md:my-8 items-end ">
                        <div className="text-[16px] md:text-[16px] lg:text-[24px] font-semibold text-primary md:h-4 lg:h-8 w-8 md:w-12 lg:w-40 rounded-md bg-skeletonLoading animate-pulse"></div>
                        <div className="text-[14px] md:text-[14px] lg:text-[16px] font-medium text-gray-400 line-through md:h-4 lg:h-6 w-8 md:w-12 lg:w-32 rounded-md  bg-skeletonLoading animate-pulse "></div>
                      </div>
                      :
                      <div className="">
                                            {productItem?.variants?.length > 0 && (
                      <div className="">
                        <div className="flex items-center gap-6 md:mb-2">
                          <MidTitle className="font-medium" text="Select Size" />:
                          <div className="flex flex-wrap gap-2">
                            {productItem.variants.map((variant, index) => (
                              <button
                                key={index}
                                className={`text-sm md:text-base px-2 md:px-4 py-1 md:py-2 border rounded-md transition-colors ${selectedVariant.Size === variant
                                  ? "bg-theme text-white border-theme"
                                  : "bg-white text-primary border-gray-300 hover:border-theme"
                                  }`}
                                onClick={() => {
                                  setSelectedVariant((prev) => ({
                                    ...prev,
                                    Size: variant,
                                  }));
                                }}
                              >
                                {variant}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                      </div>
                    }


                    {/* Quantity Select */}
                    {
                      loading ?
                      <div className="price flex gap-2 my-3 md:my-4 lg:my-8 items-end ">
                      <div className="text-[16px] md:text-[16px] lg:text-[24px] font-semibold text-primary md:h-4 lg:h-8 w-8 md:w-12 lg:w-40 rounded-md bg-skeletonLoading animate-pulse"></div>
                      <div className="text-[14px] md:text-[14px] lg:text-[16px] font-medium text-gray-400 line-through md:h-4 lg:h-6 w-8 md:w-12 lg:w-32 rounded-md  bg-skeletonLoading animate-pulse "></div>
                    </div>
                    :
                    <div className="flex items-center gap-6 py-2 md:py-6">
                      <MidTitle className="font-medium" text="Quantity" />:

                      {isInStock && (
                        <div
                          className={`flex w-40 justify-between bg-white rounded-md border border-gray-300  `}
                        >
                          <button
                            onClick={decrement}
                            className="text-gray-700 text-sm md:text-lg font-bold py-[2px] md:py-1 px-3 bg-gray-100 rounded-l-md active:bg-gray-200"
                          >
                            -
                          </button>
                          <input
                            id="quantityInput"
                            min="1"
                            type="number"
                            value={count}
                            onChange={(e) => {
                              const newValue = Math.max(1, Number(e.target.value));
                              setCount(newValue);
                            }}
                            className="border-none text-sm md:text-lg outline-none ring-0 focus:outline-none focus:border-none focus:ring-0 inline-block w-full text-center font-medium p-1 md:p-2"
                          />
                          <button
                            onClick={increment}
                            className="text-gray-700 text-sm md:text-lg font-bold py-[2px] md:py-1 px-3 bg-gray-100 rounded-r-md active:bg-gray-200"
                          >
                            +
                          </button>
                        </div>
                      )}
                    </div>
                    }

                    {/* Action Button */}
                    {isInStock && (
                      <div className="pt-2">
                        {loading ? (
                          <div className="grid grid-cols-2 gap-4 sm:w-[60%] md:w-full lg:w-[70%] pb-6 md:pb-8">
                            <div className="w-54 h-10 bg-skeletonLoading animate-pulse rounded-md"></div>
                            <div className="w-54 h-10 bg-skeletonLoading animate-pulse rounded-md"></div>
                          </div>
                        ) : (
                          <div className="grid grid-cols-2 gap-4 sm:w-[60%] md:w-full lg:w-[70%] pb-6 md:pb-8">
                            <AddToCartButton
                              onClick={handleAddToCart}
                              className="!text-base rounded-md"
                              text={(() => {
                                const fullText = "Add to Cart";
                                const maxLength = 12;
                                return fullText.length > maxLength
                                  ? fullText.slice(0, maxLength - 1) + "…"
                                  : fullText;
                              })()}
                              icon={
                                <LiaCartPlusSolid className="font-bold text-lg" />
                              }
                            />
                            <BuyNowButton
                              onClick={handleBuyNow}
                              className=" !text-base rounded-md"
                              icon={
                                <CgPentagonTopRight className="font-bold text-lg" />
                              }
                              text={(() => {
                                const fullText = "Order Now";
                                const maxLength = 12;
                                return fullText.length > maxLength
                                  ? fullText.slice(0, maxLength - 1) + "…"
                                  : fullText;
                              })()}
                            />
                          </div>
                        )}
                      </div>
                    )}
                    {/* Product Description */}
                    {productItem?.description && (
                      <>
                        <hr className="w-full h-[1px] bg-borderColor " />
                        <div className="product-description pt-6">
                          <MidTitle
                            className="font-medium !text-primary mb-2"
                            text="Description"
                          />
                          <div className="text-tertiary text-sm leading-relaxed">
                            {productItem.description.split('\r\n').map((line, index) => (
                              <p key={index} className="mb-1">{line}</p>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Related Product - You can implement this when your API provides related products */}
          {relatedProduct?.length > 0 && (
            <div className="pt-2 sm:pt-4 md:pt-6 lg:pt-8 xl:pt-10">
              {/* Related products component would go here */}
            </div>
          )}
        </Container>
      </div>
    </>
  );
};

export default SingleProduct;