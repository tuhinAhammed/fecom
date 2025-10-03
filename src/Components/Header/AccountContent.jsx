import React, { useEffect, useState } from "react";

import PasswordInput from "../Layout/Input/PasswordInput";
import MinTitle from "../Layout/Title/MinTitle";
import { Link, useNavigate } from "react-router-dom";
import SubmitButton from "../Layout/ButtonList/SubmitButton";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import { signInApi, toastr_position } from "../../Api";
// import { api, signInApi } from "../../Api/Api";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   setToken,
//   setUserData,
//   updateCustomerInfo,
// } from "../../Redux/Slices/userSlice";
import { Bounce, toast } from "react-toastify";
import { FaSignInAlt } from "react-icons/fa";
// import { getTranslation } from "../../Utils/Translation/translationUtils";
import UserAuthInput from "../Layout/Input/UserAuthInput";
import { useDispatch } from "react-redux";
const googleValSitekey = "6LesUa8qAAAAAPuU_Aied1IqtR9_8BIQ9EmYasye";
const SigninForm = ({ translations }) => {
    const navigate = useNavigate();
    const [status, setStatus] = useState("");
    const [inputErrors, setInputErrors] = useState({}); // State to track input-specific errors
    //   const dispatch = useDispatch();
    //   const selectedLanguage = useSelector(
    //     (state) => state.language.selectedLanguage
    //   );
    // const { toastr_position } = useSelector(
    //   (state) => state.commonData.siteCommonData
    // );
    const phoneCode = [
        { code: "+7 8", name: "Abkhazia" },
        { code: "+93", name: "Afghanistan" },
        { code: "+54", name: "Argentina" },
    ];
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        phoneNumber: "",
        agreeToPolicy: false,
        phoneCode: phoneCode[0].code,
    });
    const handleChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
        setStatus("");
        setInputErrors({ ...inputErrors, [name]: "" }); // Clear error for this input
    };
    const handleCheckbox = (e) => {
        const { checked } = e.target;
        setFormData({ ...formData, agreeToPolicy: checked });
    };
    const handleSubmit = async () => {
        
        try {
            const response = await axios.post(signInApi, {
                email: formData?.email,
                password: formData?.password,
            });

            console.log(response);
            const { status, message ,  errors } = response.data || {};
            // console.log(status);
            // ✅ Check if API explicitly returns "success"
            if (status == true) {
            console.log(status);
            toast.success(message, {
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
                setStatus(message);
                setInputErrors({});

                    setStatus(message);
                    setInputErrors({});
                    // // Update token only
                    // dispatch(setToken(response?.data?.token));
                    // // Update customer information separately
                    // dispatch(updateCustomerInfo(response?.data?.customer));

                // navigate("/dashboard");
                setFormData({
                    email: "",
                    password: "",
                    phoneNumber: "",
                    agreeToPolicy: false,
                    phoneCode: phoneCode[0].code,
                });


            }
            // ✅ Handle validation errors properly
            else if (status === "failed" || errors) {
                setInputErrors({
                    email: errors?.email ? errors.email[0] : "",
                    password: errors?.password ? errors.password[0] : "",
                });

                setStatus(""); // Ensure MinTitle doesn't interfere

                // ✅ Show a warning toast for validation errors
                toast.warning("Validation failed. Please check your inputs.", {
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
            // ✅ Handle any other API error response
            else {
                setStatus(message || "An error occurred.");

                toast.error(message || "An unexpected error occurred.", {
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
        } catch (error) {
            // console.log(error.response.data.message);

            if (error.response && error.response.data) {
                const { errors } = error.response.data;
                const message = error.response.data.message
                console.log(message);
                setInputErrors({
                    email: errors?.email ? errors.email[0] : "",
                    password: errors?.password ? errors.password[0] : "",
                });

                setStatus(""); // Don't show MinTitle error if toast is handling it

                // ✅ Show a warning toast for API validation errors
                toast.error(
                    message || "Validation failed. Please check your inputs.",
                    {
                        position: `${toastr_position}`,
                        autoClose: 2500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                    }
                );
            } else {
                // ✅ Show a general error toast for network/server issues
                toast.error("An error occurred. Please try again later.", {
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
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSubmit();
        }
    };

    return (
        <div className="px-8">
            <form onSubmit={handleSubmit} autoComplete="on">
                {/* <MinTitle
                    className={`pb-3 text-center font-medium ${status.toLowerCase().includes("success")
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                    text={status} 
                /> */}
                <div className="grid grid-cols-1 gap-3 md:gap-4">
                    <div>
                        <UserAuthInput
                            onChange={(name, value) => handleChange("email", value)}
                            value={formData.email}
                            type="email"
                            placeholder="Email"
                            name="email"
                            id="email"
                            required="true"
                            className=""
                            autoComplete="email"
                        />
                        {inputErrors.email && (
                            <p className="text-red-500 text-xs pt-[2px]">
                                {inputErrors.email}
                            </p>
                        )}
                    </div>
                    <div>
                        <PasswordInput
                            onChange={(name, value) => handleChange("password", value)}
                            value={formData.password}
                            type="password"
                            id="password"
                            placeholder="Password"
                            name="password"
                            required="true"
                            className=""
                            onKeyDown={handleKeyDown}
                            autoComplete="current-password"
                        />
                        {inputErrors.password && (
                            <p className="text-red-500 text-xs pt-[2px]">
                                {inputErrors.password}
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex items-center justify-between gap-2 py-4">
                    <div className="flex items-center gap-2 ">
                        <input
                            type="checkbox"
                            className="w-[14px] lg:w-[16px] h-[14px] lg:h-[16px] border-[1px] border-tertiary rounded-[3px] focus:outline-none focus:!ring-0 focus:ring-blue-300 cursor-pointer border-opacity-[0.4]"
                            checked={formData.agreeToPolicy}
                            onChange={handleCheckbox}
                        />
                        <p className="text-[10px] sm:text-xs md:text-base">
                            Remember me
                        </p>
                    </div>

                    <Link
                        to="/forget-password"
                        className="text-theme text-[10px] sm:text-xs md:text-base"
                    >

                        Forgot Password


                    </Link>
                </div>

                <SubmitButton
                    className="w-full md:mt-4"
                    onClick={handleSubmit}
                    type="submit"
                    loadingTime="2000"
                    text="Sign In"
                    // disabled={!formData.agreeToPolicy}
                    icon={<FaSignInAlt />}
                />
            </form>
        </div>
    );
};

export default SigninForm;
