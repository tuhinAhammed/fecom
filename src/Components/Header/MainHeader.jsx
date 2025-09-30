
import React from 'react'
import Container from '../Layout/Container'
import sitelogo from "../../assets/Header/logo.png"
import { NavLink } from 'react-router-dom'
import HeaderSearch from '../Layout/SearchInput/HeaderSearch'
import { LuShoppingCart } from 'react-icons/lu'
import { MdOutlineAccountCircle } from 'react-icons/md'
import { FaRegHeart } from 'react-icons/fa'
import { VscAccount } from 'react-icons/vsc'
const MainHeader = () => {
    return (
        <div className='py-2'>
            <Container>
                <div className="flex items-center justify-between">
                    <NavLink to="/" className="">
                        <img
                            src={sitelogo}
                            alt="Logo"
                            className="w-[80px] sm:w-[90px] md:w-[140px]  lg:w-[180px] "
                        />
                    </NavLink>
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
                                <div className="  text-2xl"><LuShoppingCart /></div>
                                <div className="  text-2xl"><FaRegHeart /></div>
                                <div className="text-2xl"><VscAccount /></div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default MainHeader