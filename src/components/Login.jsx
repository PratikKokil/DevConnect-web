import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { Eye, EyeOff } from "lucide-react"; 
import { url } from '../utils/constants';
import InputField from './InputField';
import BackgroundImg from '../assets/backgroundimg.jpg'

const Login = ({refetch}) => {

  const [isLogInForm, setIsLogInForm] = useState(true);
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword] = useState(false);


      useEffect(() => {
     
        setFirstName('');
        setLastName('');
        setConfirmPassword('');
        setPassword('');
        setEmailId('');
        setError('');
        
      }, [isLogInForm]);

      useEffect(() => {
        setIsLogInForm(true); 
      }, []);

  const handleLogInForm = async () => {
    try {
      const res = await axios.post(
        url+'/login',
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.user));
      navigate('/profile');
      if (refetch) {
        setTimeout(() => {
          refetch();
        }, 100);
      }
      
    } catch (error) {
      const backendMsg = error?.response?.data?.error;
      setError(backendMsg);
    }
  };

  const handleSignUpForm = async () => {
    try {
      if(password != confirmPassword){
        setError ("Passwords do not match. Please check and try again.")
        return;
      }
      const res = await axios.post(
        url+'/signUp',
        {
          firstName,
          lastName,
          password,
          emailId,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.user))
      navigate('/profile')

       if (refetch) {
        setTimeout(() => {
          refetch();
        }, 100);
      }
     
    } catch (error) {
      const backendMsg = error?.response?.data?.error;
      setError(backendMsg);
    }
  };

return (
  <div className="min-h-screen bg-slate-950 flex flex-col">
    


    {/* Auth Card */}
    <div className="flex flex-1 items-center justify-center">
      <div className="w-[380px] rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg">
        
        {/* Heading */}
        <h2 className="text-xl font-semibold text-white text-center">
          {isLogInForm ? "Log in to DevConnect" : "Create DevConnect account"}
        </h2>
        <p className="text-sm text-slate-400 text-center mt-1">
          Build. Connect. Grow.
        </p>

        {/* Form */}
        <div className="mt-6 space-y-4">

          {!isLogInForm && (
            <div className="flex gap-2">
              <input
                className="w-1/2 rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-sm text-white outline-none focus:border-sky-400"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                className="w-1/2 rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-sm text-white outline-none focus:border-sky-400"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          )}

          <input
            className="w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-sm text-white outline-none focus:border-sky-400"
            placeholder="Email address"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
          />

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 pr-10 text-sm text-white outline-none focus:border-sky-400"
            />
            <div
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-slate-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </div>
          </div>

          {!isLogInForm && (
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-sm text-white outline-none focus:border-sky-400"
            />
          )}

          {error && (
            <p className="text-sm text-red-400 text-center">{error}</p>
          )}

          {/* Button */}
          <button
            onClick={isLogInForm ? handleLogInForm : handleSignUpForm}
            className="w-full rounded-lg bg-sky-400 py-2 text-sm font-medium text-black hover:bg-sky-300 transition cursor-pointer"
          >
            {isLogInForm ? "Log In" : "Create Account"}
          </button>

          {/* Toggle */}
          <p
            className="text-center text-sm text-slate-400 cursor-pointer hover:text-sky-400"
            onClick={() => setIsLogInForm(!isLogInForm)}
          >
            {isLogInForm
              ? "New here? Create an account →"
              : "Already have an account? Log in →"}
          </p>
        </div>
      </div>
    </div>
  </div>
);

};

export default Login;
