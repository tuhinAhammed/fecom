import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TopHeader from './Components/Header/TopHeader'
import MainHeader from './Components/Header/MainHeader'
import { Outlet } from 'react-router-dom'
import MainFooter from './Components/Footer/MainFooter'
import Subscription from './Components/Footer/Subscription'
import { Bounce, ToastContainer } from 'react-toastify'
import ScrollToTop from './Utils/scrollToTop'
import SupportDetails from './Components/Footer/SupportDetails'
import Categories from './Components/Home/Categories'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLandingPageData } from './Redux/Slice/landingPageSlice'

function App() {
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const dispatch = useDispatch()
  const landingData = useSelector((state) => state?.landingPageData?.data)


console.log(landingData);
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
  return (
    <>
    {/* <TopHeader/> */}
    <MainHeader/>
    {/* <Categories/> */}
    <ToastContainer
            position="top-left"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={true}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
          />
          <ScrollToTop/>
    <Outlet />
    <Subscription/>
    <SupportDetails/>
    <MainFooter/>
    </>
  )
}

export default App
