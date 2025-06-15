import React, { useEffect } from "react";
import FeedShimmer from "../utils/feedShimmerUi";
import axios from "axios";
import { BASE_URL2, BASE_URL3 } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../store/feedStore";
import UserCart from "../utils/userCart";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  console.log(feed);
  const dispatch = useDispatch();
  const getFeed = async () => {
    // if (feed && feed.length > 0) return;
    try {
      const res = await axios.get(BASE_URL3 + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data));
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) return;

  if (feed.length <= 0) {
    return (
      <div className="flex flex-col justify-center items-center m-10">
        <span className="loading loading-dots loading-xl p-10"></span>
        <h1 className="text-2xl font-semibold text-red-300 italic">
          {" "}
          No new users found
        </h1>
      </div>
    );
  }

  return feed.length > 0 ? (
    <div className="flex justify-center items-center my-10">
      <UserCart user={feed[0]} />
    </div>
  ) : (
    <FeedShimmer />
  );
};

export default Feed;
