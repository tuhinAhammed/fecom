import React from "react";
import { Swiper, SwiperSlide } from "swiper/react"; // Swiper components
import { Autoplay, Pagination } from "swiper/modules"; // Swiper modules
import "swiper/css"; // Swiper styles
import "swiper/css/pagination";

import promo1 from "../../assets/Promo/promo1.png";
import promo2 from "../../assets/Promo/promo2.png";
import Container from "../../Layout/Container";
import { Link } from "react-router-dom";
import { api } from "../../Api";
import { useSelector } from "react-redux";
import MinTitle from "../../Layout/Title/MinTitle";
import LargeTitle from "../../Layout/Title/LargeTitle";
import SecondaryButton from "../../Layout/Button/SecondaryButton";

const advertiseData = [
  {
    name: "New Season Styles",
    desc: "Fresh looks for every occasion — discover the trends everyone’s talking about.",
    thumbnail: promo1,
    link: "/shop",
  },
  {
    name: "Exclusive Fashion Deals",
    desc: "Limited-time offers on the latest pieces. Step up your style today.",
    thumbnail: promo2,
    link: "/shop",
  },
  {
    name: "Elevate Your Wardrobe",
    desc: "From casual days to classy nights, find outfits that fit your vibe.",
    thumbnail: promo1,
    link: "/shop",
  },
  {
    name: "Discover Your Style",
    desc: "Uncover your signature look with our handpicked fashion essentials.",
    thumbnail: promo2,
    link: "/shop",
  },
];


const Advertise = () => {
  // const advertiseData = useSelector((state) =>
  //   console.log(state)

  // );

  return (
    <>
      {advertiseData.length > 0 && (
        <div className="py-sectionLg relative">
          {/* <Container> */}
            {/* Swiper with autoplay for small devices and no autoplay for others */}
            <Swiper
              slidesPerView={2}
              spaceBetween={0}
              loop={true}
              pagination={false} // Hide pagination
              autoplay={{
                delay: 3000, // Auto-slide every 3 seconds
                disableOnInteraction: false, // Continue autoplay even after interaction
              }}
              modules={[Autoplay]} // Import only Autoplay
              className="mySwiper"
              breakpoints={{
                0: {
                  slidesPerView: 0,
                  spaceBetween: 2,
                  autoplay: {
                    delay: 3000,
                    disableOnInteraction: true,
                  },
                },
                576: {
                  slidesPerView: 2,
                  spaceBetween: 2,
                },
              }}
            >
              {advertiseData.map((item, index) => {
                // const thumbnail = `${api}/${item.image}`;
                return (
                  <SwiperSlide key={index}>
                    <Link to={item.link}>
                      <div
                        className="relative w-full  overflow-hidden 
             max-h-[120px] sm:max-h-[150px] md:max-h-[450px] 
             aspect-[5/3] bg-gray-200 cursor-pointer 
             group hover:after:opacity-20 after:absolute after:inset-0 
             after:bg-primary after:opacity-0 after:transition-opacity 
             after:duration-300 after:pointer-events-none"
                      >
                        {/* Light background + image */}
                        <img
                          src={item.thumbnail}
                          alt={item.name}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />

                        {/* Overlay content */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-10">
                          <LargeTitle className="text-secondary !font-bold" text={item.name}/>
                          <MinTitle className="py-4 px-36" text={item.desc}/>
                          <SecondaryButton className="!bg-theme hover:!bg-themeDeep !text-secondary mt-1" text="Shop Now"/>
                        </div>

                        {/* Optional subtle overlay tint */}
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300"></div>
                      </div>
                    </Link>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          {/* </Container> */}
        </div>
      )}
    </>
  );
};

export default Advertise;
