import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { url } from '../utils/constants'
import { addUser } from '../utils/userSlice'

const Body = () => {
  const dispatch = useDispatch();
  const user = useSelector(store => store.user);
  const navigate = useNavigate();
  const [loading , setLoading] = useState(false);
  const fetchUser = async()=>{
    try {
      const user = await axios.get(
        url+'/profile/view',{
           withCredentials:true,
        }
       )
       setLoading(false);
       dispatch(addUser(user.data))
       console.log(user.data)
    } catch (error) {
      if(error.status == 401){
       setLoading(false);
        navigate('/login');
      }
      console.log(error);
    }
  };
  useEffect(()=>{
      if(!user){
        setLoading(true);
        fetchUser();
        console.log("user fetched from body....")
      }
      
  },[])
   if (loading){
    return (
 <div className="flex flex-col items-center justify-center h-screen">
  <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-[spin_4s_linear_infinite]"></div>
  <div className="mt-4 text-gray-600 text-lg">Loading.......</div>
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
