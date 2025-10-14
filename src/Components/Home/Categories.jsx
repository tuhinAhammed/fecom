import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import emptyCategory from "../../assets/Category/emptyCategory.png";
import Container from "../../Layout/Container";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Categories = () => {
  const categoriesData = useSelector(
    (state) => state.landingPageData?.data?.categories
  );
  const navigate = useNavigate();

  const activeCategories =
    categoriesData?.filter((category) => category.status === "active") || [];

  const handleGoCategory = (categorySlug) => {
    try {
      if (categorySlug === "/categories") {
        navigate(`/categories`);
      } else {
        navigate(`/categories/${categorySlug}`, {
          state: { categorySlug },
        });
      }
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  };

  return (
    <div className="z-[8] py-0 sticky top-20 w-full bg-secondary shadow-md border-y border-borderColor">
      <Container>
        {activeCategories.length > 0 && (
          <div className="relative py-2">
            <Swiper
              modules={[Autoplay]}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              spaceBetween={6}
              slidesPerView={4}
              breakpoints={{
                480: { slidesPerView: 6 },
                640: { slidesPerView: 6 },
                1024: { slidesPerView: 6 },
              }}
            >
              {activeCategories.map((item, index) => {
                const icon = item.icon
                  ? `${BASE_URL}/${item.icon}`
                  : emptyCategory;
                const categoryName = item.category_name;

                return (
                  <SwiperSlide key={item.id} className="relative">
                    <div
                      onClick={() => handleGoCategory(item.slug)}
                      className="flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <img
                        className="aspect-[1/1] max-h-[30px] object-fill"
                        src={icon}
                        alt={categoryName}
                        onError={(e) => {
                          e.target.src = emptyCategory;
                        }}
                      />
                      <div className="text-sm text-center">
                        {categoryName?.length > 18
                          ? `${categoryName.substring(0, 18)}...`
                          : categoryName}
                      </div>
                    </div>

                    {/* ✅ Show vertical line between all slides except the last one */}
                    {index !== activeCategories.length - 1 && (
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-8 bg-borderColor z-[5]" />
                    )}
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Categories;
