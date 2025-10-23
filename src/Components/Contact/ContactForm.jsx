import React, { useState } from 'react'
import Container from '../../Layout/Container'
import LoadingButton from '../../Layout/Button/LoadingButton'
import ContactInput from '../../Layout/Input/ContactInput'
import ContactTextarea from '../../Layout/Input/ContactTextarea'
import MidTitle from '../../Layout/Title/MidTitle'
import MinTitle from '../../Layout/Title/MinTitle'
import { FaPhoneAlt } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { IoLocation } from 'react-icons/io5'
import { LuTimer } from 'react-icons/lu'
import { Link } from 'react-router-dom'
import { IoIosSend } from 'react-icons/io'
export const contactInformationData = [
    {
        sub: "Phone",
        title: "Reach out for any inquiries",
        desc: "+880 1712345678",
        icon: <FaPhoneAlt />,
        link: "tel:+8801712345678" // Direct call
    },
    {
        sub: "Email",
        title: "Send us an email anytime",
        desc: "info@nihar.com",
        icon: <MdEmail />,
        link: "tuhin.webdev@gmail.com" // Direct email
    },
    {
        sub: "Location",
        title: "Our Main Office",
        desc: "Mohammadpur, Dhaka, Bangladesh",
        icon: <IoLocation />,
        link: "https://maps.app.goo.gl/example" // Open location in Google Maps
    },
    {
        sub: "Office Time",
        title: "Working Hours",
        desc: "Mon - Sat | 10:00 - 19:00",
        icon: <LuTimer />,
        // link: ""
    },
];
const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
        service: "",
        aboutFile: ""
    })
    const handleInputChange = (name, value) => {
        setFormData({
            ...formData, [name]: value
        })
        // console.log(name + ":" + value);
        console.log(formData);
    }

    const handleSubmit = () => {
        console.log(formData);
        setFormData({
            name: "",
            email: "",
            phone: "",
            message: "",
            service: "",
            aboutFile: ""
        });

    }

    return (
        <div className='pb-sectionSm md:pb-sectionLg'>
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-5 items-center gap-12 md:gap-24">
                    <div className="col-span-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                {/* <label htmlFor="">Full Name</label> */}

                                <ContactInput type="text" name="name" placeholder="Your Name*" className="" onInputChange={handleInputChange} value={formData.name} />
                            </div>
                            <div className="">
                                <ContactInput type="text" name="email" placeholder="Your Email*" className="" onInputChange={handleInputChange} value={formData.email} />
                            </div>
                            <div className="">
                                <ContactInput type="text" name="phone" placeholder="Your Number*" className="" onInputChange={handleInputChange} value={formData.phone} />

                            </div>
                        </div>
                        <ContactTextarea onInputChange={handleInputChange} name="message" value={formData.message} />
                        <LoadingButton loadingTime="2000" icon={<IoIosSend />} text="Send Message" className="mt-8" onClick={handleSubmit} />
                    </div>
                    <div className="col-span-2  ">
                        <div className="grid grid-cols-1 gap-3 sm:gap-4 md:gap-8 lg:gap-10">
                            {
                                contactInformationData.map((item) => (
                                    <div className="innerCard  flex items-center gap-4">
                                        <p className="text-2xl text-secondary p-4 bg-theme">
                                            {item.icon}
                                        </p>
                                        <div className="">
                                            <MidTitle text={item.title} />
                                            {
                                                item.link ?
                                                    <Link to={item.link} target="_blank" rel="noopener noreferrer">
                                                        <MinTitle className="text-tertiary" text={item.desc} />
                                                    </Link>
                                                    :
                                                    <MinTitle className="text-tertiary" text={item.desc} />
                                            }
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default ContactForm