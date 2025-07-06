import axios from 'axios';
import React, { useEffect } from 'react';
import { url } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addRequests } from '../utils/requestsSlice';
import backgroundImg from '../assets/backgroundimg.jpg';

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.Requests);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(url + '/user/request/recevied', {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.connectionRequest));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return null;

  if (requests.length === 0)
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <h1 className="text-white text-xl">You have no connection requests.</h1>
      </div>
    );

  return (
    <div className="relative min-h-screen bg-gray-900 px-4 py-10">
      {/* Background Image */}
      <img
        src={backgroundImg}
        alt="Tech network background"
        className="absolute top-0 left-0 w-full h-full object-cover opacity-25 z-10"
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
              className="flex items-center justify-between gap-6 bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-md shadow-md hover:shadow-xl hover:scale-[1.01] transition-transform duration-300"
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
              <div className="flex flex-col gap-2">
                <button className="px-4 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white text-sm font-medium transition">
                  Accept
                </button>
                <button className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition">
                  Reject
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
