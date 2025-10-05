import React, { useEffect, useState } from "react";
import PasswordInput from "../Layout/Input/PasswordInput";
import LargeTitle from "../Layout/Title/LargeTitle";
import { Link, useNavigate } from "react-router-dom";
import SubmitButton from "../Layout/ButtonList/SubmitButton";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import { signInApi, signUnApi, toastr_position } from "../../Api";
import { Bounce, toast } from "react-toastify";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";
import UserAuthInput from "../Layout/Input/UserAuthInput";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../Redux/Slice/userSlice";
import SecondaryButton from "../Layout/ButtonList/SecondaryButton";
import { FiPlusCircle, FiLogIn } from "react-icons/fi";

const googleValSitekey = "6LesUa8qAAAAAPuU_Aied1IqtR9_8BIQ9EmYasye";

const SigninForm = ({ translations }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [status, setStatus] = useState("");
    const [inputErrors, setInputErrors] = useState({});
    const [isLoginForm, setIsLoginForm] = useState(true); // Toggle between login and registration
    const { token, user } = useSelector((state) => state?.userData)

    const phoneCode = [
        { code: "+7 8", name: "Abkhazia" },
        { code: "+93", name: "Afghanistan" },
        { code: "+54", name: "Argentina" },
    ];

    // Login form data
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
        phoneNumber: "",
        agreeToPolicy: false,
        phoneCode: phoneCode[0].code,
    });

    // Registration form data
    const [registerData, setRegisterData] = useState({
        email: "",
        password: "",
        confirm_password: "",
        name: "",
        phone: "",
        agreeToPolicy: false,
    });

    const handleLoginChange = (name, value) => {
        setLoginData({ ...loginData, [name]: value });
        setStatus("");
        setInputErrors({ ...inputErrors, [name]: "" });
    };

    const handleRegisterChange = (name, value) => {
        setRegisterData({ ...registerData, [name]: value });
        setStatus("");
        setInputErrors({ ...inputErrors, [name]: "" });
    };

    const handleLoginCheckbox = (e) => {
        const { checked } = e.target;
        setLoginData({ ...loginData, agreeToPolicy: checked });
    };

    const handleRegisterCheckbox = (e) => {
        const { checked } = e.target;
        setRegisterData({ ...registerData, agreeToPolicy: checked });
    };

    const handleLoginSubmit = async () => {
        try {
            const response = await axios.post(signInApi, {
                email: loginData?.email,
                password: loginData?.password,
            });

            console.log(response);
            const { status, message, errors } = response.data || {};

            if (status == true) {
                const { token, user } = response.data
                dispatch(setUser({ user, token }))
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

                setLoginData({
                    email: "",
                    password: "",
                    phoneNumber: "",
                    agreeToPolicy: false,
                    phoneCode: phoneCode[0].code,
                });
            }
            else if (status === "failed" || errors) {
                setInputErrors({
                    email: errors?.email ? errors.email[0] : "",
                    password: errors?.password ? errors.password[0] : "",
                });

                setStatus("");

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
            if (error.response && error.response.data) {
                const { errors } = error.response.data;
                const message = error.response.data.message
                console.log(message);
                setInputErrors({
                    email: errors?.email ? errors.email[0] : "",
                    password: errors?.password ? errors.password[0] : "",
                });

                setStatus("");

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

    const handleRegisterSubmit = async () => {
        try {
            // Basic validation
            if (registerData.password !== registerData.confirm_password) {
                toast.error("Passwords do not match.", {
                    position: `${toastr_position}`,
                    autoClose: 2500,
                    theme: "light",
                    transition: Bounce,
                });
                return;
            }

            const response = await axios.post(signUnApi , {
                email: registerData.email,
                password: registerData.password,
                confirm_password: registerData.confirm_password,
                name: registerData.name,
                phone: registerData.phone,
                role_id: 2
            });

            // console.log(response);
            const { status, message, errors } = response.data || {};
            console.log(response);
            if (status === true || status === 200) {
                console.log(response);
                toast.success(message || "Registration successful!", {
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
                const registerLoginresponse = await axios.post(signInApi, {
                    email: registerData?.email,
                    password: registerData?.password,
                });
                console.log(registerLoginresponse);
                const { token, user } = registerLoginresponse.data
                dispatch(setUser({ user, token }))
                setStatus(message || "Registration successful!");
                setInputErrors({});

                // Clear form
                setRegisterData({
                    email: "",
                    password: "",
                    confirm_password: "",
                    name: "",
                    phone: "",
                    agreeToPolicy: false,
                });

                // Optionally switch back to login form
                // setIsLoginForm(true);
            }
            else if (status === "failed" || errors) {
                setInputErrors({
                    email: errors?.email ? errors.email[0] : "",
                    password: errors?.password ? errors.password[0] : "",
                    confirm_password: errors?.confirm_password ? errors.confirm_password[0] : "",
                    name: errors?.name ? errors.name[0] : "",
                    phone: errors?.phone ? errors.phone[0] : "",
                });

                setStatus("");

                toast.warning("Registration failed. Please check your inputs.", {
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
            else {
                setStatus(message || "An error occurred during registration.");
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
            if (error.response && error.response.data) {
                const { errors, message } = error.response.data;
                setInputErrors({
                    email: errors?.email ? errors.email[0] : "",
                    password: errors?.password ? errors.password[0] : "",
                    confirm_password: errors?.confirm_password ? errors.confirm_password[0] : "",
                    name: errors?.name ? errors.name[0] : "",
                    phone: errors?.phone ? errors.phone[0] : "",
                });

                setStatus("");

                toast.error(
                    message || "Registration failed. Please check your inputs.",
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

    const handleKeyDown = (e, formType) => {
        if (e.key === "Enter") {
            if (formType === 'login') {
                handleLoginSubmit();
            } else {
                handleRegisterSubmit();
            }
        }
    };

    const toggleForm = () => {
        setIsLoginForm(!isLoginForm);
        setInputErrors({});
        setStatus("");
    };

    return (
        <div className="px-8 ">
            {token ? (
                <div className="">dashboard</div>
            ) : (
                <div>
                    {isLoginForm ? (
                        // LOGIN FORM
                        <div className="">
                            <LargeTitle className="py-6 text-center" text="Sign In"/>
                        <form className="" onSubmit={handleLoginSubmit} autoComplete="on">
                            <div className="grid grid-cols-1 gap-3 md:gap-4">
                                <div>
                                    <UserAuthInput
                                        onChange={(name, value) => handleLoginChange("email", value)}
                                        value={loginData.email}
                                        type="email"
                                        placeholder="Email"
                                        name="email"
                                        id="email"
                                        required={true}
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
                                        onChange={(name, value) => handleLoginChange("password", value)}
                                        value={loginData.password}
                                        type="password"
                                        id="password"
                                        placeholder="Password"
                                        name="password"
                                        required={true}
                                        className=""
                                        onKeyDown={(e) => handleKeyDown(e, 'login')}
                                        autoComplete="current-password"
                                    />
                                    {inputErrors.password && (
                                        <p className="text-red-500 text-xs pt-[2px]">
                                            {inputErrors.password}
                                        </p>
                                    )}
                                </div>
                                <div className="flex items-center justify-between gap-2 py-4">
                                    <div className="flex items-center gap-2 ">
                                        <input
                                            type="checkbox"
                                            className="w-[14px] lg:w-[16px] h-[14px] lg:h-[16px] border-[1px] border-tertiary rounded-[3px] focus:outline-none focus:!ring-0 focus:ring-blue-300 cursor-pointer border-opacity-[0.4]"
                                            checked={loginData.agreeToPolicy}
                                            onChange={handleLoginCheckbox}
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
                                    className="w-full "
                                    onClick={handleLoginSubmit}
                                    type="submit"
                                    loadingTime="2000"
                                    text="Sign In"
                                    icon={<FaSignInAlt />}
                                />
                                <div onClick={toggleForm} className="">
                                    <SecondaryButton
                                        icon={<FiPlusCircle />}

                                        className=""
                                        text="Create An Account"
                                    />
                                </div>
                            </div>
                        </form>
                        </div>
                    ) : (
                        // REGISTRATION FORM
                        <div className="">
                             <LargeTitle className="py-6 text-center" text="Sign Up"/>
                        <form onSubmit={handleRegisterSubmit} autoComplete="on">
                            <div className="grid grid-cols-1 gap-3 md:gap-4">
                                <div>
                                    <UserAuthInput
                                        onChange={(name, value) => handleRegisterChange("name", value)}
                                        value={registerData.name}
                                        type="text"
                                        placeholder="Full Name"
                                        name="name"
                                        id="name"
                                        required={true}
                                        className=""
                                        autoComplete="name"
                                    />
                                    {inputErrors.name && (
                                        <p className="text-red-500 text-xs pt-[2px]">
                                            {inputErrors.name}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <UserAuthInput
                                        onChange={(name, value) => handleRegisterChange("email", value)}
                                        value={registerData.email}
                                        type="email"
                                        placeholder="Email"
                                        name="email"
                                        id="reg-email"
                                        required={true}
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
                                    <UserAuthInput
                                        onChange={(name, value) => handleRegisterChange("phone", value)}
                                        value={registerData.phone}
                                        type="tel"
                                        placeholder="Phone Number"
                                        name="phone"
                                        id="phone"
                                        required={true}
                                        className=""
                                        autoComplete="tel"
                                    />
                                    {inputErrors.phone && (
                                        <p className="text-red-500 text-xs pt-[2px]">
                                            {inputErrors.phone}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <PasswordInput
                                        onChange={(name, value) => handleRegisterChange("password", value)}
                                        value={registerData.password}
                                        type="password"
                                        id="reg-password"
                                        placeholder="Password"
                                        name="password"
                                        required={true}
                                        className=""
                                        onKeyDown={(e) => handleKeyDown(e, 'register')}
                                        autoComplete="new-password"
                                    />
                                    {inputErrors.password && (
                                        <p className="text-red-500 text-xs pt-[2px]">
                                            {inputErrors.password}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <PasswordInput
                                        onChange={(name, value) => handleRegisterChange("confirm_password", value)}
                                        value={registerData.confirm_password}
                                        type="password"
                                        id="confirm_password"
                                        placeholder="Confirm Password"
                                        name="confirm_password"
                                        required={true}
                                        className=""
                                        onKeyDown={(e) => handleKeyDown(e, 'register')}
                                        autoComplete="new-password"
                                    />
                                    {inputErrors.confirm_password && (
                                        <p className="text-red-500 text-xs pt-[2px]">
                                            {inputErrors.confirm_password}
                                        </p>
                                    )}
                                </div>
                                <div className="flex items-center gap-2 py-4">
                                    <input
                                        type="checkbox"
                                        className="w-[14px] lg:w-[16px] h-[14px] lg:h-[16px] border-[1px] border-tertiary rounded-[3px] focus:outline-none focus:!ring-0 focus:ring-blue-300 cursor-pointer border-opacity-[0.4]"
                                        checked={registerData.agreeToPolicy}
                                        onChange={handleRegisterCheckbox}
                                    />
                                    <p className="text-[10px] sm:text-xs md:text-base">
                                        I agree to the terms and conditions
                                    </p>
                                </div>

                                <SubmitButton
                                    className="w-full "
                                    onClick={handleRegisterSubmit}
                                    type="submit"
                                    loadingTime="2000"
                                    text="Create Account"
                                    disabled={!registerData.agreeToPolicy}
                                    icon={<FaUserPlus />}
                                />
                                <div onClick={toggleForm} className="">
                                    <SecondaryButton
                                        icon={<FiLogIn />}
                                        className=""
                                        text="Already have an account? Sign In"
                                    />
                                </div>
                            </div>
                        </form>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SigninForm;