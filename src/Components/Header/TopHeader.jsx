import React from 'react'
import Container from '../Layout/Container'
import MinTitle from '../Layout/Title/MinTitle'
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa'

const TopHeader = () => {
  return (
    <div className='py-2 hidden md:block bg-theme bg-opacity-[0.2]'>
        <Container>
            <div className="flex items-center justify-between  ">
                <MinTitle  className=" md:text-[12px] font-medium" text="HOW TO ORDER"/>
                <div className="flex gap-24">
                <MinTitle className=" md:text-[12px] font-medium" text="Store Locator"/>
                <div className="flex gap-4 items-center">
                    <p className="text-base text-primary opacity-[0.4]"><FaFacebookF /></p>
                    <p className="text-base text-primary opacity-[0.4]"><FaTwitter /></p>
                    <p className="text-base text-primary opacity-[0.4]"><FaInstagram /></p>
                </div>
                </div>
            </div>
        </Container>
    </div>
  )
}

export default TopHeader