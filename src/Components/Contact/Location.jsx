
import React from 'react'

const Location = () => {
  return (
    <div className=''>
      <div className="">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.7903627942615!2d90.35646717564038!3d23.754853988604793!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755bf5c4574b361%3A0x533620153224ff37!2sKaderabad%20Housing%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1760620584366!5m2!1sen!2sbd"
        width="100%"
        height="550"
        style={{ border: 0 }}  // Corrected style prop to use an object
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
      </div>
    </div>
  )
}

export default Location
