import React, { useEffect } from "react";
import axios from "axios";
import { url } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed, setHasMore, incrementPage } from "../utils/feedSlice";
import UserCard from "./UserCard";
const Feed = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch = useDispatch();
  const users = useSelector((store) => store.feed.users);
  const hasMore = useSelector((store) => store.feed.hasMore);
  const page = useSelector((store) => store.feed.page);

  const getFeed = async () => {
    console.log("Feed fetched successfully");
    try {
      const res = await axios.get(`${url}/feed/?page=${page}&limit=10`, {
        withCredentials: true,
      });
      dispatch(addFeed(res.data.users));
      console.log(res.data.users);

      if (res.data.users.length < 10) {
        dispatch(setHasMore(false));
      } else {
        dispatch(setHasMore(true));
        dispatch(incrementPage());
      }
    } catch (error) {
      console.error("Error fetching feed:", error);
      return;
    }
  };

  useEffect(() => {
    if (users.length === 0) {
      getFeed();
    }
  }, []);

  const handleAction = () => {
    if (users.length < 5 && hasMore) {
      getFeed();
    }
  };
  if (!users.length) {
    return (
      <div className="min-h-screen bg-slate-950 text-white text-center flex items-center justify-center">
        {hasMore ? "Loading more users..." : "No more users to show!"}
      </div>
    );
  }
  if (!users.length && hasMore) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-[360px] rounded-2xl border border-slate-800 bg-slate-900 p-6 animate-pulse">
          <div className="h-16 w-16 rounded-full bg-slate-800 mb-4"></div>
          <div className="h-4 w-3/4 bg-slate-800 mb-2"></div>
          <div className="h-3 w-1/2 bg-slate-800 mb-4"></div>
          <div className="h-6 w-full bg-slate-800"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950  py-8">
      {/* Page Header */}
      <div className="max-w-5xl mx-auto mb-6">
        <h1 className="text-xl font-semibold text-white">Explore Developers</h1>
        <p className="text-sm text-slate-400">
          Connect with developers to collaborate on projects and ideas
        </p>
      </div>

      {/* Feed Content */}
      <div className="flex justify-center items-center mt-10">
        {users[0] ? (
          <UserCard
            user={users[0]}
            onAction={handleAction}
            isOnEdit={false}
            isConnection={false}
          />
        ) : (
          <div className="text-slate-400 text-center">
            {hasMore ? "Loading developers..." : "No more developers to show"}
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed;
