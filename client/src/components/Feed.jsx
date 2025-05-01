// src/components/Feed.jsx
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
    try {
      const res = await axios.get(BASE_URL3 + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data || []));
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  return Array.isArray(feed) && feed.length > 0 ? (
    <div className="flex justify-center items-center my-10">
      <UserCart user={feed[0]} />
    </div>
  ) : (
    <FeedShimmer />
  );
};

export default Feed;
