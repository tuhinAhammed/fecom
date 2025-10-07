import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules"; // Import the Autoplay module
import Container from "../../Layout/Container";
import MidTitle from "../../Layout/Title/MidTitle";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import { Link, useNavigate } from "react-router-dom";
import MinTitle from "../../Layout/Title/MinTitle";
import { useSelector } from "react-redux";
import emptyCategory from "../../assets/Category/emptyCategory.png"
// import { api } from "../../Api/Api";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Categories = () => {
    const categoriesData = useSelector((state) => state.landingPageData?.data?.categories)
    console.log(categoriesData);
  
  const navigate = useNavigate()
  
  // Filter only active categories
  const activeCategories = categoriesData?.filter(category => category.status === "active") || [];
  
  const handleGoCategory = async (categorySlug) => {
    try {
      if (categorySlug === "/categories") {
        navigate(`/categories`);
      } else {
        navigate(`/categories/${categorySlug}`, {
          state: { categorySlug: categorySlug },
        });
      }
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  };


  return (
    <>
      {activeCategories.length > 0 && (
        <div className="py-8 md:py-10 lg:pt-16 bg-secondary">
          <Container>
            {/* Swiper container for sliding the categories */}
            <Swiper
              modules={[Autoplay]} // Register the Autoplay module
              spaceBetween={30} // space between slides
              slidesPerView={6}
              loop={true} // show 6 slides at a time
              freeMode={false} // disable free scroll for controlled sliding
              autoplay={{
                delay: 3000, // auto slide every 1 second
                disableOnInteraction: false, // keep autoplay after user interaction
              }}
              slidesPerGroup={1} // scroll 1 item at a time
              breakpoints={{
                // Configure breakpoints for different screen sizes
                100: {
                  slidesPerView: 3, // For small screens, show 2 slides
                },
                320: {
                  slidesPerView: 3, // For small screens, show 2 slides
                },
                640: {
                  slidesPerView: 4, // For small screens, show 2 slides
                },
                768: {
                  slidesPerView: 5, // For medium screens, show 4 slides
                },
                1024: {
                  slidesPerView: 7, // For large screens, show 6 slides
                },
              }}
              pagination={false} // disable pagination dots
              navigation={false} // disable arrows
            >
              {activeCategories.map((item, index) => {
                // Use emptyCategory image if icon is null, otherwise use the icon URL
                const icon = item.icon ? `${BASE_URL}/${item.icon}` : emptyCategory;
                const categoryName = item.category_name
                return (
                  <SwiperSlide
                    key={item.id} // Use item.id instead of index for better key
                    className="flex flex-col items-center justify-center"
                  >
                    <div onClick={() => handleGoCategory(item.slug)} className="group cursor-pointer">
                      <div className="md:mb-2 aspect-[1/1] max-h-[50px] sm:max-h-[60px] md:max-h-[120px] lg:max-h-[120px] object-fill m-auto">
                        <img
                          className="w-full h-full m-auto border-2 border-theme rounded-full border-opacity-0 group-hover:border-opacity-100 duration-500 group-hover:scale-90 p-2 "
                          src={icon}
                          alt={categoryName || "Category"}
                          onError={(e) => {
                            // Fallback if the image fails to load
                            e.target.src = emptyCategory;
                          }}
                        />
                      </div>
                      <MinTitle
                        className="text-center font-medium text-tertiary max-h-[100px] overflow-hidden text-ellipsis whitespace-nowrap"
                        text={
                          categoryName?.length > 20
                            ? `${categoryName.substring(0, 20)}...`
                            : categoryName
                        }
                      />
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </Container>
        </div>
      )}
    </>
  );
};

export default Categories;