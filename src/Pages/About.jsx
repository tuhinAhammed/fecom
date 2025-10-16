import React from 'react'
import Breadcrumb from '../Layout/Breadcrumb/Breadcrumb'
import Container from '../Layout/Container'
import { title } from 'framer-motion/client'
import LargeTitle from '../Layout/Title/LargeTitle';
import MinTitle from '../Layout/Title/MinTitle';
import { FiTarget } from 'react-icons/fi';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import MidTitle from '../Layout/Title/MidTitle';
import storyImg from "../assets/About/storyImage.png"
import ExtraLargeTitle from '../Layout/Title/ExtraLargeTitle';
const missionAndVissionData = [
  {
    icon: <FiTarget />, // you can replace with an actual icon component
    title: "Our Mission",
    desc: "To empower individuality through fashion by offering stylish, high-quality clothing that helps people express their true selves with confidence.",
  },
  {
    icon: <MdOutlineRemoveRedEye />,
    title: "Our Vision",
    desc: "To become a global leader in sustainable fashion, inspiring a new generation to embrace creativity, inclusivity, and ethical style.",
  },
];
const valuesData = [
  { icon: "🌱", title: "Sustainability", desc: "Eco-friendly fabrics and ethical production." },
  { icon: "🎨", title: "Creativity", desc: "Unique designs that inspire self-expression." },
  { icon: "🤝", title: "Integrity", desc: "Honest practices and quality craftsmanship." },
];

const teamData = [
  { name: "Tuhin Ahammed", role: "Founder & Designer", img: storyImg },
  { name: "Jane Doe", role: "Creative Director", img: storyImg },
  { name: "Tuhin Ahammed", role: "Founder & Designer", img: storyImg },
  { name: "Jane Doe", role: "Creative Director", img: storyImg },
];


const About = () => {

  return (
    <div className='py-sectionSm md:py-sectionMd lg:py-sectionLg xl:py-sectionXl bg-secondary'>
      <Container>
        <Breadcrumb
          title="About Us"
          slug="About Us"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center pt-sectionLg">
          {
            missionAndVissionData.map((item, index) => (

              <div
                key={index}
                className="card p-8 bg-secondary rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-md shadow-md border-t-[1px] border-theme bg-theme bg-opacity-[0.11] border-opacity-[0.6]"
                // style={{
                //   boxShadow:
                //     "0 10px 20px rgba(0, 0, 0, 0.15), 0 -10px 20px rgba(0, 0, 0, 0.05)",
                // }}
              >
                <p className="text-4xl text-primary">{item.icon}</p>
                <LargeTitle className="py-6 !font-semibold" text={item.title} />
                <MinTitle text={item.desc} />
              </div>

            ))
          }
        </div>
        {/* Story */}
        <div className="grid md:grid-cols-2 gap-12 items-center pt-sectionMd md:pt-24">
          {/* Image Side */}
          <div className="relative">
            <img
              src={storyImg}
              alt="Our Story"
              className="w-full aspect-[4/6] max-h-[500px] rounded-3xl shadow-[0_10px_25px_rgba(0,0,0,0.15)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.2)] transition-all duration-500 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-3xl"></div>
          </div>

          {/* Text Side */}
          <div>
            <LargeTitle text="Our Story" className=" !font-semibold text-primary mb-4" />
            <MinTitle
              text="Where passion meets style."
              className="text-lg text-gray-500 font-medium mb-6"
            />
            <p className="text-base leading-relaxed text-gray-600">
              Founded with a vision to redefine fashion, our journey began with a simple idea —
              to make every individual feel confident and elegant through timeless design and
              superior craftsmanship.
            </p>
            <p className="text-base leading-relaxed text-gray-600 mt-4">
              From local ateliers to global runways, we celebrate authenticity, creativity,
              and sustainable elegance. Each collection tells a story of art, culture, and
              innovation — curated for the modern trendsetter.
            </p>
            {/* Counter */}
            <div className="grid grid-cols-3 gap-4 items-center pt-10">
              <div className="">
                <ExtraLargeTitle className="!text-2xl md:!text-3xl lg:!text-4xl font-semibold" text="200+" />
                <MinTitle className="text-tertiary" text="Greatfull Branch" />
              </div>
              <div className="">
                <ExtraLargeTitle className="!text-2xl md:!text-3xl lg:!text-4xl font-semibold" text="2000+" />
                <MinTitle className="text-tertiary" text="High-Quality Products" />
              </div>
              <div className="">
                <ExtraLargeTitle className="!text-2xl md:!text-3xl lg:!text-4xl font-semibold" text="30,000+" />
                <MinTitle className="text-tertiary" text="Happy Customers" />
              </div>
            </div>
          </div>
        </div>
        {/* Values */}
        <section className="py-20">
          <Container>
            <LargeTitle text="Our Values" className="font-semibold text-center mb-12" />
            <div className="grid md:grid-cols-3 gap-8">
              {valuesData.map((item, index) => (
                <div
                  key={index}
                  className="p-6 bg-gray-50 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 text-center"
                >
                  <p className="text-3xl mb-4">{item.icon}</p>
                  <h3 className="font-semibold text-xl mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>
        <div className="space-y-6">
          <LargeTitle
            text="F-ecom"
            className="text-4xl font-bold text-primary mb-4"
          />
          <MinTitle
            text={`F-Ecom – short for "Fashion E-commerce" – is your ultimate destination for modern and stylish fashion. 
              
Founded with the vision to empower creators and artisans, our mission is to bring high-quality, trendy, and sustainable fashion to customers globally. Every product is crafted or curated with care to ensure elegance, style, and durability.`}
            className="text-gray-700 text-lg leading-relaxed"
          />
          <MinTitle
            text={`From humble beginnings as a small online marketplace, F-Ecom has grown into a recognized fashion platform offering hundreds of collections across apparel, accessories, and lifestyle products. We support independent designers and local artisans, giving them a platform to reach a wider audience while ensuring fair trade and ethical production practices.`}
            className="text-gray-700 text-lg leading-relaxed"
          />
          <MinTitle
            text={`Our supply chain is designed for quality and transparency. Every piece undergoes strict quality control to ensure that our customers receive nothing but the best. Beyond selling fashion, we aim to create a community that celebrates creativity, culture, and sustainable fashion choices.`}
            className="text-gray-700 text-lg leading-relaxed"
          />
          <MinTitle
            text={`With a growing presence both nationally and internationally, F-Ecom continues to broaden the market for contemporary fashion while preserving the values of craftsmanship, authenticity, and ethical responsibility. We are proud to bring style, quality, and opportunity together for everyone involved in our journey.`}
            className="text-gray-700 text-lg leading-relaxed"
          />
        </div>
      </Container>
    </div>
  )
}

export default About