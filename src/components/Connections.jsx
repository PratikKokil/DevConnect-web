import axios from 'axios'
import React, { useEffect } from 'react'
import { url } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utils/connectionsSlice'
import BackgroundImg from '../assets/backgroundimg.jpg'
import { Link } from 'react-router-dom'

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector(store => store.Connections);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(url + '/user/connections', {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.error('Error fetching connections:', err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return null;

  if (connections.length === 0) {
    return (
      <div className="relative min-h-screen bg-gray-900 overflow-hidden px-4 py-10">
        {/* Background Image */}
        <img
          className="absolute inset-0 w-full h-full object-cover opacity-30 z-0"
          src={BackgroundImg}
          alt="Background"
        />

        <div className="relative z-10 flex items-center justify-center min-h-[60vh]">
          <h1 className="text-white text-2xl text-center font-semibold">
            You have no connections yet!
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gray-900 overflow-hidden px-4 py-10">
      {/* Background Image */}
      <img
        className="absolute inset-0 w-full h-full object-cover opacity-35 z-0"
        src={BackgroundImg}
        alt="Background"
      />

      <div className="relative z-10 flex flex-col items-center gap-6">
        {connections.map(({ firstName, lastName, photoUrl, age, gender, _id }) => (
          <div key={_id} className="w-full max-w-2xl px-4">
            <Link to={`/view/profile/${_id}`}>
            <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-md shadow-md hover:shadow-xl hover:scale-[1.02] transition-transform duration-300">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-blue-500">
                <img
                  alt="profile"
                  src={photoUrl}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h1 className="text-lg font-semibold text-white">
                  {firstName + ' ' + lastName}
                </h1>
                <p className="text-sm text-gray-300">{age + ', ' + gender}</p>
              </div>
            </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Connections;
