import React, { useState } from 'react'
import Container from '../../Layout/Container'
import ExtraLargeTitle from '../../Layout/Title/ExtraLargeTitle'
import MinTitle from '../../Layout/Title/MinTitle'
import PrimaryButton from '../../Layout/Button/PrimaryButton'
import bannerOne from "../../assets/Banner/bannerOne.png"
import vector from "../../assets/Banner/vector.png"
import subBrand1 from "../../assets/SubBrand/subBrand1.png"
import subBrand2 from "../../assets/SubBrand/subBrand2.png"
import subBrand3 from "../../assets/SubBrand/subBrand3.png"
import subBrand4 from "../../assets/SubBrand/subBrand4.png"
import subBrand5 from "../../assets/SubBrand/subBrand5.png"
const subBrandData = [
    {
        img : subBrand1
    },
    {
        img : subBrand2
    },
    {
        img : subBrand3
    },
    {
        img : subBrand4
    },
    {
        img : subBrand5
    },

]
const Banner = () => {
    return (
        <div>
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-12 items-start gap-24 ">
                    <div className="col-span-1 md:col-span-5 pt-12">
                        <ExtraLargeTitle className="font-black font-secondary" text="Find Clothes That Matches Your Style" />
                        <MinTitle className="text-tertiary font-secondary py-3 sm:py-4 md:py-8" text="Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style." />
                        <PrimaryButton slug="shop" className="w-[50%]" text="Shop Now" />
                        {/* Counter */}
                        <div className="grid grid-cols-3 gap-4 items-center py-10">
                            <div className="">
                                <ExtraLargeTitle className="!text-4xl font-semibold" text="200+" />
                                <MinTitle className="text-tertiary" text="Greatfull Branch" />
                            </div>
                            <div className="">
                                <ExtraLargeTitle className="!text-4xl font-semibold" text="2000+" />
                                <MinTitle className="text-tertiary" text="High-Quality Products" />
                            </div>
                            <div className="">
                                <ExtraLargeTitle className="!text-4xl font-semibold" text="30,000+" />
                                <MinTitle className="text-tertiary" text="Happy Customers" />
                            </div>
                        </div>
                    </div>

                    <div className="col-span-1 md:col-span-7 relative">
                        <img
                            src={bannerOne}
                            alt="Logo"
                            className=" "
                        />
                        <img
                            src={vector}
                            alt="Logo"
                            className="absolute animate-pulse top-[14%] right-[10%]"
                        />
                        <img
                            src={vector}
                            alt="Logo"
                            className="absolute w-[8%] animate-pulse top-[40%] left-[10%]"
                        />
                    </div>
                </div>
            </Container>
            <div className="bg-primary py-10 ">
                <Container>
                <div className="flex justify-between items-center">
                {
                    subBrandData.map((item , index) => (
                        <div className="">
                            <img src={item.img} alt="" />
                        </div>
                    ))
                }
            </div>
                </Container>
            </div>
        </div>
    )
}

export default Banner