import React, { useEffect, useState } from 'react'
import Container from '../../Layout/Container'
import sitelogo from "../../assets/Header/logo.png"
import { NavLink, useNavigate } from 'react-router-dom'
import HeaderSearch from '../../Layout/SearchInput/HeaderSearch'
import { LuInfo, LuShoppingCart } from 'react-icons/lu'
import { FaRegHeart } from 'react-icons/fa'
import { VscAccount, VscThreeBars } from 'react-icons/vsc'
import HeaderOffCanvas from '../../Layout/OffCanvas/HeaderOffCanvas'
import AccountContent from './AccountContent'
import { useSelector } from 'react-redux'
import CartTotal from '../Cart/CartTotal'
import { AiOutlineHome, AiOutlineShop } from 'react-icons/ai'
import MinTitle from '../../Layout/Title/MinTitle'
import MidTitle from '../../Layout/Title/MidTitle'
import { BsShopWindow, BsStars } from 'react-icons/bs'
import { PiShootingStar, PiShootingStarBold, PiStorefront } from 'react-icons/pi'
import { IoCallOutline } from 'react-icons/io5'
import { GoHome } from 'react-icons/go'
import { CiShop } from 'react-icons/ci'
import { HiOutlineShoppingBag } from 'react-icons/hi'
import { FiShoppingBag } from 'react-icons/fi'
import { TiShoppingBag } from 'react-icons/ti'
import { MdOutlineShoppingBag, MdOutlineStorefront } from 'react-icons/md'
import { RiStore2Line } from 'react-icons/ri'
import Categories from '../Home/Categories'

// Example components for each drawer
const MobileMenuContent = () => (
  <div className="p-4">
    <div className="flex flex-col space-y-4">
      <NavLink className="flex items-center gap-2 text-primary hover:text-theme duration-100" to="/">
        <GoHome className='text-xl ' />
        <MidTitle className="!font-normal !text-base" text="Home" />
      </NavLink>
      <NavLink className="flex items-center gap-2 text-primary hover:text-theme duration-100" to="/shop">
        <PiStorefront className='text-xl ' />
        <MidTitle className="!font-normal !text-base" text="Shop" />
      </NavLink>
      <NavLink className="flex items-center gap-2 text-primary hover:text-theme duration-100" to="/new-arrivals">
        <PiShootingStar className='text-xl ' />
        <MidTitle className="!font-normal !text-base" text="New Arrivals" />
      </NavLink>
      <NavLink className="flex items-center gap-2 text-primary hover:text-theme duration-100" to="/about-us">
        <LuInfo className='text-xl ' />
        <MidTitle className="!font-normal !text-base" text="About Us" />
      </NavLink>
      <NavLink className="flex items-center gap-2 text-primary hover:text-theme duration-100" to="/contact">
        <IoCallOutline className='text-xl ' />
        <MidTitle className="!font-normal !text-base" text="Contact" />
      </NavLink>
    </div>
  </div>
)

const MainHeader = () => {
  const [openDrawer, setOpenDrawer] = useState(null)
  const [cartItemCount, setCartItemCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const { token, user } = useSelector((state) => state?.userData)
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const navigate = useNavigate()
  // Cart Count Show
  useEffect(() => {
    if (Array.isArray(cartItems , wishlistItems)) {
      const selectedItemsCount = cartItems?.length;
      const selectedWishlistCount = wishlistItems?.length;
      setCartItemCount(selectedItemsCount);
      setWishlistCount(selectedWishlistCount);
    } else {
      setCartItemCount(0); // Fallback when cartItems is not an array
    }
  }, [cartItems , wishlistItems]);

  const handleClose = () => setOpenDrawer(null)
  // Handle Go Wishlist page
  const handleGoWishlist = () => {
    navigate("/wishlist")
  }
  return (
    <>
      <div className='z-[8] py-0 fixed top-0 left-0 right-0 md:sticky md:top-0 w-full bg-secondary shadow-sm'>
        <Container>
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="">
              <NavLink to="/" className="">
                <img
                  src={sitelogo}
                  alt="Logo"
                  className="w-[80px] sm:w-[90px] md:w-[220px] lg:w-[220px] py-4"
                />
              </NavLink>
            </div>

            {/* Desktop Navigation - Hidden on mobile */}
            <div className="hidden md:block">
              <div className="">
                <div className="">
                  <div className="flex items-center gap-12 ">
                    <NavLink className="flex items-center gap-2 text-primary hover:text-theme duration-100" to="/">
                      <GoHome className='text-xl ' />
                      <MidTitle className="!font-normal !text-base" text="Home" />
                    </NavLink>
                    <NavLink className="flex items-center gap-2 text-primary hover:text-theme duration-100" to="/shop">
                      <PiStorefront className='text-xl ' />
                      <MidTitle className="!font-normal !text-base" text="Shop" />
                    </NavLink>
                    <NavLink className="flex items-center gap-2 text-primary hover:text-theme duration-100" to="/new-arrivals">
                      <PiShootingStar className='text-xl ' />
                      <MidTitle className="!font-normal !text-base" text="New Arrivals" />
                    </NavLink>
                    <NavLink className="flex items-center gap-2 text-primary hover:text-theme duration-100" to="/about-us">
                      <LuInfo className='text-xl ' />
                      <MidTitle className="!font-normal !text-base" text="About Us" />
                    </NavLink>
                    <NavLink className="flex items-center gap-2 text-primary hover:text-theme duration-100" to="/contact">
                      <IoCallOutline className='text-xl ' />
                      <MidTitle className="!font-normal !text-base" text="Contact" />
                    </NavLink>
                    {/* <NavLink to="/shop">On Sale</NavLink>
                  <NavLink to="/about">About Us</NavLink>
                  <NavLink to="/contact">Contact</NavLink> */}
                  </div>
                </div>


              </div>
            </div>
            <div className="hidden md:block">
              <div className="flex items-center gap-10">
              <div onClick={handleGoWishlist} className="relative text-2xl cursor-pointer" >
                  <FaRegHeart />
                  {wishlistCount > 0 && (
                    <div className="absolute -top-3 -right-3 bg-theme text-secondary text-[12px] rounded-full w-[21px] h-[21px] flex items-center justify-center">
                      {wishlistCount}
                    </div>
                  )}
                </div>
                <div className="relative text-2xl cursor-pointer" onClick={() => setOpenDrawer("cart")}>
                  <LuShoppingCart />
                  {cartItemCount > 0 && (
                    <div className="absolute -top-3 -right-3 bg-theme text-secondary text-[12px] rounded-full w-[21px] h-[21px] flex items-center justify-center">
                      {cartItemCount}
                    </div>
                  )}
                </div>
                <div className="text-2xl cursor-pointer" onClick={() => setOpenDrawer("account")}>
                  <VscAccount />
                </div>
              </div>
            </div>
            {/* Mobile Navigation - Visible only on small devices */}
            <div className="flex items-center gap-4 md:hidden">
              {/* Wishlist Icon */}
              <div className="relative text-xl cursor-pointer" >
                <FaRegHeart />
                {cartItemCount > 0 && (
                  <div className="absolute -top-2 -right-2 bg-theme text-secondary text-[10px] rounded-full w-[18px] h-[18px] flex items-center justify-center">
                    {cartItemCount}
                  </div>
                )}
              </div>

              {/* Cart Icon */}
              <div className="relative text-xl cursor-pointer" onClick={() => setOpenDrawer("cart")}>
                <LuShoppingCart />
                {cartItemCount > 0 && (
                  <div className="absolute -top-2 -right-2 bg-theme text-secondary text-[10px] rounded-full w-[18px] h-[18px] flex items-center justify-center">
                    {cartItemCount}
                  </div>
                )}
              </div>

              {/* Account Icon */}
              <div className="text-xl cursor-pointer" onClick={() => setOpenDrawer("account")}>
                <VscAccount />
              </div>

              {/* Three-dot Menu for Mobile Navigation */}
              <div className="text-xl cursor-pointer" onClick={() => setOpenDrawer("mobileMenu")}>
                <VscThreeBars />
              </div>
            </div>
          </div>
        </Container>

        {/* OffCanvas Components */}
        <div className="">
          <HeaderOffCanvas isOpen={openDrawer === "cart"} onClose={handleClose} title={`Shopping Cart (${cartItemCount} Items)`} width="w-full md:w-[35%]">
            <CartTotal onClose={handleClose} />
          </HeaderOffCanvas>


          <HeaderOffCanvas isOpen={openDrawer === "account"} onClose={handleClose} title={token ? "Dashboard" : "Account"} width="w-full md:w-[35%]">
            <AccountContent />
          </HeaderOffCanvas>
        </div>

        {/* Mobile Menu OffCanvas */}
        <HeaderOffCanvas isOpen={openDrawer === "mobileMenu"} onClose={handleClose} title="Menu" width="w-full md:w-[35%]">
          <MobileMenuContent />
        </HeaderOffCanvas>
        <Categories />
      </div>
    </>
  )
}

export default MainHeader