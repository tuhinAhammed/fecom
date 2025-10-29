import React, { useEffect, useRef, useState } from "react";
import Breadcrumb from "../Layout/Breadcrumb/Breadcrumb";
import Container from "../Layout/Container";
import { MdOutlinePayment } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { toast, Bounce } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
    removeOrderedItems,
    updateCartSummary,
} from "../Redux/Slice/cartSlice";
import CheckoutCartCard from "../Components/Cart/CheckoutCartCard";
import CouponCodeApplyButton from "../Layout/Button/CouponCodeApplyButton";
import MinTitle from "../Layout/Title/MinTitle";
import ExtraMidTitle from "../Layout/Title/ExtraMidTitle";
import ExtraMinTitle from "../Layout/Title/ExtraMinTitle";
import SubmitButton from "../Layout/Button/SubmitButton";
import { LuShoppingBag } from "react-icons/lu";
import { orderApi, singleProductApi, toastr_position , currency_symbol , conversion_rate_to_tk} from "../Api";
import PaymentGateway from "../Components/Checkout/PaymentGateway";
import CheckoutForm from "../Components/Checkout/CheckoutForm";
import axios from "axios";
import MidTitle from "../Layout/Title/MidTitle";
import OrderSuccess from "../Components/Checkout/OrderSuccess";
const variants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
};
const Checkout = () => {
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [deliveryType, setDeliveryType] = useState("");
    const [shippingCost, setShippingCost] = useState(0);
    const [loading, setLoading] = useState(true);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [couponApplyLoading, setCouponApplyLoading] = useState(false);
    // Access cartItems from Redux store
    const cartData = useSelector((state) => (state.cart.cartItems));
    const [cartItems , setCartItems] = useState([])
    const [products, setProducts] = useState([]);
    const [couponCode, setCouponCode] = useState("");
    const [applyedCoupon, setApplyedCoupon] = useState({});
    const [couponCodeError, setCouponCodeError] = useState("");
    const loginToken = useSelector((state) => state.userData?.data?.token);
    const toastShown = useRef(false); // Prevent multiple toasts
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [billingFormData, setBillingFormData] = useState({
        name: "",
        email: "",
        number: "",
        billingAddress: "",
    })
    const [inputErrors, setInputErrors] = useState({
        name: "",
        email: "",
        number: "",
        billingAddress: "",
    });

    useEffect(() => {
        const productFetch = async () => {
          if (!cartData || cartData.length === 0) return;
      
          try {
            // ✅ Filter only selected items
            const selectedItems = cartData.filter(item => item.selected === true);
      
            if (!cartData || cartData.length === 0) {
                navigate("/shop");
                return;
              }
              if (selectedItems.length === 0) {
                navigate("/shop");
                return;
              }
      
            // ✅ Fetch product details for selected ones only
            const responses = await Promise.all(
              selectedItems.map(item => axios.get(`${singleProductApi}${item.productId}`))
            );
      
            // ✅ Merge API data with local cart info
            const mergedProducts = responses.map((res, i) => ({
              ...res.data.product, // full product info
              quantity: selectedItems[i].quantity,
              variant: selectedItems[i].variant || null,
              selected: selectedItems[i].selected, // keep selection flag
            }));
      
            setProducts(mergedProducts);
            setLoading(false)
          } catch (err) {
            console.error("Error fetching products:", err);
          }
        };
      
        productFetch();
      }, [cartData,navigate]);
      

    // Dalevery Handleler Chnage
    useEffect(() => {
        if (deliveryType === "inside") {
            setShippingCost(60);
        } else if (deliveryType === "outside") {
            setShippingCost(120);
        } else {
            setShippingCost(0);
        }
    }, [deliveryType]);
    // console.log(products);
    const [isLoading, setIsLoading] = useState(true);
    // const demo = useSelector((state) => console.log(state));



    const handleQuantityChange = (index, newQuantity) => {
        if (newQuantity > 0) {
            dispatch(updateCartSummary({ index, quantity: newQuantity }));
        }
    };
    const subTotal = products.reduce(
        (acc, item) => acc + item.offer_price
        * item.quantity,
        0
    );

    const validSubTotal = isNaN(subTotal) ? 0 : subTotal;

    // Calculate discount based on applicable products
    const discount = (() => {
        if (!applyedCoupon?.discount || isNaN(subTotal)) return 0; // No discount applied

        const applicableProductIds = applyedCoupon?.applicable_products || [];

        if (applicableProductIds.length === 0) {
            if (!applyedCoupon?.discount || isNaN(subTotal)) return 0; // No discount applied
            if (applyedCoupon.discount_type === 1) {
                return applyedCoupon.discount; // Fixed discount amount
            } else if (applyedCoupon.discount_type === 2) {
                return (subTotal * applyedCoupon.discount) / 100; // Percentage-based discount
            }
            return 0;
            // return 0; // No applicable products, no discount
        }

        // Filter only applicable products
        const applicableProducts = cartItems.filter((item) =>
            applicableProductIds.includes(item.productId.toString())
        );

        const applicableSubTotal = applicableProducts.reduce(
            (acc, item) => acc + item.productPrice * item.quantity,
            0
        );

        if (applyedCoupon.discount_type === 1) {
            return applyedCoupon.discount; // Fixed discount amount
        } else if (applyedCoupon.discount_type === 2) {
            return (applicableSubTotal * applyedCoupon.discount) / 100; // Percentage discount
        }
        return 0;
    })();


    // Tax Calculated
    const calculateTotalTax = () => {
        const totalTax = products.reduce((acc, item) => {
            // Calculate tax based on product price, item's tax percentage, and quantity
            const itemTax = item.productPrice * (item.tax / 100) * item.quantity;
            return acc + itemTax; // Accumulate tax for all items
        }, 0);

        return totalTax;
    };

    const tax = calculateTotalTax();

    const total = subTotal + shippingCost  - discount;

    // Coupon Code
    const handleCouponCode = (e) => {
        setCouponCode(e.target.value);
    };
    const applyCouponCode = async () => {
        setCouponApplyLoading(true);
        setCouponCodeError(""); // Reset error before validating

        // Validation: Ensure coupon code is entered
        if (!couponCode.trim()) {
            setCouponApplyLoading(false);
            setCouponCodeError("Please enter a valid coupon code.");
            return;
        }

        // Extract product details
        const formattedProducts = products.map((product) => ({
            id: product.productId,
            price: product.productPrice,
            quantity: product.quantity,
        }));

        const data = {
            code: couponCode,
            subtotal: validSubTotal,
            products: formattedProducts,
        };

        try {
            const response = await axios.post(couponApplyOnOrder, data, {
                headers: {
                    Authorization: `Bearer ${loginToken}`,
                },
            });

            console.log("Coupon Applied Successfully:", response);

            // Check if the response is successful
            if (response.status === 200) {
                setApplyedCoupon(response.data);
                setCouponCode("");
                toast.success("Coupon Applied Successfully", {
                    position: `${toastr_position}`,
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
                setCouponCode("");
            } else {
                setCouponCodeError(response.data.message || "Invalid coupon code.");
            }
            setCouponApplyLoading(false);
        } catch (error) {
            console.error("Error applying coupon:", error);
            if (error.response && error.response.data) {
                if (error.response.data.errors) {
                    setCouponCodeError(
                        error.response.data.errors.code?.[0] || "Invalid coupon."
                    );
                } else {
                    setCouponCodeError(
                        error.response.data.message || "Failed to apply coupon."
                    );
                }
            } else {
                setCouponCodeError("An unexpected error occurred. Please try again.");
            }
        } finally {
            setCouponApplyLoading(false);
        }
    };

    // console.log(couponCode);

    // Pameny Gateway

    const handlePlaceOrder = async () => {
        try {
          // Clear previous field errors before new request
          setInputErrors({
            name: "",
            email: "",
            number: "",
            billingAddress: "",
          });
      

      
          // Build formatted product array
          const formattedProducts = products.map((product) => ({
            product_id: product.id || product.productId,
            quantity: product.quantity,
            variants: product.variant || "",
            unit_price: parseFloat(product.offer_price),
            product_name: product.product_name,
            product_photo:
              product.photos?.length > 0
                ? `${product.photos[0].file_path}/${product.photos[0].file_name}`
                : "",
          }));
      
          // Final payload
          const orderPayload = {
            recipient_name: billingFormData.name,
            recipient_phone: billingFormData.number,
            recipient_address: billingFormData.billingAddress,
            city: deliveryType === "inside" ? "Dhaka" : "Outside Dhaka",
            shipping_cost: parseFloat(shippingCost),
            coupon_code: couponCode || null,
            delivery_option: "steadfast",
            products: formattedProducts,
            subtotal: parseFloat(validSubTotal.toFixed(2)),
            vat: parseFloat(tax?.toFixed(2) || 0),
            total: parseFloat(total.toFixed(2)),
          };
      
          console.log("🚀 Final Order Payload:", orderPayload);
      
          const response = await axios.post(orderApi, orderPayload, {
            headers: {
              Authorization: `Bearer ${loginToken}`,
              "Content-Type": "application/json",
            },
          });
      
          console.log("📦 Order API Response:", response);
      
          const { data } = response;
      
          // ✅ Check for backend validation errors (even if HTTP 200)
          if (data.errors || data.status === 400) {
            const errors = data.errors || {};
      
            // Map backend field names to frontend field names
            const mappedErrors = {
              name: errors.recipient_name ? errors.recipient_name[0] : "",
              number: errors.recipient_phone ? errors.recipient_phone[0] : "",
              billingAddress: errors.recipient_address ? errors.recipient_address[0] : "",
            };
      
            // Push validation errors to the CheckoutForm
            setInputErrors((prev) => ({ ...prev, ...mappedErrors }));
      
            // 🔸 ADD: Show toast for required fields
            toast.warning("Please fill the required fields.", {
              position: `${toastr_position}`,
              autoClose: 2500,
              theme: "light",
              transition: Bounce,
            });
      
            console.warn("❌ Validation Errors:", mappedErrors);
            return; // ⛔ Stop execution — no success flow
          }
                // 🔸 ADD: Check if delivery type is selected
                if (!deliveryType) {
                    toast.warning("Please select your delivery area (Inside/Outside Dhaka).", {
                      position: `${toastr_position}`,
                      autoClose: 2500,
                      theme: "light",
                      transition: Bounce,
                    });
                    return; // stop here
                  }
                  if (response.status === 200 || response.status === 201) {
                    toast.success("Order placed successfully!", {
                      position: `${toastr_position}`,
                      autoClose: 2000,
                      theme: "light",
                      transition: Bounce,
                    });
                  
                    const orderedProductIds = formattedProducts.map((p) => p.product_id);
                    dispatch(removeOrderedItems(orderedProductIds));
                    setShowSuccessPopup(true); // ✅ show popup after order success
                    setTimeout(() => {
                        navigate("/shop");
                      }, 10000); // 2s delay to let user see popup
                  } else {
            toast.error(response.data.message || "Order failed. Try again.", {
              position: `${toastr_position}`,
              autoClose: 2500,
            });
          }
        } catch (error) {
          console.error("❌ Order placement error:", error);
      
          const errors = error.response?.data?.errors || {};
          if (Object.keys(errors).length > 0) {
            // ✅ Convert backend errors to your inputErrors structure
            const mappedErrors = {
              name: errors.recipient_name ? errors.recipient_name[0] : "",
              number: errors.recipient_phone ? errors.recipient_phone[0] : "",
              billingAddress: errors.recipient_address ? errors.recipient_address[0] : "",
            };
            setInputErrors((prev) => ({ ...prev, ...mappedErrors }));
      
            // 🔸 ADD: Show toast for required fields (from catch block too)
            toast.warning("Please fill the required fields.", {
              position: `${toastr_position}`,
              autoClose: 2500,
              theme: "light",
              transition: Bounce,
            });
          } else {
            const message =
              error.response?.data?.message ||
              "An unexpected error occurred while placing your order.";
      
            toast.error(message, {
              position: `${toastr_position}`,
              autoClose: 3000,
              theme: "light",
              transition: Bounce,
            });
          }
        }
      };
      
      
      
      
      



    return (
        <div>
            <div className="py-sectionSm md:py-sectionMd lg:py-sectionLg xl:py-sectionXl bg-secondary ">
                <Container>
                    <Breadcrumb
                        title="Checkout"
                    />
                    {/* Order Success */}
                    <OrderSuccess show={showSuccessPopup} onClose={() => setShowSuccessPopup(false)} />

                    <div className="lg:grid lg:grid-cols-12 items-start justify-center pt-[15px] sm:pt-sectionSm lg:pt-sectionSm relative gap-6">
                        <div className="col-span-7 lg:sticky lg:top-32 lg:left-0">
                            <div className=" ">
                                <CheckoutForm
                                    billingFormData={billingFormData}
                                    setBillingFormData={setBillingFormData}
                                    inputErrors={inputErrors}
                                    setInputErrors={setInputErrors}
                                    onDeliveryTypeChange={(type) => {
                                        setDeliveryType(type);
                                        setShippingCost(type === "inside" ? 60 : 120);
                                    }}
                                />
                            </div>
                        </div>
                        <div className="col-span-5 bg-secondary py-[20px] sm:py-sectionSm lg:py-sectionSm">
                            {/* Order Summary */}
                            <div
                                className="  bg-secondary overflow-hidden rounded-md  relative border-b-[1px] border-theme border-opacity-[0.4]"
                                style={{
                                    boxShadow: "0px 0px 25px  rgba(0,0,0,0.20)",
                                }}
                            >
                                <div className="">
                                    <div className="flex items-center gap-2 py-4 bg-theme bg-opacity-[0.18] px-4  ">
                                        <LuShoppingBag />
                                        <ExtraMidTitle
                                            className="!font-semibold"
                                            text="Order Summary"
                                        />
                                    </div>
                                </div>
                                {/* Products */}
                                {products?.length > 0 ? (
                                    <div className="grid grid-cols-1 items-center py-6 px-4">
                                        {products.map((item, index) => {
                                            console.log(item);
                                            return (
                                                <CheckoutCartCard
                                                key={index}
                                                index={index}
                                                productId={item.id}
                                                productImage={
                                                  item?.photos?.length > 0
                                                    && `${item.photos[0].file_path}/${item.photos[0].file_name}`
                                                }                  
                                                productName={item.product_name}
                                                productVarient={item.variant} // ✅ pass selected variant
                                                variants={item.variants}
                                                productPrice={item.offer_price}
                                                quantity={item.quantity}
                                                isLastItem={index === products.length - 1}
                                              />
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <ExtraMinTitle
                                        className="text-center text-tertiary py-6"
                                        text="No Product Selected Yet"
                                    />
                                )}
                                {/* Coupon Apply */}
                                {/* <div className="pt-4 px-2 md:px-4 ">
                                    <CouponCodeApplyButton
                                        onClick={applyCouponCode}
                                        onChange={handleCouponCode}
                                        couponCode={couponCode} // Pass the couponCode state
                                        couponApplyLoading={couponApplyLoading}
                                    />
                                    {couponCodeError && (
                                        <p className="text-red-500 text-xs pt-[2px]">
                                            {couponCodeError}
                                        </p>
                                    )}
                                </div> */}
                                {/* Ammount Summary */}
                                <div className="py-4 px-2 md:px-4 ">
                                    {/* Calculate cart summary */}
                                    <div className="py-3 lg:py-4 grid gap-2 md:gap-3 border-b-[1px] border-borderColor">
                                        <div className="flex justify-between">
                                            <MidTitle
                                                text="Products For Checkout"
                                            />
                                            <MidTitle text={products?.length} />
                                        </div>
                                        <div className="flex justify-between">
                                            <MidTitle
                                                text="Sub Total"
                                            />
                                            <MidTitle
                                                text={`${currency_symbol}${(
                                                    validSubTotal /
                                                    (parseFloat(conversion_rate_to_tk) || 1)
                                                ).toFixed(2)}`}
                                            />
                                        </div>
                                        <div className="flex justify-between">
                                            <MidTitle
                                                text="Shipping Cost"
                                            />
                                            <MidTitle
                                                text={`${currency_symbol}${(
                                                    shippingCost /
                                                    (parseFloat(conversion_rate_to_tk) || 1)
                                                ).toFixed(2)}`}
                                            />
                                        </div>
                                        {/* Tax */}
                                        {/* <div className="flex justify-between">
                                            <MidTitle
                                                text="Vat"
                                            />
                                            <MidTitle
                                                text={`${currency_symbol}${(
                                                    tax / (parseFloat(conversion_rate_to_tk) || 1)
                                                ).toFixed(2)}`}
                                            />
                                        </div> */}
                                        {/* <div className="flex justify-between">
                                            <MidTitle
                                                text="Discount"
                                            />
                                            <MidTitle
                                                text={`${currency_symbol}${(
                                                    discount / (parseFloat(conversion_rate_to_tk) || 1)
                                                ).toFixed(2)}`}
                                            />
                                        </div> */}
                                    </div>

                                    {/* Checkout Buttons */}
                                    <div className="flex justify-between gap-2 sm:gap-3 md:gap-4 pb-2 mt-4 md:mt-4">
                                        <MidTitle
                                            text="Total"
                                        />
                                        <MidTitle
                                            text={`${currency_symbol}${(
                                                total / (parseFloat(conversion_rate_to_tk) || 1)
                                            ).toFixed(2)}`}
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* Payment Method */}
                            <div
                                className="lg:pb-sectionSm  bg-[#F9F9F9] rounded-md relative mt-6 border-b border-theme border-opacity-[0.3] overflow-hidden"
                                style={{
                                    boxShadow: "0px 0px 25px  rgba(0,0,0,0.20)",
                                }}
                            >
                                <div className="flex items-center gap-2 py-4 bg-theme bg-opacity-[0.18] px-4  ">
                                    <MdOutlinePayment />
                                    <ExtraMidTitle
                                        className="!font-semibold"
                                        text="Select Payment Method"
                                    />
                                </div>
                                {/* Paymeny Gategay */}
                                <PaymentGateway
                                    loading={loading}
                                    paymentMethods={paymentMethods}
                                    selectedPayment={selectedPayment}
                                    setSelectedPayment={setSelectedPayment} // Ensure this is included
                                />
                            </div>
                            {/* Confirm Payment */}
                            <div onClick={handlePlaceOrder} className="pt-4">
                                <SubmitButton
                                    className="w-full md:mt-4"
                                    onClick={handlePlaceOrder}
                                    type="submit"
                                    loadingTime="2000"
                                    text="Place Order"
                                    disabled={!selectedPayment}
                                    icon={<LuShoppingBag />}
                                />
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default Checkout;
