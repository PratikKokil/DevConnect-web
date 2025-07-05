import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import {removeUser} from '../utils/userSlice'
import axios from 'axios';
import { url } from '../utils/constants';
import {  Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const user = useSelector(store=> store?.user)
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
           <div className="navbar bg-base-300 shadow-sm">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-xl">DevConnect</Link>
            </div>
            { user &&
                <div className="flex gap-7 flex-row justify-center items-center">
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
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                    <li>
                    <Link to="/profile" className="justify-between">
                        Profile
                        <span className="badge">New</span>
                    </Link>
                    </li>
                    <li><Link to="/connections"> Connections</Link></li>
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
