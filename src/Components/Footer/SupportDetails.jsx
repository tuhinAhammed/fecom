import React from 'react';
import Container from '../../Layout/Container';
import { GrDeliver, GrSecure } from "react-icons/gr";
import { BiHelpCircle } from "react-icons/bi";
import { BsHandThumbsUp } from "react-icons/bs";
import MidTitle from '../../Layout/Title/MidTitle';
import ExtraMinTitle from '../../Layout/Title/ExtraMinTitle';
// import bgImage from "../../assets/Footer/supportDetails.png";

const supportData = [
  {
    icon: <GrDeliver />,
    title: "Fast Delivery",
    desc: "Quick shipping across the country",
  },
  {
    icon: <GrSecure />,
    title: "Secure Payment",
    desc: "Your data and payments are fully protected",
  },
  {
    icon: <BiHelpCircle />,
    title: "24/7 Support",
    desc: "We're here whenever you need help",
  },
  {
    icon: <BsHandThumbsUp />,
    title: "Premium Quality",
    desc: "Only the best for modern men",
  },
];
const bgImage = "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"; 
const SupportDetails = () => {
  return (
    <div 
      className="py-16 bg-cover bg-center bg-fixed relative"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${bgImage})`
      }}
    >
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {supportData.map((item, index) => (
            <div
              key={index}
              className="text-center group "
            >
              <div className="relative mb-6">
                {/* <div className="absolute inset-0 bg-white rounded-full blur-md group-hover:blur-lg transition-all duration-300 opacity-20 group-hover:opacity-30"></div> */}
                <div className="relative bg-white bg-opacity-10 backdrop-blur-md rounded-full w-20 h-20 flex items-center justify-center mx-auto border border-white border-opacity-20 group-hover:border-opacity-40 transition-all duration-300">
                  <p className="text-white text-2xl group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </p>
                </div>
              </div>
              
              <MidTitle 
                className="font-bold text-white mb-3 group-hover:text-gray-200 transition-colors duration-300" 
                text={item.title} 
              />
              <ExtraMinTitle 
                className="text-gray-300 leading-relaxed" 
                text={item.desc} 
              />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default SupportDetails;