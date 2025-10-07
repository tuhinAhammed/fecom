import React, { useRef } from "react";
import Container from "../../Layout/Container";

// Import Swiper components and styles
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
// import SecondaryButton from "../../Layout/Button/SecondaryButton";
// import PrimaryProductCard from "../ProductCard/PrimaryProductCard";
import CategoryTitle from "../../Layout/Title/CategoryTitle";
import MinTitle from "../../Layout/Title/MinTitle";
// import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import ViewAllButton from "../../Layout/Button/ViewAllButton";
import LargeTitle from "../../Layout/Title/LargeTitle";
import MidTitle from "../../Layout/Title/MidTitle";
const CustomerReview = ({loading}) => {
  const navigate = useNavigate()
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  // const productData = useSelector((state) =>
  //     state.latestAndTopRatedProduct?.topRatedProducts || []
  // )
  // console.log(productData);
  const productData = [
    {
      name : "Pne"
    },
    {
      name : "Pne"
    },
    {
      name : "Pne"
    },
    {
      name : "Pne"
    },
    {
      name : "Pne"
    },
    {
      name : "Pne"
    },
    {
      name : "Pne"
    },
    {
      name : "Pne"
    },
  ]
  const handleGoShop = (selectName) => {
    console.log(selectName);
    navigate("/shop", { state: selectName ? { sortBy: selectName } : {}, replace: true });
};

// Page Translation
// const selectedLanguage = useSelector((state) => state.language.selectedLanguage?.lang_code);
// const topRatedProductTranslations = useSelector(
//   (state) => state.homeBlogs?.homeBlogs?.page_translations?.Top_Rated_Product
// );

  return (
    <>
      {productData.length > 0  && (
        <div className="py-sectionSm md:py-sectionMd lg:py-sectionLg xl:py-sectionXl bg-secondary ">
          <Container>
            <div
              className="py-[20px] sm:py-sectionSm lg:py-sectionMd px-2 sm:px-4 md:px-6 lg:px-8 bg-secondary rounded-md"
              style={{ boxShadow: "0px 0px 5px 0px rgba(0 0 0 / 10%)" }}
            >
              {/* Section Title with Custom Navigation Buttons */}
              <div className="pb-[20px] sm:pb-sectionSm lg:pb-sectionMd flex items-center justify-between relative">
                <LargeTitle
                  className="font-bold tracking-wider font-tertiary uppercase"
                  text="Our Happy Customers"
                />
                <div className="flex gap-x-2 sm:gap-x-5 md:gap-x-6 lg:gap-x-8 items-center">
                {/* <div onClick={() => handleGoShop("topRated")} className="">
                <ViewAllButton  />
                  </div> */}
 <div className="flex space-x-2">
                     <div
                       ref={prevRef}
                       className="w-6 md:w-8 lg:w-10 h-6 md:h-8 lg:h-10 bg-secondary hover:bg-theme hover:text-secondary duration-300 text-primary text-[10px] sm:text-sm md:text-md lg:text-lg flex items-center justify-center rounded-md cursor-pointer active:bg-themeDeep"
                       style={{ boxShadow: "0px 0px 10px 0px rgb(0 0 0 / 10%)" }}
                     >
                       <MdOutlineArrowBackIosNew />
                     </div>
                     <div
                       ref={nextRef}
                       className="w-6 md:w-8 lg:w-10 h-6 md:h-8 lg:h-10 bg-secondary hover:bg-theme hover:text-secondary duration-300 text-primary text-[10px] sm:text-sm md:text-md lg:text-lg flex items-center justify-center rounded-md cursor-pointer shadow-md active:bg-themeDeep"
                       style={{ boxShadow: "0px 0px 10px 0px rgb(0 0 0 / 10%)" }}
                     >
                       <MdOutlineArrowForwardIos />
                     </div>
                   </div>
                </div>
              </div>

              {/* Swiper Slider */}
              <Swiper
                modules={[Navigation, Autoplay]}
                spaceBetween={20} // Space between slides
                slidesPerView={3} // Show 3 slides per view
                slidesPerGroup={1} // Slide one item at a time
                autoplay={{
                  delay: 5000, // Auto-slide every 3 seconds
                  disableOnInteraction: false,
                }}
                loop={true} // Ensures smooth looping
                navigation={{
                  prevEl: prevRef.current,
                  nextEl: nextRef.current,
                }}
                onBeforeInit={(swiper) => {
                  swiper.params.navigation.prevEl = prevRef.current;
                  swiper.params.navigation.nextEl = nextRef.current;
                }}
                breakpoints={{
                  1: { slidesPerView: 2 },
                  576: { slidesPerView: 3 },
                  768: { slidesPerView: 3 },
                  1024: { slidesPerView: 3 },
                  1200: { slidesPerView: 3 },
                }}
              >
                <div className="">
                  {productData && (
                    <div className="">
                      {productData.map((item , index) => {
                        
                        return (
                          <SwiperSlide className="shadow-sm" key={index}>
                            ok
{/* <PrimaryProductCard
                              thumbnail={item.thumbnail}
                              name={item.name}
                              finalPrice={item.final_price}
                              regularPrice={item.regular_price}
                              slug={item.slug}
                              discount={item.discount}
                              discountType={item.discount_type}
                              ratting={item.rating}
                              loading={loading}
                              onQuickView={() => handleOpenModal(item)}
                              isVariant={item.is_variant}
                              quantity={item.stock_qty}
                              productId= {item.id}
                              variant = {null} 
                              variantAttribute = {null} 
                              tax= {item.tax}
                              sku= {item.sku}
                              vendorId = {item.vendor.id}
                              minPayable = {item.finalPrice}
                              shippingCost= {item.shipping_cost}
                              codAvailable= {item.cod_available}
                              translation={item.translation}
                            /> */}
                          </SwiperSlide>
                        );
                      })}
                    </div>
                  )}
                  <MinTitle
                    className="text-tertiary text-center"
                    text="No Product Found"
                  />
                </div>
              </Swiper>
            </div>
          </Container>
        </div>
      )}
    </>
  );
};

export default CustomerReview;
