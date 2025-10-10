import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Container from '../Layout/Container.jsx'
import MinTitle from '../Layout/Title/MinTitle.jsx'
import Banner from '../Components/Home/Banner'
import NewArrivals from '../Components/Home/NewArrivals'
import CustomerReview from '../Components/Home/CustomerReview'
import Categories from '../Components/Home/Categories'
import { fetchLandingPageData } from '../Redux/Slice/landingPageSlice.js'
import TrendingProductSection from '../Components/Home/TrendingProductSection.jsx'
import CategoryBanner from '../Components/Home/Advertise.jsx'
import Advertise from '../Components/Home/Advertise.jsx'
import AllProduct from '../Components/Home/AllProduct.jsx'

const Home = () => {
  const dispatch = useDispatch()
  const landingData = useSelector((state) => state?.landingPageData?.data)

  // Manage loading and error locally
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)


  useEffect(() => {
    const fetchData = async () => {
      // Only fetch if data doesn't exist
      if (!landingData) {
        setLoading(true)
        setError(null)
        try {
          await dispatch(fetchLandingPageData()).unwrap()
        } catch (err) {
          setError(err.message || 'Failed to fetch data')
        } finally {
          setLoading(false)
        }
      }
    }

    fetchData()
  }, [dispatch, landingData])



  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-500">Error: {error}</div>
      </div>
    )
  }
  console.log(landingData);
  return (
    <div className='text-4xl font-tertiary'>
      <Banner />
      <Categories />
      <NewArrivals productData={landingData?.products?.all} loading={loading} />
      <TrendingProductSection productData={landingData?.products?.trendings} loading={loading} />
      <Advertise/>
      <AllProduct productData={landingData?.products?.all} loading={loading} />

      {/* <CustomerReview /> */}
    </div>
  )
}

export default Home