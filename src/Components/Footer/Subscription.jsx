import React, { useState } from 'react'
import Container from '../../Layout/Container'
import LargeTitle from '../../Layout/Title/LargeTitle'
import { MdOutlineMail } from 'react-icons/md'
import { HiOutlineMail } from 'react-icons/hi'
import PrimaryButton from '../../Layout/Button/PrimaryButton'
import { PiBellSimpleRingingBold } from 'react-icons/pi'
import axios from 'axios'
import { subscriptionPost, toastr_position } from '../../Api'
import { toast } from 'react-toastify'
const Subscription = () => {
    const [emailValue, setEmailValue] = useState("")
    const handleEmailChnage = (e) => {
        setEmailValue(e.target.value);
    }
    const handleSubmit = async () => {
        try {
            const response = await axios.post(subscriptionPost, {
                email: emailValue,
            });

            // ✅ Success toast
            if (response.data.status === 200) {
                toast.success("Subscribed successfully!", {
                    position: toastr_position,
                    autoClose: 3000,
                });
                setEmailValue("")
            }
            else{
                toast.error(response.data.errors.email[0], {
                    position: toastr_position,
                    autoClose: 3000,
                });
            }

            console.log(response);
        } catch (error) {
            console.log(error);
            // ❌ Error toast
            if (error.response && error.response.data?.message) {
                
            } else {
                toast.error("Something went wrong. Please try again.", {
                    position: toastr_position,
                    autoClose: 3000,
                });
            }

            console.error(error);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
                handleSubmit();
        }
    };
    return (
        <div className="py-sectionSm md:py-sectionMd lg:py-sectionLg">
            <Container>
                <div className="grid items-center grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 lg:gap-24 py-6 sm:py-8 md:py-10 lg:py-12 px-8 sm:px-10 md:px-12 lg:px-16 bg-primary rounded-2xl">
                    <div className='col-span-1 lg:col-span-7'>
                        <LargeTitle className="!text-4xl font-tertiary font-bold text-secondary" text="STAY UPTO DATE ABOUT OUR LATEST OFFERS" />
                    </div>
                    <div className="col-span-1 lg:col-span-5 ">
                        <div className="grid gap-3 grid-cols-1">
                            <div className="flex items-center gap-2 pl-5  bg-secondary text-primary  rounded-full w-full">
                                <HiOutlineMail className='text-xl text-tertiary opacity-[0.7]' />
                                <input
                                    onKeyDown={handleKeyDown}
                                    value={emailValue}
                                    onChange={handleEmailChnage}
                                    className=" text-xs md:text-sm lg:text-base focus-visible:outline-none outline-transparent focus-visible:border-[1px] border-transparent focus:!ring-0  py-1 md:py-2 lg:py-3 lg:py-2 px-2 w-full rounded-full"
                                    placeholder="Your Email Address.."
                                    type="email"
                                    required
                                />
                            </div>
                            <div onClick={handleSubmit} className="">
                                <PrimaryButton className="" icon={<PiBellSimpleRingingBold />} text="Subscribe to Newsletter" />
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Subscription