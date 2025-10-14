import React, { useEffect, useState } from 'react'
import Container from '../../Layout/Container'
import sitelogo from "../../assets/Header/logo.png"
import { NavLink } from 'react-router-dom'
import HeaderSearch from '../../Layout/SearchInput/HeaderSearch'
import { LuShoppingCart } from 'react-icons/lu'
import { FaRegHeart } from 'react-icons/fa'
import { VscAccount } from 'react-icons/vsc'
import HeaderOffCanvas from '../../Layout/OffCanvas/HeaderOffCanvas'
import AccountContent from './AccountContent'
import { useSelector } from 'react-redux'
import CartTotal from '../Cart/CartTotal'

// Example components for each drawer
const WishlistContent = () => <p>Your wishlist items will appear here.</p>

const MainHeader = () => {
  const [openDrawer, setOpenDrawer] = useState(null)
  const { token, user } = useSelector((state) => state?.userData)
  const { cartItems } = useSelector((state) => state.cart);
  const [cartItemCount, setCartItemCount] = useState(0);
// Cart Count Show
useEffect(() => {
  if (Array.isArray(cartItems)) {
    const selectedItemsCount = cartItems?.length;
    setCartItemCount(selectedItemsCount);
    console.log(cartItems);
  } else {
    setCartItemCount(0); // Fallback when cartItems is not an array
  }
}, [cartItems]);
  // values: "cart", "wishlist", "account", null

  const handleClose = () => setOpenDrawer(null)

  return (
    <div className='z-[8] py-0 sticky top-0 w-full bg-secondary shadow-md m'>
      <Container>
        <div className="flex items-center justify-between">
          <div className="">

            {/* Logo */}
            <NavLink to="/" className="">
              <img
                src={sitelogo}
                alt="Logo"
                className="w-[80px] sm:w-[90px] md:w-[140px] lg:w-[150px] "
              />
            </NavLink>
          </div>

          {/* Search + Nav + Icons */}
          <div className="">
            <div className="grid grid-cols-7 gap-16 items-center justify-end">
              {/* <div className="col-span-5"><HeaderSearch /></div> */}

              <div className="col-span-5">
                <div className="flex items-center gap-6">
                  <NavLink to="/shop">Shop</NavLink>
                  <NavLink to="/shop">On Sale</NavLink>
                  <NavLink to="/about">About Us</NavLink>
                  <NavLink to="/contact">Contact</NavLink>
                </div>
              </div>

              <div className="col-span-2 ">
                <div className="flex items-center gap-10">

                  <div className="text-2xl cursor-pointer" onClick={() => setOpenDrawer("wishlist")}>
                    <FaRegHeart />
                  </div>
                  <div className="relative text-2xl cursor-pointer" onClick={() => setOpenDrawer("cart")}>
                    <LuShoppingCart />
                    {cartItemCount > 0 && (
                      <div className="absolute -top-3 -right-3 bg-theme text-secondary text-[12px] rounded-full w-[21px] h-[21px] flex items-center justify-center">
                        {cartItemCount} {/* Display the number of selected items */}
                      </div>
                    )}
                  </div>
                  <div className="text-2xl cursor-pointer" onClick={() => setOpenDrawer("account")}>
                    <VscAccount />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* ✅ Different OffCanvas for each */}
      <HeaderOffCanvas isOpen={openDrawer === "cart"} onClose={handleClose} title={`Shopping Cart (${cartItemCount} Items)`} width="w-[35%]">
  <CartTotal onClose={handleClose} />
</HeaderOffCanvas>

      <HeaderOffCanvas isOpen={openDrawer === "wishlist"} onClose={handleClose} title="Wishlist" width="w-[30%]">
        <WishlistContent />
      </HeaderOffCanvas>

      <HeaderOffCanvas isOpen={openDrawer === "account"} onClose={handleClose} title={token ? "Dashboard" : "Account"} width="w-[35%]">
        <AccountContent />
      </HeaderOffCanvas>
    </div>
  )
}

export default MainHeader
