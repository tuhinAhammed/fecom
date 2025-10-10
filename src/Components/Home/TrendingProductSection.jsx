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
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import ViewAllButton from "../../Layout/Button/ViewAllButton";
import PrimaryProductCard from "../../Layout/ProductCard/PrimaryProductCard";
const TrendingProductSection = ({ productData, loading }) => {
  console.log('Product Data:', productData);
  const navigate = useNavigate()
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  // const productData = useSelector((state) =>
  //     state.latestAndTopRatedProduct?.topRatedProducts || []
  // )
  // console.log(productData);

  const handleGoPage = () => {
    navigate("/trending-products");
  };

  // Page Translation
  // const selectedLanguage = useSelector((state) => state.language.selectedLanguage?.lang_code);
  // const topRatedProductTranslations = useSelector(
  //   (state) => state.homeBlogs?.homeBlogs?.page_translations?.Top_Rated_Product
  // );

  const sectionTitleText = "Trending Products"
  return (
    <>
      {productData?.length > 0 && (
        <div className="py-sectionSm md:py-sectionMd lg:py-sectionLg xl:py-sectionXl bg-secondary ">
          <Container>
            <div
              className="rounded-md"
              
            >
              {/* Section Title with Custom Navigation Buttons */}
              <div className="pb-[20px] sm:pb-sectionSm lg:pb-sectionSm flex items-center justify-between relative">
                <CategoryTitle
                  className="font-bold tracking-wider  font-tertiary uppercase"
                  text={sectionTitleText}
                />
                <div className="flex gap-x-2 sm:gap-x-5 md:gap-x-6 lg:gap-x-8 items-center">
                  <div onClick={handleGoPage} className="">
                    <ViewAllButton />
                  </div>
                  <div className="flex space-x-2">
                    <div
                      ref={prevRef}
                      className="w-6 md:w-8 lg:w-10 h-6 md:h-8 lg:h-10 bg-secondary hover:bg-theme hover:text-secondary duration-300 text-primary text-[10px] sm:text-sm md:text-md lg:text-lg flex items-center justify-center rounded-md cursor-pointer active:bg-themeDeep border-[1px] border-tertiary border-opacity-[0.2]"
                      style={{ boxShadow: "0px 6px 16px rgba(0,0,0,0.15)" }}
                    >
                      <MdOutlineArrowBackIosNew />
                    </div>
                    <div
                      ref={nextRef}
                      className="w-6 md:w-8 lg:w-10 h-6 md:h-8 lg:h-10 bg-secondary hover:bg-theme hover:text-secondary duration-300 text-primary text-[10px] sm:text-sm md:text-md lg:text-lg flex items-center justify-center rounded-md cursor-pointer shadow-md active:bg-themeDeep border-[1px] border-tertiary border-opacity-[0.2]"
                      style={{ boxShadow: "0px 6px 16px rgba(0,0,0,0.15)" }}
                    >
                      <MdOutlineArrowForwardIos />
                    </div>
                  </div>
                </div>
              </div>

              {/* Swiper Slider */}
              <Swiper
                modules={[Navigation, Autoplay]}
                spaceBetween={30} // Space between slides
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
                  1024: { slidesPerView: 4 },
                  1200: { slidesPerView: 4 },
                }}
              >
                <div className="">
                  {productData && (
                    <div className="">
                      {productData.map((item, index) => {

                        return (
                          <SwiperSlide className="shadow-sm" key={index}>
                            <PrimaryProductCard
                              thumbnail={item.photos?.[0] ?
                                `${item.photos[0].file_path}/${item.photos[0].file_name}` :
                                item.thumbnail
                              }
                              category={item.category_id}
                              name={item.product_name}
                              finalPrice={item.offer_price}
                              regularPrice={item.regular_price}
                              slug={item.slug}
                              ratting={item.rating}
                              loading={loading}
                              onQuickView={() => handleOpenModal(item)}
                              productId={item?.id}
                              stock={item.stock}
                              variants={item?.variants}
                            />
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

export default TrendingProductSection;
