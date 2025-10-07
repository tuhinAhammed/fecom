import React, { useState, useEffect } from "react";
import { IoSearch, IoClose } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";


const HeaderSearch = ({ className }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [placeholder, setPlaceholder] = useState("Search For Products..");
  const navigate = useNavigate();
  const location = useLocation();

  



  // Typing effect for placeholders
  useEffect(() => {
    let currentIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 150;
    const delayBetweenLines = 1500;
    const currentText = "a"
    const typeEffect = () => {

      if (isDeleting) {
        charIndex--;
        if (charIndex < 0) {
          isDeleting = false;

        }
      } else {
        charIndex++;
        if (charIndex === currentText.length) {
          isDeleting = true;
          setTimeout(typeEffect, delayBetweenLines);
          return;
        }
      }
      setPlaceholder(currentText.substring(0, charIndex));
      setTimeout(typeEffect, typingSpeed);
    };
    typeEffect();

    // Clean up
    return () => {
      setSearchQuery(""); // Reset the search query on unmount
    };
  }, []);

  // Clear searchQuery if the current route is not /search or a sub-route of /search
  useEffect(() => {
    if (!location.pathname.startsWith("/search")) {
      setSearchQuery("");
    }
  }, [location.pathname]);

  const clearSearch = () => {
    setSearchQuery("");
    navigate("/search", { state: { query: "" } }); // Redirect to search with an empty query
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Navigate with the new query
    navigate(`/search/${query}`, { state: { query } });
  };

  return (
    <div className="rounded-full relative">
      <input
        type="input"
        onChange={handleSearch}
        value={searchQuery}
        placeholder="Search For Products.."
        className="search-input px-6 py-[6px] sm:py-[6px] md:py-[8px] lg:py-[10px] border-[1px] border-theme  focus-visible:border-theme !ring-0 outline-none text-tertiary w-full text-sm rounded-md"
      />
      <div className="absolute right-6 top-1/2 transform -translate-y-1/2 text-tertiary text-base cursor-pointer">
        {searchQuery === "" ? <IoSearch /> : <IoClose onClick={clearSearch} />}
      </div>
    </div>
  );
};

export default HeaderSearch;
