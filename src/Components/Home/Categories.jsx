import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCreative } from "swiper/modules";
import Container from "../../Layout/Container";
import MinTitle from "../../Layout/Title/MinTitle";
import "swiper/css";
import "swiper/css/effect-creative";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import emptyCategory from "../../assets/Category/emptyCategory.png";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Categories = () => {
  const categoriesData = useSelector((state) => state.landingPageData?.data?.categories);
  const navigate = useNavigate();
  
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

  // Function to get a vibrant gradient based on index
  const getCategoryGradient = (index) => {
    const gradients = [
      "bg-gradient-to-br from-theme to-theme/80",
      "bg-gradient-to-br from-theme to-secondary/80",
      "bg-gradient-to-br from-theme to-accent/80",
      "bg-gradient-to-br from-theme/80 to-secondary",
      "bg-gradient-to-br from-theme/80 to-accent",
      "bg-gradient-to-br from-theme/80 to-primary",
      "bg-gradient-to-br from-theme-600 to-gray-800",
      "bg-gradient-to-br from-theme to-accent"
    ];
    return gradients[index % gradients.length];
  };

  return (
    <>
      {activeCategories.length > 0 && (
        <div className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute top-0 left-0 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-yellow-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
          
          <Container>
            {/* Section Header */}
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
                Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Categories</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Discover our wide range of products organized into carefully curated categories
              </p>
            </div>

            {/* Mobile Swiper View */}
            <div className="lg:hidden">
              <Swiper
                modules={[Autoplay, EffectCreative]}
                effect="creative"
                creativeEffect={{
                  prev: {
                    shadow: true,
                    translate: [0, 0, -400],
                  },
                  next: {
                    translate: ["100%", 0, 0],
                  },
                }}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                spaceBetween={20}
                slidesPerView={2}
                breakpoints={{
                  480: {
                    slidesPerView: 3,
                  },
                  640: {
                    slidesPerView: 4,
                  },
                }}
                className="categories-swiper"
              >
                {activeCategories.map((item, index) => {
                  const icon = item.icon ? `${BASE_URL}/${item.icon}` : emptyCategory;
                  const categoryName = item.category_name;
                  
                  return (
                    <SwiperSlide key={item.id}>
                      <div 
                        onClick={() => handleGoCategory(item.slug)}
                        className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 ease-out transform hover:-translate-y-2 cursor-pointer overflow-hidden h-40"
                        style={{ background: getCategoryGradient(index) }}
                      >
                        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                        <div className="relative z-10 p-4 h-full flex flex-col items-center justify-center text-center">
                          <div className="mb-3 bg-white/20 p-3 rounded-2xl backdrop-blur-sm">
                            <div className="w-12 h-12 mx-auto relative">
                              <img
                                className="w-full h-full object-contain filter drop-shadow-lg"
                                src={icon}
                                alt={categoryName || "Category"}
                                onError={(e) => {
                                  e.target.src = emptyCategory;
                                }}
                              />
                            </div>
                          </div>
                          <MinTitle
                            className="text-white font-semibold text-sm leading-tight drop-shadow-md"
                            text={
                              categoryName?.length > 15
                                ? `${categoryName.substring(0, 15)}...`
                                : categoryName
                            }
                          />
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>

            {/* Desktop Grid View */}
            <div className="hidden lg:block">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                {activeCategories.map((item, index) => {
                  const icon = item.icon ? `${BASE_URL}/${item.icon}` : emptyCategory;
                  const categoryName = item.category_name;
                  
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleGoCategory(item.slug)}
                      className="group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 ease-out transform hover:-translate-y-3 cursor-pointer overflow-hidden h-48"
                      style={{ background: getCategoryGradient(index) }}
                    >
                      {/* Hover effect overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* Content */}
                      <div className="relative z-10 p-6 h-full flex flex-col items-center justify-center text-center">
                        {/* Icon container with glass morphism effect */}
                        <div className="mb-4 bg-white/30 p-4 rounded-2xl backdrop-blur-sm border border-white/20">
                          <div className="w-16 h-16 mx-auto relative">
                            <img
                              className="w-full h-full object-contain filter drop-shadow-lg"
                              src={icon}
                              alt={categoryName || "Category"}
                              onError={(e) => {
                                e.target.src = emptyCategory;
                              }}
                            />
                          </div>
                        </div>
                        
                        {/* Category name */}
                        <MinTitle
                          className="text-white font-bold text-lg leading-tight drop-shadow-lg group-hover:scale-105 transition-transform duration-300"
                          text={
                            categoryName?.length > 20
                              ? `${categoryName.substring(0, 20)}...`
                              : categoryName
                          }
                        />
                        
                        {/* Hover arrow indicator */}
                        <div className="absolute bottom-4 right-4 w-8 h-8 bg-white/30 rounded-full backdrop-blur-sm flex items-center justify-center transform translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* View All Button */}
            <div className="text-center mt-12">
              <button
                onClick={() => navigate('/categories')}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 group"
              >
                View All Categories
                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </Container>

          <style jsx>{`
            .animation-delay-2000 {
              animation-delay: 2s;
            }
          `}</style>
        </div>
      )}
    </>
  );
};

export default Categories;