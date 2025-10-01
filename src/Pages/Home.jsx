import React from 'react'
import Container from '../Components/Layout/Container'
import MinTitle from '../Components/Layout/Title/MinTitle'
import Banner from '../Components/Home/Banner'
import NewArrivals from '../Components/Home/NewArrivals'

const Home = () => {
  return (
    <div className='text-4xl font-tertiary'>

        <Banner/>
        <NewArrivals/>
    </div>
  )
}

export default Home