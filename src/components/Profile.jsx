import React from 'react'
import EditProfile from './EditProfile';
import { useSelector } from 'react-redux';
import Background from '../assets/backgroundimg.jpg'
const Profile = () => {
  const user = useSelector(store=>store.user)
  return (
    <div className='min-h-screen bg-slate-950  px-4 py-10 '>
    <div>
     <EditProfile user={user}/>
    </div>
    
    </div>
  )
}

export default Profile;
