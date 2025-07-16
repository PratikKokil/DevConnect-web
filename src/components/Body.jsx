import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import { useInitialData } from '../hooks/useInitialData'

const Body = () => {
   const [loading2, setLoading2] = useState(true);
   const { loading, refetch } = useInitialData(); // Get refetch function
   
   useEffect(() => {
       setLoading2(loading);
   }, [loading])

   if (loading2) {       
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
           <Navbar refetch={refetch} /> {/* Pass refetch to Navbar */}
           <Outlet />       
           {/* <Footer/> */}     
       </div>   
   ) 
}  

export default Body