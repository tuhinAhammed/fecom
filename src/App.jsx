import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TopHeader from './Components/Header/TopHeader'
import MainHeader from './Components/Header/MainHeader'
import { Outlet } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <TopHeader/>
    <MainHeader/>
    <Outlet />
      <h1 className="text-3xl font-bold underline text-theme">
      I Miss You
    </h1>
    </>
  )
}

export default App
