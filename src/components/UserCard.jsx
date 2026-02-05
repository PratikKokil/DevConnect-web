import axios from "axios";
import React from "react";
import { url } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import { useNavigate } from "react-router-dom";

const UserCard = ({ user, onAction, isOnEdit }) => {
  const {
    _id,
    firstName,
    lastName,
    about,
    photoUrl,
    skills = [],
    role,
    experience,
    location,
  } = user;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSendRequest = async (status, id) => {
    try {
      await axios.post(
        `${url}/request/send/${status}/${id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(id));
      if (onAction) onAction();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-[380px] rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg">

      {/* Header */}
      <div className="flex items-center gap-4">
        <img
          src={photoUrl || "https://via.placeholder.com/80"}
          alt="avatar"
          className="h-16 w-16 rounded-full object-cover border border-slate-700"
        />

        <div>
          <h2 className="text-lg font-semibold text-white">
            {firstName} {lastName}
          </h2>
          <p className="text-sm text-slate-400">
            {role || "Developer"}
          </p>
          <p className="text-xs text-slate-500">
            {experience ? `${experience} yrs` : "Experience"} · {location || "Remote"}
          </p>
        </div>
      </div>

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {skills.slice(0, 5).map((skill, idx) => (
            <span
              key={idx}
              className="text-xs rounded-full bg-slate-800 px-3 py-1 text-slate-300"
            >
              {skill}
            </span>
          ))}
        </div>
      )}

      {/* Bio */}
      {about && (
        <p className="mt-4 text-sm text-slate-300 line-clamp-2">
          {about}
        </p>
      )}

      {/* Actions */}
      {!isOnEdit && (
        <>
          <div className="mt-6 flex gap-3">
            <button
              className="w-1/2 rounded-lg border border-slate-700 py-2 text-sm text-slate-300 hover:bg-slate-800 transition cursor-pointer"
              onClick={() => handleSendRequest("ignored", _id)}
            >
              Skip
            </button>
            <button
              className="w-1/2 rounded-lg bg-sky-400 py-2 text-sm font-medium text-black hover:bg-sky-300 transition cursor-pointer"
              onClick={() => handleSendRequest("interested", _id)}
            >
              Connect
            </button>
          </div>

          <p
            className="mt-4 text-right text-sm text-sky-400 hover:underline cursor-pointer"
            onClick={() => navigate(`/view/profile/${_id}`)}
          >
            View full profile →
          </p>
        </>
      )}
    </div>
  );
};

export default UserCard;
