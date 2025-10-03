import React, { useState } from 'react'
import Container from '../Layout/Container'
import sitelogo from "../../assets/Header/logo.png"
import { NavLink } from 'react-router-dom'
import HeaderSearch from '../Layout/SearchInput/HeaderSearch'
import { LuShoppingCart } from 'react-icons/lu'
import { FaRegHeart } from 'react-icons/fa'
import { VscAccount } from 'react-icons/vsc'
import HeaderOffCanvas from '../Layout/OffCanvas/HeaderOffCanvas'
import AccountContent from './AccountContent'

// Example components for each drawer
const CartContent = () => <p>Your cart items will appear here.</p>
const WishlistContent = () => <p>Your wishlist items will appear here.</p>

const MainHeader = () => {
  const [openDrawer, setOpenDrawer] = useState(null) 
  // values: "cart", "wishlist", "account", null

  const handleClose = () => setOpenDrawer(null)

  return (
    <div className='z-[8] py-2 sticky top-0 w-full bg-secondary'>
      <Container>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <NavLink to="/" className="">
            <img
              src={sitelogo}
              alt="Logo"
              className="w-[80px] sm:w-[90px] md:w-[140px] lg:w-[180px]"
            />
          </NavLink>

          {/* Search + Nav + Icons */}
          <div className="grid grid-cols-12 gap-16 items-center">
            <div className="col-span-5"><HeaderSearch /></div>

            <div className="col-span-5">
              <div className="flex items-center gap-6">
                <NavLink to="/shop">Shop</NavLink>
                <NavLink to="/shop">On Sale</NavLink>
                <NavLink to="/about">About Us</NavLink>
                <NavLink to="/contact">Contact</NavLink>
              </div>
            </div>

            <div className="col-span-2 ">
              <div className="flex items-center gap-4">
                <div className="text-2xl cursor-pointer" onClick={() => setOpenDrawer("cart")}>
                  <LuShoppingCart />
                </div>
                <div className="text-2xl cursor-pointer" onClick={() => setOpenDrawer("wishlist")}>
                  <FaRegHeart />
                </div>
                <div className="text-2xl cursor-pointer" onClick={() => setOpenDrawer("account")}>
                  <VscAccount />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* ✅ Different OffCanvas for each */}
      <HeaderOffCanvas isOpen={openDrawer === "cart"} onClose={handleClose} title="Cart" width="w-[40%]">
        <CartContent />
      </HeaderOffCanvas>

      <HeaderOffCanvas isOpen={openDrawer === "wishlist"} onClose={handleClose} title="Wishlist" width="w-[30%]">
        <WishlistContent />
      </HeaderOffCanvas>

      <HeaderOffCanvas isOpen={openDrawer === "account"} onClose={handleClose} title="Account" width="w-[35%]">
        <AccountContent />
      </HeaderOffCanvas>
    </div>
  )
}

export default MainHeader
