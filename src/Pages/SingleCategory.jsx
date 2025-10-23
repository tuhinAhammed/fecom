import React, { useEffect, useState } from "react";
import Container from "../Layout/Container";
import Breadcrumb from "../Layout/Breadcrumb/Breadcrumb";
import MidTitle from "../Layout/Title/MidTitle";
import MinTitle from "../Layout/Title/MinTitle";
import LargeTitle from "../Layout/Title/LargeTitle";
import { IoMdGrid } from "react-icons/io";
import { PiGridNine } from "react-icons/pi";
import { CiGrid2H } from "react-icons/ci";
import { IoHome, IoMenu } from "react-icons/io5";
import axios from "axios";
import PrimaryProductCard from "../Layout/ProductCard/PrimaryProductCard"
import LoadingButton from "../Layout/Button/LoadingButton";
import SecondaryProductCard from "../Layout/ProductCard/SecondaryProductCard";
import ExtraMidTitle from "../Layout/Title/ExtraMidTitle";
import PriceRangeFilter from "../Components/Shop/PriceRangeFilter/PriceRangeFilter";
import { FaChevronDown, FaChevronRight, FaCircleNotch, FaFilter } from "react-icons/fa";
import { SlArrowDown, SlArrowRight } from "react-icons/sl";
import { useSelector } from "react-redux";
// import { shopPageApi } from "../Api/Api";
import productNotFound from "../assets/Product/productNotFound.png";
import PrimaryButton from "../Layout/Button/PrimaryButton";
import { useLocation } from "react-router-dom";
// import ScrollToTop from "../Utils/ScrollToTop";
import { GrPowerReset } from "react-icons/gr";
import { allProductApi, categoryListApi, currency_symbol } from "../Api";
import { LuLoaderCircle } from "react-icons/lu";
const SingleCategory = () => {
  const [shopData, setShopData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [layoutView, setLayoutView] = useState("grid");
  const [resetPrices, setResetPrices] = useState(false); // New state for price reset
  const [visibleItems, setVisibleItems] = useState(12);
  const [loading, setLoading] = useState(true);
  const [minAmount, setMinAmount] = useState(null);
  const [maxAmount, setMaxAmount] = useState(null);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [pageTranslation, setPageTranslation] = useState({});
  // Set initial sort option to empty string so the default label appears.
  // off canvas for mobile
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  // commonData Fetching
  const currency = useSelector((state) => state.currency?.selectedCurrency);
  const location = useLocation();
  const categorySlugName = (location.state.categorySlug);
  // Initialize sortOption with location.state.sortBy if available
  const [sortOption, setSortOption] = useState(
    () => location.state?.sortBy || ""
  );
  const selectedLanguage = useSelector(
    (state) => state.language?.selectedLanguage?.lang_code
  );
  const loginToken = useSelector(
    (state) => state.userData.token
  );
  useEffect(() => {
    if (location.state?.sortBy) {
      setSortOption(location.state.sortBy);
    }
  }, [location.state]);

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  // fetch all Products
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const productResponse = await axios.get(allProductApi, {});
        const categoryResponse = await axios.get(categoryListApi,
          {
            headers: {
              Authorization: `Bearer ${loginToken}`,
            },
          }
        );
        console.log(categoryResponse);
        console.log(productResponse);
        setShopData(productResponse?.data?.data) || [];
        setCategories(categoryResponse?.data?.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleProductLayout = (layout) => {
    setLayoutView(layout);
  };

  const handleLoadMore = () => {
    setVisibleItems((prev) => prev + 9);
  };

  // Handle filtering products based on selected categories, price range, and brands
  const filteredProducts = shopData
    ?.filter((product) => {
        console.log(product);
        const matchesCategory = Array.isArray(categorySlugName)
        ? categorySlugName.includes(product.category_id)
        : product.category_id === categorySlugName; 

      const matchesPrice =
        (minAmount === null || product.offer_price >= minAmount) &&
        (maxAmount === null || product.offer_price <= maxAmount);


      // 🔥 Ensure filtering applies to all conditions

      return matchesCategory & matchesPrice
      // ... rest of your conditions
    })
    .sort((a, b) => {
      if (sortOption === "latestProduct") {
        return b.id - a.id; // Sort by ID descending (latest first)
      } else if (sortOption === "lowToHigh") {
        return a.offer_price - b.offer_price; // Sort by price ascending
      } else if (sortOption === "highToLow") {
        return b.offer_price - a.offer_price; // Sort by price descending
      } else if (sortOption === "aToZ") {
        return a.product_name.localeCompare(b.product_name); // Sort by name ascending
      } else if (sortOption === "zToA") {
        return b.product_name.localeCompare(a.product_name); // Sort by name descending
      }
      return 0; // Default order
    });

  // Handling the category selection and deselection

  // Price Range Based Filtering
  const handlePriceChange = (min, max) => {
    // Ensure values are numbers
    setMinAmount(parseFloat(min));
    setMaxAmount(parseFloat(max));
  };

  // Handle sorting change; note we now use an empty string as the initial state so that "Sort By" appears first.
  // Reset Filtering
  // Reset The  Filtering
  const resetFiltering = () => {
    setMinAmount(null);
    setMaxAmount(null);
    setSortOption("");
    setVisibleItems(9);
    setResetPrices(true); // Trigger price range reset
    document.documentElement.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  // Reset prices after filtering
  useEffect(() => {
    if (resetPrices) {
      const timer = setTimeout(() => {
        setResetPrices(false); // Reset the flag
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [resetPrices]);

  // Check if any filters are applied
  const isFilteringApplied = () => {
    return (
      minAmount !== null ||
      maxAmount !== null ||
      sortOption !== ""
    );
  };

  // CategoryTranslate
  const getTranslatedCategoryName = (category, defaultText) => {
    // Determine which translation array to use based on category level
    const translations = category.translations || [];

    // Find the translation for the selected language
    const translation = translations.find(
      (item) => item.lang_code === selectedLanguage
    );

    // Use translated text if available, otherwise use default
    const displayText = translation?.name || defaultText;
    // Apply length truncation (same as your original logic)
    return displayText?.length > 25
      ? `${displayText.slice(0, 25)}...`
      : displayText;
  };

  // Page Static Translation
  const getTranslation = (key, defaultText) => {
    if (!pageTranslation || !selectedLanguage) return defaultText;

    const translationArray = pageTranslation[key];
    if (!translationArray) return defaultText;

    const translation = translationArray.find(
      (item) => item.lang_code === selectedLanguage
    );
    return translation ? translation.value : defaultText;
  };
  console.log(shopData);
  console.log(categories);
  console.log(filteredProducts);
  return (
    <div className="pb-sectionSm md:pb-sectionMd lg:pb-sectionLg xl:pb-sectionLg  bg-secondary pt-4">
      <Container>
        {/* <Breadcrumb title={getTranslation("Shop", "Shop")} /> */}
        <div className=" items-start justify-center ">
          {filteredProducts?.length > 0 && (
            <div
              onClick={toggleVisibility}
              className="hidden top-1/2 left-0 p-3 bg-secondary rounded-sm text-theme z-[20] "
              style={{ boxShadow: "0px 0px 5px 0px rgba(0 0 0 / 10%)" }}
            >
              <FaFilter />
            </div>
          )}

          <div className=" md:ml-8 w-full relative mt-12 md:mt-0">
          <div className="text-center md:hidden">
                <LargeTitle className="font-medium" text={categorySlugName}/>
              </div>
            {/* Select and Grid Type */}
            <div className="grid grid-cols-2 md:grid-cols-3 w-full py-2 items-center  gap-4 sm:gap-8 md:justify-between  z-[6] md:sticky md:top-[85px] bg-secondary">
              <div className="flex gap-2">
                <select
                  className="pt-[8px] pr-[20px] pb-[8px] pl-[8px] text-base rounded-md text-primary cursor-pointer border-borderColor focus:outline-none focus:ring-0"
                  onChange={handleSortChange}
                  value={sortOption} // ✅ Now properly updates the selected value
                >
                  <option value="" disabled>
                    {getTranslation("Sort_By", "Sort By")}
                  </option>

                  {/* <option value="trendingProduct">Trending Product</option> */}
                  <option value="lowToHigh">
                    {getTranslation("Low_To_High_Price", "Low to High Price")}
                  </option>
                  <option value="highToLow">
                    {getTranslation("High_To_Low_Price", "High to Low Price")}
                  </option>
                  <option value="aToZ">
                    {getTranslation("A_to_Z_Order", "A to Z Order")}
                  </option>
                  <option value="zToA">
                    {getTranslation("Z_to_A_Order", "Z to A Order")}
                  </option>
                </select>
                {isFilteringApplied() && (
                  <div onClick={resetFiltering} className="relative ">
                    <div className="flex items-center justify-center p-[9px] bg-secondary bg-opacity-[0.8] text-primary x border-[1px] border-borderColor rounded-md cursor-pointer hover:bg-theme hover:text-secondary active:bg-secondary active:text-theme duration-200 group/inner">
                      <GrPowerReset className="text-xl" />
                      {/* Tooltip on icon hover */}

                      <span className="absolute  left-full  mr-2 bg-none t text-primary text-xs px-3 py-2 py-[5px] rounded-md  transition-opacity duration-300  hidden lg:group-hover/inner:block w-[96px]">
                        {getTranslation("Reset_Filters", "Reset Filters")}
                      </span>
                    </div>
                  </div>
                )}
              </div>
              <div className="text-center hidden md:block">
                <MidTitle className="font-medium" text={categorySlugName}/>
              </div>
              <div className="flex justify-end gap-2 text-xl ">
                <p
                  onClick={() => handleProductLayout("grid")}
                  className={`p-2 border-[1px] border-theme rounded-md hover:bg-theme hover:text-secondary cursor-pointer duration-200 ${layoutView === "grid"
                      ? "bg-theme text-secondary"
                      : "bg-transparent text-theme"
                    }`}
                >
                  <PiGridNine />
                </p>
                <p
                  onClick={() => handleProductLayout("list")}
                  className={`p-2 border-[1px] border-theme rounded-md hover:bg-theme hover:text-secondary cursor-pointer duration-200 ${layoutView === "list"
                      ? "bg-theme text-secondary"
                      : "bg-transparent text-theme"
                    }`}
                >
                  <IoMenu />
                </p>
              </div>
            </div>
            {/* All Products */}
            {loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-5 pt-5">
                {[...Array(visibleItems)].map((_, index) => (
                  <PrimaryProductCard key={index} loading={loading} />
                ))}
              </div>
            ) : filteredProducts?.length === 0 ? ( // *** ADDED: Show message if no products are found ***
              <div className="pt-6 md:pt-8 lg:pt-12 text-center font-medium">
                <img
                  className="w-[40px] sm:w-[50px] md:w-[70px] lg:w-[80px] m-auto mt-12 opacity-[0.6]"
                  src={productNotFound}
                  alt=""
                />
                <MinTitle
                  className="text-tertiary font-normal text-opacity-[0.6] pt-2"
                  text={getTranslation("No_product_were_Found_Matching_Your_Selection.", "No products were found matching your selection.")}
                />
                <PrimaryButton
                  className="mt-4 hover:text-theme !text-base hover:bg-transparent m-auto !uppercase !text-xs active:text-secondary hover:border-theme active:!border-transparent  !w-[60%] sm:!w-[30%] md:!w-[30%] lg:!w-[25%]"
                  text={getTranslation("Return_To_Home", "Return To Home")}
                  slug="/home"
                  icon={<IoHome />}
                />
              </div>
            ) : (
              <div className="">
                {layoutView === "grid" ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-5 pt-5">
                    {filteredProducts
                      ?.slice(0, visibleItems)
                      .map((item, index) => {
                        return (
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
                        );
                      })}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-5 pt-5">
                    {filteredProducts
                      ?.slice(0, visibleItems)
                      ?.map((item, index) => {
                        return (
                          <SecondaryProductCard
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
                        );
                      })}
                  </div>
                )}
              </div>
            )}

            {filteredProducts?.length > visibleItems && (
              <div className="mt-4 text-center mx-auto">
                <LoadingButton
                  className="inline-block"
                  loadingTime="1000"
                  text={getTranslation("Load_More", "Load More")}
                  onClick={handleLoadMore}
                  icon={<LuLoaderCircle />}
                />
              </div>
            )}
          </div>
        </div>

        <div className="">
          {/* Backdrop */}
          {isVisible && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={toggleVisibility}
            ></div>
          )}

          {/* Offcanvas */}
          <div
            className={`fixed top-0 left-0 h-full w-80 sm:w-80 md:w-80 bg-white shadow-lg transform transition-transform duration-300 z-50 ${isVisible ? "translate-x-0" : "-translate-x-full"
              }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">
                {" "}
                {getTranslation("Filter_Options", "Filter Options")}
              </h2>
              <button
                onClick={toggleVisibility}
                className="text-gray-500 hover:text-gray-800"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="h-full overflow-y-scroll">
              <div
                className="py-[20px] sm:py-sectionSm lg:py-sectionSm px-2 sm:px-4 md:px-6 lg:px-6 bg-secondary rounded-md relative "
                style={{ boxShadow: "0px 0px 5px 0px rgba(0 0 0 / 10%)" }}
              >

                {/* Price Range */}
                <div className="pt-3 ">
                  <ExtraMidTitle
                    text={getTranslation("Price_Range", "Price Range")}
                    className="!font-medium !text-[20px] !opacity-[0.9]"
                  />

                  <div className="">
                    {typeof window !== "undefined" &&
                      window.innerWidth > 992 && (
                        <PriceRangeFilter
                          reset={resetPrices} // Pass the reset state
                          currencyData=""
                          onPriceChange={handlePriceChange}
                        />
                      )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SingleCategory;