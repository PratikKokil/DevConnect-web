import React, { useEffect } from 'react'
import axios from 'axios'
import { url } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import {addFeed} from '../utils/feedSlice'
import UserCard from './UserCard'
 
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
      getFeed();
  },[])
  if(!users) return
  if(users.length === 0 ){
    return (
      <div className='flex justify-center items-center text-2xl'>No more Feed !!</div>
    )
  }

  return (
    users &&
    <div className='flex justify-center my-10'>
    <UserCard user={users[0]} />
    </div>
  )
}

export default Feed;
