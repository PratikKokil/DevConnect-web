import React, {  useEffect, useState } from 'react'
import Navbar from './Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { url } from '../utils/constants'
import { addUser } from '../utils/userSlice'

const Body = () => {
  const dispatch = useDispatch();
  const userData = useSelector(store => store.user);
  const navigate = useNavigate();
  const [loading , setLoading] = useState(false);

    const fetchUser = async () => {
    try {
      const user = await axios.get(`${url}/profile/view`, {
        withCredentials: true,
      });
      setLoading(false);
      dispatch(addUser(user.data));

    } catch (error) {
      setLoading(false);
      if (error?.response?.status === 401) {
        navigate('/login');
      }
      console.log(error);
    }
  };

  useEffect(() => {
    if (!userData) {
      setLoading(true);
      fetchUser();
    }
    }, []);
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
