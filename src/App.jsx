import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TopHeader from './Components/Header/TopHeader'
import MainHeader from './Components/Header/MainHeader'
import { Outlet } from 'react-router-dom'
import MainFooter from './Components/Footer/MainFooter'
import Subscription from './Components/Footer/Subscription'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <TopHeader/>
    <MainHeader/>
    <Outlet />
    <Subscription/>
    <MainFooter/>
    </>
  )
}

export default App
