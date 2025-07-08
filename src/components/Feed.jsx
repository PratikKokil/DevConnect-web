import React, { useEffect } from 'react'
import axios from 'axios'
import { url } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import {addFeed} from '../utils/feedSlice'
import UserCard from './UserCard'
import Background from '../assets/backgroundimg.jpg'
const Feed = () => {

 // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch = useDispatch();
  const users= useSelector(store=>store.feed)

  const getFeed =async()=>{
    const res = await axios.get(url + '/feed',{
      withCredentials:true
    })
    dispatch(addFeed(res.data.users));
  }

  useEffect(()=>{
    if(!users){
      getFeed();}
  },[])

  
  if(!users) return

  
return (
  <div className="relative min-h-screen bg-gray-900 px-4 py-10 overflow-hidden">
    {/* Background Image */}
    <img
      className="absolute inset-0 w-full h-full object-cover opacity-35 z-0"
      src={Background}
      alt="Background"
    />

    {/* Content Wrapper */}
    <div className="relative z-10 flex justify-center items-center min-h-[60vh]">
      {users[0] ? (
        <UserCard user={users[0]} />
      ) : (
              <div className="relative z-10 flex items-center justify-center min-h-[60vh]">
          <h1 className="text-white text-2xl text-center font-semibold">
            No user found!
          </h1>
        </div>
      )}
    </div>
  </div>
);


}

export default Feed;
