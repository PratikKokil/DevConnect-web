import React, { useEffect } from 'react'
import axios from 'axios'
import { url } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import {addFeed,setHasMore,incrementPage} from '../utils/feedSlice'
import UserCard from './UserCard'
import Background from '../assets/backgroundimg.jpg'
const Feed = () => {

 // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch = useDispatch();
  const users= useSelector(store=>store.feed.users)
  const hasMore = useSelector(store=>store.feed.hasMore)
  const page = useSelector(store=>store.feed.page)

  const getFeed =async()=>{
      console.log("Feed fetched successfully");
    try {
    const res = await axios.get(`${url}/feed/?page=${page}&limit=10`,{
      withCredentials:true
    })
    dispatch(addFeed(res.data.users));
    console.log(res.data.users);
 
    if(res.data.users.length < 10){
      dispatch(setHasMore(false));
    }
    else{
      dispatch(setHasMore(true));
      dispatch(incrementPage());
    }
    } catch (error) {
      console.error("Error fetching feed:", error);
      return;
      
    }

}

  useEffect(()=>{
    if(users.length === 0){
      getFeed();}
  },[])

  const handleAction = ()=>{
    if(users.length<5 && hasMore){
      getFeed();
    }
  }
  if(!users.length){
    return (
      <div className="text-white text-center mt-20">
        {hasMore ? "Loading more users..." : "No more users to show!"}
      </div>
    );
  }

  
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
        <UserCard user={users[0]} onAction={handleAction} isOnEdit={false}/>
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
