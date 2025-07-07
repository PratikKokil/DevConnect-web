import React from 'react';
import {  useDispatch, useSelector } from 'react-redux';
import backgroundImg from '../assets/backgroundimg.jpg';
import { url } from '../utils/constants';
import axios from 'axios';
import { removeRequest } from '../utils/requestsSlice';

const Requests = () => {
  
  const requests = useSelector((store) => store.Requests);
  const dispatch = useDispatch();
  const reviewRequest =async(status,_id)=>{
    try {
      const res = await axios.post(
      url + '/request/review/'+status+'/'+_id,
      {},
      {withCredentials:true}
     )
     dispatch(removeRequest(_id))
     console.log(res.data)
    } catch (error) {
      console.log(error)
    }

  }

  if (!requests){ 
          return (
        <div className='flex justify-center h-screen items-center'>
        <span className="loading loading-ring loading-xs"></span>
        <span className="loading loading-ring loading-sm"></span>
        <span className="loading loading-ring loading-md"></span>
        <span className="loading loading-ring loading-lg"></span>
        <span className="loading loading-ring loading-xl"></span>
        </div>
      )
  };

  if (requests.length === 0)
    return (
      <div className="relative min-h-screen bg-gray-900 overflow-hidden px-4 py-10">
        {/* Background Image */}
        <img
          className="absolute inset-0 w-full h-full object-cover opacity-30 z-0"
          src={backgroundImg}
          alt="Background"
        />

        <div className="relative z-10 flex items-center justify-center min-h-[60vh]">
          <h1 className="text-white text-2xl text-center font-semibold">
            You have no connections request yet!
          </h1>
        </div>
      </div>
    );

  return (
    <div className="relative min-h-screen bg-gray-900 px-4 py-10">
      {/* Background Image */}
      <img
        src={backgroundImg}
        alt="Tech network background"
        className="absolute top-0 left-0 w-full h-full object-cover opacity-35 z-10"
      />

      <h1 className="text-3xl text-white font-bold text-center mb-8">
        Connection Requests
      </h1>

      <div className="flex flex-col gap-6 max-w-3xl mx-auto">
        {requests.map((request) => {
          const { firstName, lastName, photoUrl, about, _id } =
            request.fromUserId;

          return (
            <div
              key={_id}
              className="flex items-center justify-between gap-6 bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-md shadow-md hover:shadow-xl  hover:scale-[1.01] transition-transform duration-300 z-20"
            >
              {/* Profile Picture */}
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-blue-500">
                <img
                  alt="profile"
                  src={photoUrl}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* User Info */}
              <div className="flex-1">
                <h1 className="text-lg font-semibold text-white">
                  {firstName + ' ' + lastName}
                </h1>
                <p className="text-sm text-white opacity-80">
                  {about || 'No bio provided'}
                </p>
              </div>

              {/* Buttons */}
             
              <button className="btn btn-soft btn-secondary" onClick={()=>reviewRequest("rejected",request._id)}>Reject</button>
              <button className="btn btn-soft btn-success" onClick={()=>reviewRequest("accepted",request._id)}>Accept</button>
              
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
