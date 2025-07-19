import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { url } from '../utils/constants';
import { useParams } from 'react-router-dom';

const ProfileView = () => {
  const { id } = useParams();
  const [profileData, setProfileData] = useState(null); // Initialize with null
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null);     // Add error state

  const getUser = async () => {
    if (!id) {
      setLoading(false);
      setError("User ID not found in URL.");
      return;
    }

    setLoading(true); // Set loading to true before API call
    setError(null);   // Clear any previous errors

    try {
      const res = await axios.get(
        `${url}/user/view/${id}`,
        { withCredentials: true }
      );
      // Assuming the user data is under res.data.userWithoutPassword
      setProfileData(res.data.userWithoutPassword);
      console.log("Fetched profile data:", res.data.userWithoutPassword);
    } catch (err) {
      console.error('Error fetching user profile:', err);
      if (err.response && err.response.status === 401) {
        setError("Unauthorized: Please log in to view this profile.");
      } else {
        setError("Failed to load profile. Please try again.");
      }
    } finally {
      setLoading(false); // Set loading to false after API call completes
    }
  };

  useEffect(() => {
    getUser();
  }, [id]); // Re-run effect when 'id' changes

  // --- UI Rendering Logic ---
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        <p className="ml-4 text-lg">Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-red-500">
        <p className="text-xl font-semibold">Error: {error}</p>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-gray-400">
        <p className="text-xl font-semibold">No profile data found.</p>
      </div>
    );
  }

  // Once profileData is available, render the UI
  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 lg:p-8 flex items-center justify-center">
      <div className="bg-gray-800 rounded-xl shadow-2xl p-6 sm:p-8 lg:p-10 w-full max-w-2xl transform transition-all duration-300 ">
        <div className="flex flex-col items-center mb-6">
          <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg mb-4">
            <img
              src={profileData.photoUrl || "https://placehold.co/160x160/2d3748/ffffff?text=No+Photo"}
              alt={`${profileData.firstName}'s profile`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null; // Prevent infinite loop
                e.target.src = "https://placehold.co/160x160/2d3748/ffffff?text=No+Photo"; // Fallback image
              }}
            />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-400 mb-2 text-center">
            {profileData.firstName} {profileData.lastName}
          </h1>
          <p className="text-gray-400 text-md sm:text-lg text-center">
            {profileData.emailId}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-700 p-4 rounded-lg shadow-inner">
            <p className="text-gray-300 text-sm mb-1">Age</p>
            <p className="text-lg font-semibold">{profileData.age}</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg shadow-inner">
            <p className="text-gray-300 text-sm mb-1">Gender</p>
            <p className="text-lg font-semibold capitalize">{profileData.gender}</p>
          </div>
        </div>

        {profileData.about && (
          <div className="bg-gray-700 p-4 rounded-lg shadow-inner mb-6">
            <h3 className="text-gray-300 text-sm mb-2">About Me</h3>
            <p className="text-base leading-relaxed">{profileData.about}</p>
          </div>
        )}

        {profileData.skills && profileData.skills.length > 0 && (
          <div className="bg-gray-700 p-4 rounded-lg shadow-inner mb-6">
            <h3 className="text-gray-300 text-sm mb-2">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {profileData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-600 text-white text-sm font-medium px-3 py-1 rounded-full shadow-md"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="text-center text-gray-500 text-sm mt-6">
          <p>Joined: {new Date(profileData.createdAt).toLocaleDateString()}</p>
        </div>

       
        {/* <div className="mt-8 flex justify-center">
          <button className="btn bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
            Send Connection Request
          </button>
        </div> */}
       
      </div>
    </div>
  );
};

export default ProfileView;
