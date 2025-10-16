import React from 'react'
import Container from '../../Layout/Container'
import LargeTitle from '../../Layout/Title/LargeTitle'

const ContactUs = () => {
    return (
        <div className='py-sectionMd'>
            <Container>
                <div className="text-center">
                    <LargeTitle className="pb-6 w-full md:w-[300px] font-semibold m-auto" text="Have a Question? Let’s Connect!"/>
                </div>
            </Container>
        </div>
    )
}

export default ContactUs