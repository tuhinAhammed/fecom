import React from 'react'
import ContactUs from '../Components/Contact/ContuctUs'
import ContactForm from '../Components/Contact/ContactForm'
import Location from '../Components/Contact/Location'
import Breadcrumb from '../Layout/Breadcrumb/Breadcrumb'
import Container from '../Layout/Container'
import Outlet from '../Components/Contact/Outlet'


const Contact = () => {
  return (
    <div className='pt-sectionSm md:pt-sectionMd lg:pt-sectionLg xl:pt-sectionXl bg-secondary'>
<Container>
<Breadcrumb
          title="Contact"
          slug=""
        />
      <ContactUs/>
      <ContactForm/>
      <Outlet/>
</Container>
      <Location/>
    </div>
  )
}

export default Contact