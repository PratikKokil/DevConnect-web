import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

import { useInitialData } from '../hooks/useInitialData'

const Body = () => {
   
    const {loading} = useInitialData();
    if (loading){
      return (
        <div className='flex justify-center h-screen items-center'>
        <span className="loading loading-ring loading-xs"></span>
        <span className="loading loading-ring loading-sm"></span>
        <span className="loading loading-ring loading-md"></span>
        <span className="loading loading-ring loading-lg"></span>
        <span className="loading loading-ring loading-xl"></span>
        </div>
      )
    }
  return (
     
    <div>
      <Navbar/>
      <Outlet></Outlet>
      {/* <Footer/> */}
    </div>
  )
}

export default Body
