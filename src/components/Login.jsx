import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { Eye, EyeOff } from "lucide-react"; 
import { url } from '../utils/constants';
import InputField from './InputField';
import BackgroundImg from '../assets/backgroundimg.jpg'

const Login = () => {

  const [isLogInForm, setIsLogInForm] = useState(true);
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


      useEffect(() => {
     
        setFirstName('');
        setLastName('');
        setAge('');
        setGender('');
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
          age,
          password,
          emailId,
          gender,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.user))
      navigate('/profile')
     
    } catch (error) {
      const backendMsg = error?.response?.data?.error;
      setError(backendMsg);
    }
  };

  return (
    <div className='relative min-h-screen bg-gray-900 '>
      <div>
        <img className="absolute inset-0 w-full h-full object-cover opacity-40 z-0"src={BackgroundImg}></img>
      </div>
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card card-border bg-gray-900 w-96">
        <div className="card-body">
          <h2 className="card-title justify-center">
           {isLogInForm ? 'Log In to DevConnect' : 'Create Your DevConnect Account'}
          </h2>
           
          {!isLogInForm && (
            <>
          <InputField label="First Name" type="text" value={firstName} onChange={(e) => {setFirstName(e.target.value);setError('');}} placeholder="Enter Your First Name" />
          <InputField label="Last Name" type="text" value={lastName} onChange={(e) => {setLastName(e.target.value);setError('');}} placeholder="Enter Your Last Name "/>
          <InputField label="Age" type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Enter your age" />

            </>
          )}
          <InputField label="Email" type="text" value={emailId} onChange={(e) => {setEmailId(e.target.value);setError('');}} placeholder="Enter Your Email" />


          {!isLogInForm && (
            <>
            <InputField label="Gender" type="text" value={gender} onChange={(e) => setGender(e.target.value)} placeholder="male/female/other" />
            </>
          )}
          <span>Password</span>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => {setPassword(e.target.value);setError('');}}
              onKeyDown={e =>{
                 if(e.key === "Enter") 
                  {
                    isLogInForm ? handleLogInForm() : handleSignUpForm()
                  }
                }
              }
              className="input pr-10 w-full"
            />
            <div
              className="absolute top-[50%] right-3 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
          </div>
          {!isLogInForm && (
            <>
                 <span>Confirm Password</span>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm the Password"
                    value={confirmPassword}
                    onChange={(e) =>{ setConfirmPassword(e.target.value);setError('');}}
                    onKeyDown={e => {
                      if(e.key === "Enter")
                        { 
                          isLogInForm ? handleLogInForm() : handleSignUpForm()
                        }
                      }
                    }
                    className="input pr-10 w-full"
                  />
                  <div
                    className="absolute top-[50%] right-3 transform -translate-y-1/2 cursor-pointer"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </div>
                </div>
            </>
          )}

          <p className="text-red-500 text-center">{error}</p>

          <p
            className="cursor-pointer"
            onClick={() => {
              setIsLogInForm((value) => !value);
              setError(null);
            }}
          >
            {isLogInForm
              ? 'New to DevConnect? Click here'
              : 'Already registered? Click here'}
          </p>

          <div className="card-actions justify-center items-center">
            <button
              className="btn btn-primary"
              onClick={isLogInForm ? handleLogInForm : handleSignUpForm}
            >
              {isLogInForm ? 'Log In' : 'Sign Up'}
            </button>
          </div>
          
        </div>
      </div>
    </div>
    </div>
  );
};

export default Login;
