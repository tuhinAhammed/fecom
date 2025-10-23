import React from "react";
import Container from "../Layout/Container";
// import errorImg from "../assets/404/404.png";
import LargeTitle from "../Layout/Title/LargeTitle";
import MinTitle from "../Layout/Title/MinTitle";
import PrimaryButton from "../Layout/Button/PrimaryButton";
import { IoHome } from "react-icons/io5";
import { PiSmileySadThin } from "react-icons/pi";
import { CiShop } from "react-icons/ci";
import { FaShop } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import ExtraLargeTitle from "../Layout/Title/ExtraLargeTitle";
const Error = () => {
    const navigate = useNavigate()
    const handleGoHome = () => {
        navigate("/")
    }
  return (
    <div className="py-sectionSm md:py-sectionMd lg:py-sectionLg xl:py-sectionLg bg-secondary">
      <Container>
        <div className="h-dvw py-24">
        <div className="text-8xl flex items-center justify-center text-tertiary  pb-4">
        <PiSmileySadThin />
        </div>
        <LargeTitle
          className="text-primary font-bold text-center font-secondary"
          text="404. Page not found."
        />
        {/* <ExtraLargeTitle text="Opps! Page not found."/> */}
        <MinTitle
          className="md:w-[50%] m-auto py-2 md:py-3 lg:py-6 text-center text-tertiary"
          text="The page you are looking for does not exist. How you got here is a mystery. But you can click the button below to go back to the homepage."
        />
        <div className="w-full md:w-[50%] m-auto grid grid-cols-1 md:grid-cols-2 gap-4 justify-center">
          {/* <PrimaryButton className="inline-block  text-center"
            text="Back To Homepage"/> */}
          <div onClick={handleGoHome} className="">
          <PrimaryButton
            className=" hover:text-theme !text-base hover:bg-transparent  !uppercase !text-xs active:text-secondary hover:border-theme active:!border-transparent  "
            text="Back To Home"
            slug=""
            icon={<IoHome />}
          />
          </div>
          <PrimaryButton
            className=" hover:text-theme !text-base hover:bg-transparent  !uppercase !text-xs active:text-secondary hover:border-theme active:!border-transparent  "
            text="Shop"
            slug="shop"
            icon={<FaShop />}
          />
        </div>
        </div>
      </Container>
    </div>
  );
};

export default Error;
