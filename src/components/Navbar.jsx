import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import {removeUser} from '../utils/userSlice'
import axios from 'axios';
import { url } from '../utils/constants';
import {  Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const user = useSelector(store=> store?.user)
    const requests = useSelector(store =>store.Requests)
    const dispatch = useDispatch();
    const navigate = useNavigate();
   const firstName = user?.firstName ?? "Developer";
   const photoUrl = user?.photoUrl ?? "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";
    
   const handleLogOut = async () => {
    try {
      await axios.post(url + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.log(err);
    } 
  };
  
  return (
    <div>
           <div className="navbar bg-gray-900 shadow-sm">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-xl">DevConnect</Link>
            </div>
            { user &&
                <div className="flex gap-7 flex-row justify-center items-center">
                  {requests &&
                      <button className="btn btn-ghost btn-circle">
                      <div className="indicator">
                        <Link to={"/requests"}><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /> </svg></Link>
                        {requests.length >0 && <span className="badge badge-xs badge-primary indicator-item"></span>}
                        
                      </div>
                    </button>
                   }
                    <p className=''>Welcome , {firstName} !</p>
                <div className="dropdown dropdown-end mr-5">
                    
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    
                    <div className="w-10 rounded-full">
                    <img
                        alt="Tailwind CSS Navbar component"
                        src={photoUrl} />
                    </div>
                </div>       
                <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-gray-900 rounded-box z-1 mt-3 w-52 p-2 shadow">
                    <li>
                    <Link to="/profile" className="justify-between">
                        Profile
                        <span className="badge">New</span>
                    </Link>
                    </li>
                    <li><Link to="/connections"> Connections</Link></li>
                    <li><Link to="/requests">Requests</Link></li>
                    <li><a onClick={handleLogOut}>Logout</a></li>
                </ul>

                </div>
            </div>
            }

            </div>
    </div>
  )
}

export default Navbar
