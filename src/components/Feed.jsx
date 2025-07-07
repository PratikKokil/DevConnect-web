import React, { useEffect } from 'react'
import axios from 'axios'
import { url } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import {addFeed} from '../utils/feedSlice'
import UserCard from './UserCard'
 
const Feed = () => {

 // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch = useDispatch();
  const feed = useSelector(store=>store.feed)
  const users = feed?.users;
  const getFeed =async()=>{
    const res = await axios.get(url + '/feed',{
      withCredentials:true
    })
    dispatch(addFeed(res.data));
  }

  useEffect(()=>{
      getFeed();
  },[])
 

  return (
    feed &&
    <div className='flex justify-center my-10'>
    <UserCard user={users[1]} />
    </div>
  )
}

export default Feed;
