import React from 'react'
import EditProfile from './EditProfile';
import { useSelector } from 'react-redux';
import Background from '../assets/backgroundimg.jpg'
const Profile = () => {
  const user = useSelector(store=>store.user)
  return (
    <div className='relative min-h-screen bg-gray-900 px-4 py-10 '>
      <div>
        <img className="absolute top-0 left-0 w-full h-full object-cover opacity-35" src={Background}></img>
      </div>
    <div>
     <EditProfile user={user}/>
    </div>
    
    </div>
  )
}

export default Profile;
