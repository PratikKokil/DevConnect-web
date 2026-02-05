import React from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { url } from "../utils/constants";
import { removeRequest } from "../utils/requestsSlice";

const Requests = () => {
  const requests = useSelector((store) => store.Requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status, id) => {
    try {
      await axios.post(
        `${url}/request/review/${status}/${id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(id));
    } catch (error) {
      console.log(error);
    }
  };

  /* Loading */
  if (!requests) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="animate-pulse text-slate-400">
          Loading requests…
        </div>
      </div>
    );
  }

  /* Empty State */
  if (requests.length === 0) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center px-4">
        <h1 className="text-xl font-semibold text-white mb-2">
          No connection requests
        </h1>
        <p className="text-sm text-slate-400 text-center max-w-sm">
          When developers send you requests, they’ll appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8">
      
      {/* Page Header */}
      <div className="max-w-4xl mx-auto mb-6">
        <h1 className="text-xl font-semibold text-white">
          Connection Requests
        </h1>
        <p className="text-sm text-slate-400">
          Review and manage incoming requests
        </p>
      </div>

      {/* Requests List */}
      <div className="max-w-4xl mx-auto space-y-4">
        {requests.map((request) => {
          const { firstName, lastName, photoUrl, about } =
            request.fromUserId;

          return (
            <div
              key={request._id}
              className="flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-900 p-4"
            >
              {/* Avatar */}
              <img
                src={photoUrl || "https://via.placeholder.com/64"}
                alt="profile"
                className="h-14 w-14 rounded-full object-cover border border-slate-700"
              />

              {/* Info */}
              <div className="flex-1">
                <h2 className="text-sm font-semibold text-white">
                  {firstName} {lastName}
                </h2>
                <p className="text-xs text-slate-400 line-clamp-2">
                  {about || "No bio provided"}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  className="rounded-lg border border-slate-700 px-4 py-1.5 text-sm text-slate-300 hover:bg-slate-800 transition"
                  onClick={() =>
                    reviewRequest("rejected", request._id)
                  }
                >
                  Reject
                </button>

                <button
                  className="rounded-lg bg-sky-400 px-4 py-1.5 text-sm font-medium text-black hover:bg-sky-300 transition"
                  onClick={() =>
                    reviewRequest("accepted", request._id)
                  }
                >
                  Accept
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
