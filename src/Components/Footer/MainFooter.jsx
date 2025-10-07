import React from "react";
import logo from "../../assets/Header/logo.png"
import site_footer_logo from "../../assets/Header/logo.png"
import MidTitle from "../../Layout/Title/MidTitle";
import {
    FaArrowRightLong,
    FaInstagram,
    FaLocationDot,
    FaXTwitter,
    FaYoutube,
} from "react-icons/fa6";
import { IoIosCall, IoMdMail } from "react-icons/io";
import { MdAddCall } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import MinTitle from "../../Layout/Title/MinTitle";
import { AiOutlinePinterest, AiOutlineTikTok } from "react-icons/ai";
import { ImPinterest } from "react-icons/im";
import { PiThreadsLogoFill } from "react-icons/pi";
import { TfiPinterest } from "react-icons/tfi";
import { BsThreads } from "react-icons/bs";
import Container from "../../Layout/Container";
import ExtraMinTitle from "../../Layout/Title/ExtraMinTitle";
// import ExtraMidTitle from "../Layout/Title/ExtraMidTitle";
import bkash from "../../assets/Footer/bkash.jpg";
import dutch from "../../assets/Footer/dutch.jpg";
import mastercard from "../../assets/Footer/mastercard.png";
import nogod from "../../assets/Footer/nogod.png";
import pp from "../../assets/Footer/PP.png";
import stripe from "../../assets/Footer/stripe.png";
import visa from "../../assets/Footer/visa.png";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
// import Swal from 'sweetalert2/dist/sweetalert2.js'
// import "sweetalert2/src/sweetalert2.scss";
const short_bio = "We have clothes that suits your style and which you’re proud to wear. From women to men."
const phone = "+8801955345678"
const developed_by = "Tuhin Ahammed"
const developed_by_url = "https://github.com/tuhinAhammed"
export const contactData = [
    {
        sub: "Location",
        title: "#01, Road-09, Block-B, Bosila, Dhaka , Bangladesh",
        icon: <FaLocationDot />,
        link: "https://www.google.com/maps/search/23.741658,+90.350006?coh=219680&utm_campaign=tt-rcs&entry=tts&g_ep=EgoyMDI0MTExMi4wIPu8ASoASAFQAw%3D%3D",
    },
    {
        sub: "Mail",
        title: "hello@optilius.com",
        icon: <IoMdMail />,
        link: "mailto:demo@domain.com",
        // <a rel="noopener noreferrer" href="mailto:demo@domain.com" target="_blank"><p class="text-xs md:text-md lg:text-base text-primary text-theme">hello@optilius.com</p></a>
    },
    {
        sub: "Number",
        title: "+8801963965350",
        icon: <MdAddCall />,
        link: "tel:+8801963965350",
    },
];
const SocialContactData = [
    {
        title: "Linkedin",
        icon: <FaLinkedinIn />,
        link: "https://bd.linkedin.com/company/optilius",
    },
    {
        title: "Facebook",
        icon: <FaFacebookF />,
        link: "https://www.facebook.com/optilius",
    },
    {
        title: "Twitter",
        icon: <FaXTwitter />,
        link: "https://x.com/optiliusHQ",
    },

    {
        title: "Youtube",
        icon: <FaYoutube />,
        link: "https://www.youtube.com/@optilius",
    },
    {
        title: "Instagram",
        icon: <FaInstagram />,
        link: "https://www.instagram.com/optilius/",
    },
    {
        title: "Pinterest",
        icon: <TfiPinterest />,
        link: "https://www.pinterest.com/optiliushq/",
    },
    {
        title: "Threads",
        icon: <BsThreads />,
        link: "https://www.threads.net/@optilius",
    },
    {
        title: "Tiktok",
        icon: <AiOutlineTikTok />,
        link: "https://www.tiktok.com/@optilius",
    },
];
export const infomationLink = [
    {
        name: "Blogs",
        link: "/blogs",
    },
    {
        name: "About Us",
        link: "about-us",
    },

    {
        name: "Privacy Policy",
        link: "/privacy-policy",
    },
    {
        name: "Term Condition",
        link: "/term-condition",
    },
];

export const quickLink = [
    // {
    //   name: "Store Location",
    //   link: "/services/webDesigAndDev",
    // },
    {
        name: "Order Tracking",
        link: "/order-track",
    },
    {
        name: "FAQs",
        link: "/faqs",
    },
    {
        name: "Refund policy",
        link: "/refund-policy",
    },
    {
        name: "Return policy",
        link: "/return-policy",
    },
    {
        name: "Support",
        link: "/support",
    },
];

export const paymentMethod = [
    {
        image: bkash,
    },
    {
        image: dutch,
    },
    {
        image: mastercard,
    },
    {
        image: nogod,
    },
    {
        image: pp,
    },
    {
        image: stripe,
    },
    {
        image: visa,
    },
];

const Footer = () => {
    //   const footerData = useSelector((state) => state?.commonData?.siteCommonData);
    //   const {
    //     site_footer_logo,
    //     short_bio,
    //     phone,
    //     social_links,
    //     payment_methods,
    //     app_links,
    //     developed_by,
    //     developed_by_url,
    //   } = footerData;
    const social_links = [
        {
            name: "facebook",
            id: 1,
            link: "#"
        }
    ]


    const handleAppLinkClick = (link) => {
        if (!link) {
            Swal.fire({
                title: "Comming Soon",
                text: "The app link is currently unavailable. Please check back later.",
                icon: "warning",
                showCloseButton: true,
                showCancelButton: true,
                cancelButtonText: "Close",
                showConfirmButton: false, // This removes the "OK" button
            });
        } else {
            window.open(link, "_blank");
        }
    };








    return (
        <>
            <div className="pt-8 pb-6   !z-[6] relative">
                <Container>
                    <div className="grid justify-between grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4  2xl:grid-cols-4 gap-4 sm:gap-8 md:gap-10 lg:gap-12">
                        <div className="col-span-1 ">
                            <NavLink to="/" className="logo flex gap-x-2 items-center">
                                <img
                                    src={site_footer_logo}
                                    alt=""
                                    className="w-[80px] md:w-[90px] lg:w-[130px]"
                                />
                            </NavLink>
                            <MinTitle
                                className="text-primary py-4"
                                text={
                                    short_bio
                                        ? `${short_bio}`
                                        : "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id nemo quae laborum. Totam, consequuntur assumenda."
                                }
                            />

                                {SocialContactData?.length > 0 && (
                                    <div className="">
                                        {/* <MidTitle
                                            text="Follow Us"
                                            className="inline-block  !text-secondary font-bold pt-6"
                                        /> */}

                                        <div className="flex flex-wrap items-center gap-1 sm:gap-2 md:gap-3 lg:gap-2 mt-3 sm:mt-2 lg:mt-4 ">
                                            {SocialContactData.map((item, index) => (
                                                <a
                                                    key={index}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    href={item.link}
                                                    className="text-sm md:text-lg lg:text-base p-1 md:p-1 lg:p-2 bg-transparent hover:bg-theme hover:text-secondary  text-primary hover:translate-y-[-10%] duration-300 rounded-md !cursor-pointer shadow-lg"
                                                >
                                                    {item.icon}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                )}

                        </div>
                        <div className="col-span-3">
                            <div className=" grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 md:gap-8text-xs md: lg:gap-12">
                                <div className="lg:col-span-1">
                                    <MidTitle
                                        text="INFORMATION"
                                        className="inline-block  !text-primary font-normal font-secondary uppercase"
                                    />
                                    <ul className="mt-2 md:mt-5 ">
                                        {infomationLink.map((item, index) => (
                                            <li key={index} className="pb-0 md:pb-2">
                                                <NavLink to={item.link} className="relative group">
                                                    <MinTitle
                                                        className="text-primary text-md duration-300 inline-block group-hover:text-primary font-normal opacity-[0.7]"
                                                        text={item.name}
                                                    />
                                                    {/* After pseudo-element equivalent */}
                                                    <span className="absolute left-0 top-full h-[2px] w-0 bg-white duration-300 group-hover:w-full"></span>
                                                </NavLink>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="lg:col-span-1">
                                    <MidTitle
                                        text="HELP"
                                        className="inline-block  !text-primary font-normal font-secondary uppercase"
                                    />
                                    <ul className="mt-2 md:mt-5 ">
                                        {quickLink.map((item, index) => (
                                            <li key={index} className="pb-0 md:pb-2">
                                                <NavLink to={item.link} className="relative group">
                                                    <MinTitle
                                                        className="text-primary text-md duration-300 inline-block group-hover:text-primary font-normal opacity-[0.7]"
                                                        text={item.name}
                                                    />
                                                    {/* After pseudo-element equivalent */}
                                                    <span className="absolute left-0 top-full h-[2px] w-0 bg-white duration-300 group-hover:w-full"></span>
                                                </NavLink>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="lg:col-span-1">
                                    <MidTitle
                                        text="FAQ"
                                        className="inline-block  !text-primary font-normal font-secondary uppercase"
                                    />
                                    <ul className="mt-2 md:mt-5 ">
                                        {quickLink.map((item, index) => (
                                            <li key={index} className="pb-0 md:pb-2">
                                                <NavLink to={item.link} className="relative group">
                                                    <MinTitle
                                                        className="text-primary text-md duration-300 inline-block group-hover:text-primary font-normal opacity-[0.7]"
                                                        text={item.name}
                                                    />
                                                    {/* After pseudo-element equivalent */}
                                                    <span className="absolute left-0 top-full h-[2px] w-0 bg-white duration-300 group-hover:w-full"></span>
                                                </NavLink>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="lg:col-span-1">
                                    <MidTitle
                                        text="RESOURCES"
                                        className="inline-block  !text-primary font-normal font-secondary uppercase"
                                    />
                                    <ul className="mt-2 md:mt-5 ">
                                        {quickLink.map((item, index) => (
                                            <li key={index} className="pb-0 md:pb-2">
                                                <NavLink to={item.link} className="relative group">
                                                    <MinTitle
                                                        className="text-primary text-md duration-300 inline-block group-hover:text-primary font-normal opacity-[0.7]"
                                                        text={item.name}
                                                    />
                                                    {/* After pseudo-element equivalent */}
                                                    <span className="absolute left-0 top-full h-[2px] w-0 bg-white duration-300 group-hover:w-full"></span>
                                                </NavLink>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
            {/* Bottom Footer */}
            <div className=" py-5 bg-transparent border-t-[1px] border-tertiary pb-[70px] md:pb-[75px] lg:pb-5 ">
                <Container>
                    <p className="text-xs sm:text-xm md:text-sm  font-medium text-center text-primary">
                        © 2025{" "}
                        <a
                            className="font-bold"
                            target="_blank"
                            href={
                                developed_by_url
                                    ? `${developed_by_url}`
                                    : "#github.com/tuhinAhammed"
                            }
                        >
                            {developed_by ? developed_by : "Tuhin Ahammed"} .
                        </a>{" "}
                        All Rights Reserved
                    </p>
                </Container>
            </div>
        </>
    );
};

export default Footer;
