import React from "react";
import Container from "../../Layout/Container";
import MidTitle from "../../Layout/Title/MidTitle";
import { FaMapMarkerAlt, FaPhoneAlt, FaClock } from "react-icons/fa";
import LargeTitle from "../../Layout/Title/LargeTitle";

const outletsData = [
  {
    name: "F-Ecom Dhaka",
    address: "123 Fashion Street, Dhaka, Bangladesh",
    phone: "+880 1234 567890",
    hours: "10:00 AM - 9:00 PM",
  },
  {
    name: "F-Ecom Chittagong",
    address: "456 Style Avenue, Chittagong, Bangladesh",
    phone: "+880 9876 543210",
    hours: "10:00 AM - 9:00 PM",
  },
  {
    name: "F-Ecom Sylhet",
    address: "789 Trend Road, Sylhet, Bangladesh",
    phone: "+880 1122 334455",
    hours: "10:00 AM - 9:00 PM",
  },
  {
    name: "F-Ecom Khulna",
    address: "321 Modern Blvd, Khulna, Bangladesh",
    phone: "+880 6677 889900",
    hours: "10:00 AM - 9:00 PM",
  },
];

const Outlet = () => {
  return (
    <section className="py-sectionLg ">
      <Container>
        {/* <LargeTitle text="Our Outlets" className="text-4xl !font-semibold text-center mb-6" /> */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {outletsData.map((outlet, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300  hover:-translate-y-1 border-t-[1px] border-theme"
            >
              <h3 className="text-xl font-semibold mb-4">{outlet.name}</h3>
              <p className="text-gray-600 flex items-center gap-2 gap-2 mb-2">
                <FaMapMarkerAlt /> {outlet.address}
              </p>
              <p className="text-gray-600 flex items-center gap-2 gap-2 mb-2">
                <FaPhoneAlt /> {outlet.phone}
              </p>
              <p className="text-gray-600 flex items-center gap-2 gap-2">
                <FaClock /> {outlet.hours}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Outlet;
