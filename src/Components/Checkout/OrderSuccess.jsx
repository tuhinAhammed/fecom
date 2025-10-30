import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BiCheckCircle, BiX } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import PrimaryButton from "../../Layout/Button/PrimaryButton";
import BuyNowButton from "../../Layout/Button/BuyNowButton";
import { FaCartShopping } from "react-icons/fa6";

const OrderSuccess = ({ show, onClose }) => {
    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose} // click outside to close
                >
                    <motion.div
                        onClick={(e) => e.stopPropagation()} // prevent background click
                        className="relative bg-white rounded-2xl shadow-xl p-8 text-center max-w-lg mx-auto"
                        initial={{ scale: 0.8, opacity: 0, y: 40 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.8, opacity: 0, y: 40 }}
                        transition={{ duration: 0.3 }}
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition"
                        >
                            <BiX className="w-6 h-6" />
                        </button>

                        <BiCheckCircle className="w-14 h-14 text-green-500 mx-auto mb-3" />
                        <h2 className="text-xl font-semibold text-gray-800 mb-1">
                            Your order has been placed successfully!
                        </h2>
                        <p className="text-gray-600 mb-6 text-sm">
                            Thank you for shopping with us. You’ll receive confirmation soon.
                        </p>

                        <div className="flex flex-col gap-2">
                            <PrimaryButton
                                className="hover:text-theme rounded-md !text-base hover:bg-transparent w-full font-medium m-auto  active:text-secondary hover:border-theme active:border-"
                                text="Continue Shopping"
                                slug="shop"
                                icon={<FaCartShopping />} />
                            <BuyNowButton
                                className="px-1 sm:px-[2px] md:px-5 py-[4px] sm:py-[6px] md:py-[6px] lg:py-3  rounded-md !text-base hover:bg-primary w-full font-medium m-auto"
                                text="Trac Order"
                                slug="shop"
                                icon={<FaCartShopping />} />

                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};


export default OrderSuccess;
