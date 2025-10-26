import React, { useRef, useState } from "react";
import LargeTitle from "../Layout/Title/LargeTitle";
import Line from "../Layout/LineShape/Line";
import MinTitle from "../Layout/Title/MinTitle";
import MidTitle from "../Layout/Title/MidTitle";
import { MdKeyboardArrowDown } from "react-icons/md";
import Container from "../Layout/Container";
import ExtraLargeTitle from "../Layout/Title/ExtraLargeTitle";

export const faqData = [
  {
    Question: "What is Object-Fashion?",
    Answer:
      "Object-Fashion is an online fashion store offering the latest trends in clothing, accessories, and lifestyle products. We aim to provide quality fashion at affordable prices with a seamless shopping experience.",
  },
  {
    Question: "Do you offer worldwide shipping?",
    Answer:
      "Yes, we provide worldwide shipping. Shipping costs and delivery times may vary based on your location and the shipping method you choose at checkout.",
  },
  {
    Question: "How can I track my order?",
    Answer:
      "Once your order is shipped, you’ll receive an email or SMS with a tracking link so you can monitor your delivery in real time.",
  },
  {
    Question: "What payment methods do you accept?",
    Answer:
      "We accept a variety of payment methods including credit/debit cards, mobile payments, and other secure payment gateways available in your region.",
  },
  {
    Question: "Can I return or exchange an item?",
    Answer:
      "Yes, you can request a return or exchange within 7 days of receiving your order, provided the item is unused, unwashed, and in its original packaging. Please refer to our Return Policy for full details.",
  },
  {
    Question: "Are my personal details safe with Object-Fashion?",
    Answer:
      "Absolutely. We take your privacy seriously and use advanced encryption and security measures to protect your data. You can read more in our Privacy Policy.",
  },
  {
    Question: "How often do you add new collections?",
    Answer:
      "We update our store frequently with fresh, trendy collections to keep you ahead of the fashion curve. Stay tuned to our website or subscribe to our newsletter for updates.",
  },
  {
    Question: "How can I contact Object-Fashion support?",
    Answer:
      "You can reach our support team anytime at support@objectfashion.com or through the Contact page on our website. We’re always happy to help!",
  },
];


const Faqs = () => {
  const [faqOpen, setFaqOpen] = useState(0); // Default to the first FAQ open
  const contentRefs = useRef([]);

  const handleFaq = (index) => {
    setFaqOpen(faqOpen === index ? null : index);
  };

  return (
    <div className="py-sectionSm md:py-sectionSm lg:py-sectionLSm">
      <Container>
        <div className="grid md:grid-cols-5 gap-x-24 gap-y-12 items-start relative">
          <div className="col-span-2 sticky top-48">
            <ExtraLargeTitle text="FAQ" />
            <LargeTitle
              className="pt-1 md:pt-4 lg:pt-6"
              text="Frequently Asked Questions"
            />
            <Line />
            <MinTitle
              className="py-4 sm:py-4 md:py-6 lg:py-8"
              text="At Object-Fashion, we blend creativity and technology to craft stylish, high-quality fashion experiences that inspire confidence and comfort."
            />

            <MinTitle
              className=""
              text="Didn’t find what you were looking for? We’re here to help!"
            />

            <a
              href="mailto:support@objectfashion.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MinTitle className="text-theme" text="support@objectfashion.com" />
            </a>
          </div>
          <div className="col-span-3">
            <div className="question">
              {faqData.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleFaq(index)}
                  className="bg-theme bg-opacity-[0.1] mb-2 md:mb-3 py-2 md:py-3 lg:py-4 rounded-md cursor-pointer"
                >
                  {/* FAQ Question */}
                  <div className="flex items-center justify-between px-4">
                    <MidTitle
                      text={item.Question}
                      className={`${faqOpen === index ? "!text-theme" : "text-primary"
                        }`}
                    />
                    <span
                      className={`text-lg md:text-xl lg:text-3xl text-primary transform transition-transform duration-300 ${faqOpen === index ? "rotate-180" : "rotate-0"
                        }`}
                    >
                      <MdKeyboardArrowDown className="" />
                    </span>
                  </div>

                  {/* FAQ Answer with Dynamic Height Transition */}
                  <div
                    ref={(el) => (contentRefs.current[index] = el)}
                    style={{
                      height:
                        faqOpen === index
                          ? `${contentRefs.current[index]?.scrollHeight}px`
                          : "0px",
                    }}
                    className="overflow-hidden transition-all duration-500 cursor-text"
                  >
                    <MinTitle
                      className="mt-4 pt-4 px-4 border-t-2 border-primary border-opacity-[0.1]"
                      text={item.Answer}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Faqs;
