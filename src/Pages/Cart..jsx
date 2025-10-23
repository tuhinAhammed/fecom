import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleSelectAll } from "../Redux/Slice/cartSlice";
import Container from "../Layout/Container";
import Breadcrumb from "../Layout/Breadcrumb/Breadcrumb";
import MidTitle from "../Layout/Title/MidTitle";
import ExtraMidTitle from "../Layout/Title/ExtraMidTitle";
import LargeTitle from "../Layout/Title/LargeTitle";
import CartCard from "../Components/Cart/CartCard";
import PrimaryButton from "../Layout/Button/PrimaryButton";
import { IoArrowUndo } from "react-icons/io5";
import { RiShoppingBag3Fill } from "react-icons/ri";
import MinTitle from "../Layout/Title/MinTitle";
import { BsCartX } from "react-icons/bs";
import { FaCartShopping } from "react-icons/fa6";
import axios from "axios";
import MinCartCard from "../Components/Cart/MinCartCard";
import { conversion_rate_to_tk, currency_symbol, singleProductApi, toastr_position } from "../Api";
import { Bounce, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    // Currency From Redux
    const [cartItems, setCartItems] = useState([])
    const navigate = useNavigate()
    // Access Redux state
    const cartData = useSelector((state) => (state.cart.cartItems));
    const { selectAll } = useSelector((state) => state.cart);
    useEffect(() => {
        const productFetch = async () => {
            try {
                const responses = await Promise.all(
                    cartData.map(item => axios.get(`${singleProductApi}${item.productId}`))
                );

                const mergedProducts = responses.map((res, i) => ({
                    ...res.data.product, // full product info
                    quantity: cartData[i].quantity,
                    variant: cartData[i].variant || null,
                    selected: cartData[i].selected || false,
                }));

                setCartItems(mergedProducts);
            } catch (err) {
                console.error("Error fetching products:", err);
            }
        };

        productFetch();
    }, [cartData]); // Add dependencies
    const dispatch = useDispatch();

    const selectedItems = cartItems.filter((item) => item.selected);
    const subTotal = selectedItems.reduce(
        (acc, item) => acc + item.
            offer_price * item.quantity,
        0
    );
    const validSubTotal = isNaN(subTotal) ? 0 : subTotal;


    const shippingCost = selectedItems.reduce(
        (total, item) => total + (item?.shippingCost || 0),
        0
    ); // Example

    const handleSelectAll = () => {
        dispatch(toggleSelectAll());
    };

    const total = validSubTotal;

    // Fetch the number of selected cart items from Redux state
    const cartItemCounter = cartItems.filter((item) => item.selected).length;
    const handleCheckout = () => {
        const selectedForCheckout = cartItems.filter((item) => item.selected);
        console.log(selectedForCheckout);
        if (selectedForCheckout.length === 0) {
            toast.warning("Please select at least one item to checkout!", {
                position: `${toastr_position}`,
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
              });
        }
        else{
            navigate("/checkout", { state: { selectedItems: selectedForCheckout } });
        }
    };

    return (
        <div className="py-sectionSm md:py-sectionMd lg:py-sectionLg xl:py-sectionXl bg-secondary">
            <Container>
                <Breadcrumb
                    title="Cart"
                />
                {/* Total items */}
                <div className="flex items-center gap-4 py-3 sm:py-4 md:py-sectionXl">
                    <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={handleSelectAll}
                        className="w-[18px] h-[18px] border-[1px] border-tertiary rounded-[3px] focus:outline-none focus:!ring-0 focus:ring-blue-300 cursor-pointer border-opacity-[0.4]"
                    />
                    <ExtraMidTitle
                        className="font-medium cursor-pointer"
                        text={`Selected Items : (${selectedItems?.length})`}
                    />
                </div>

                {/* Cart Items and Summary */}
                <div className="">
                    {cartItems?.length > 0 ? (
                        <div className="cartCard grid col-span-2 lg:grid-cols-12 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
                            {/* Cart Items */}
                            <div className="col-span-1 lg:col-span-8">
                                <div
                                    className="grid grid-cols-1 gap-2 sm:gap-3 md:gap-4  rounded-xl px-4"
                                    style={{ boxShadow: "0px 0px 10px 0px rgb(0 0 0 / 8%)" }}
                                >
                                    {cartItems.map((item, index) => {
                                        const translatedName = item.name
                                        return (
                                            <CartCard
                                                key={index}
                                                index={index}
                                                productId={item.id}
                                                productImage={`${item.photos[0].file_path}/${item.photos[0].file_name}`}
                                                productName={item.product_name}
                                                productVarient={item.variant} // ✅ pass selected variant
                                                variants={item.variants}
                                                productPrice={item.offer_price}
                                                quantity={item.quantity}
                                                isLastItem={index === cartItems.length - 1}
                                                selected={item.selected}
                                            />
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Cart Summary */}
                            <div className="col-span-1 lg:col-span-4 lg:sticky lg:top-[110px] left-0 lg:h-[450px] ">
                                <div
                                    className="p-4 rounded-xl"
                                    style={{ boxShadow: "0px 0px 5px 0px rgba(0 0 0 / 8%)" }}
                                >
                                    <LargeTitle className="pb-1" text="Cart Summary" />
                                    <div className="w-[50%] bg-borderColor h-[1px] lg:h-[2px]"></div>

                                    {/* Calculate cart summary */}
                                    <div className="py-3 lg:py-4 grid gap-2 md:gap-3 border-b-[1px] border-borderColor">
                                        <div className="flex justify-between">
                                            <MinTitle
                                                text={`Products for checkout:`}
                                            />
                                            <MinTitle
                                                text={selectedItems?.length}
                                            />
                                        </div>
                                        <div className="flex justify-between">
                                            <MinTitle text="Sub Total : " />
                                            <MinTitle
                                                text={`${currency_symbol}${(
                                                    validSubTotal /
                                                    (parseFloat(conversion_rate_to_tk) || 1)
                                                ).toFixed(2)}`}
                                            />
                                        </div>
                                        {/* <div className="flex justify-between">
                                            <MinTitle text={`Shipping Cost: `} />
                                            <MinTitle
                                                text={`${currency_symbol}${(
                                                    shippingCost / (parseFloat(conversion_rate_to_tk) || 1)
                                                ).toFixed(2)}`}
                                            />
                                        </div> */}
                                        {/* <div className="flex justify-between">
                                            <MinTitle text="Tax" />
                                            <MinTitle
                                                text={`${currency_symbol}${(
                                                    tax / (parseFloat(conversion_rate_to_tk) || 1)
                                                ).toFixed(2)}`}
                                            />
                                        </div> */}
                                        {/* <div className="flex justify-between">
                                        <MinTitle text={`Discount: `} />
                                        <MinTitle
                                            text={`${currency_symbol}${(
                                            total / (parseFloat(conversion_rate_to_tk) || 1)
                                            ).toFixed(2)}`}
                                        />
                                        </div> */}
                                    </div>

                                    {/* Checkout Buttons */}
                                    <div className="grid  gap-2 sm:gap-3 md:gap-4 mt-4 md:mt-4">
                                        <div className="flex justify-between">
                                            <MinTitle text="Total" />
                                            <MinTitle
                                                text={`${currency_symbol}${(
                                                    total / (parseFloat(conversion_rate_to_tk) || 1)
                                                ).toFixed(2)}`}
                                            />
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2 sm:gap-3 ">
                                            <div onClick={handleCheckout} className="">
                                                
                                                <PrimaryButton
                                                    className="hover:!text-theme  hover:!bg-transparent active:!bg-static !border-theme active:!text-secondary active:!border-static"
                                                    text="Proceed to Checkout"
                                                // slug="checkout"
                                                />
                                            </div>
                                            <PrimaryButton
                                                className="!bg-transparent hover:!bg-theme !text-theme hover:!text-secondary !border-theme"
                                                text="Continue Shopping"
                                                slug="shop"
                                                icon={<RiShoppingBag3Fill />}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="m-auto text-center py-12">
                            <p className="text-4xl sm:text-5xl md:text-4xl lg:text-6xl text-tertiary text-opacity-[0.2] text-center">
                                <BsCartX className="text-center m-auto" />
                            </p>
                            <MinTitle
                                className="py-3 sm:py-4 md:py-5 text-tertiary"
                                text="Your Cart is Empty!"
                            />

                            <PrimaryButton
                                className="hover:text-theme !text-base hover:bg-transparent w-full sm:w-[60%] md:w-[25%] lg:w-[20%] m-auto !uppercase !text-xs active:text-secondary hover:border-theme active:border-"
                                text="Return To Shop"
                                slug="shop"
                                icon={<FaCartShopping />}
                            />
                        </div>
                    )}
                </div>
            </Container>
        </div>
    );
};

export default Cart;
