import axios from "axios";
import React, { useEffect } from "react";
import { url } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionsSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.Connections);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(`${url}/user/connections`, {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.error("Error fetching connections:", err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return null;

  /* Empty State */
  if (connections.length === 0) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center px-4">
        <h1 className="text-xl font-semibold text-white mb-2">
          No connections yet
        </h1>
        <p className="text-sm text-slate-400 text-center max-w-sm">
          Start connecting with developers from the feed to build your network.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8">
      
      {/* Page Header */}
      <div className="max-w-4xl mx-auto mb-6">
        <h1 className="text-xl font-semibold text-white">
          Your Connections
        </h1>
        <p className="text-sm text-slate-400">
          Developers you’re connected with
        </p>
      </div>

      {/* Connections List */}
      <div className="max-w-4xl mx-auto space-y-4">
        {connections.map(
          ({ _id, firstName, lastName, photoUrl, role, skills = [] }) => (
            <Link key={_id} to={`/view/profile/${_id}`}>
              <div className="flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-900 p-4 hover:bg-slate-800 transition">
                
                <img
                  src={photoUrl || "https://via.placeholder.com/64"}
                  alt="profile"
                  className="h-14 w-14 rounded-full object-cover border border-slate-700"
                />

                <div className="flex-1">
                  <h2 className="text-sm font-semibold text-white">
                    {firstName} {lastName}
                  </h2>

                  <p className="text-xs text-slate-400">
                    {role || "Developer"}
                  </p>

                  {skills.length > 0 && (
                    <div className="mt-1 flex flex-wrap gap-1">
                      {skills.slice(0, 4).map((skill, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] rounded-full bg-slate-800 px-2 py-[2px] text-slate-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <span className="text-sm text-sky-400">
                  View →
                </span>
              </div>
            </Link>
          )
        )}
      </div>
    </div>
  );
};

export default Connections;
