import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../store/requestConnection";
import axios from "axios";
import { BASE_URL3, BASE_URL4 } from "../utils/constants";
import FeedShimmer from "../utils/feedShimmerUi";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const handleRequests = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL4 + "/request/send/" + status + "/" + _id,
        {},
        {
          withCredentials: true,
        }
      );
      console.log("Requested", res);
      dispatch(removeRequest(_id));
    } catch (err) {}
  };

  const fetchData = async () => {
    try {
      const res = await axios.get(BASE_URL3 + "/user/requests/received", {
        withCredentials: true,
      });
      // console.log("Response data ", res?.data?.result);
      const data = res?.data?.result;
      if (Array.isArray(data) && data.length > 0) {
        dispatch(addRequests(data));
        setError("");
      }
      console.log(data);
    } catch (err) {
      console.error("Error in connections", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!requests) return;

  if (isLoading) {
    return <FeedShimmer />;
  }

  if (error) {
    return (
      <div className="text-center text-red-500 text-5xl m-20">{error}</div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center my-8">
      <h1 className="font-bold text-3xl ">Connection Requests</h1>

      {requests.map((request) => {
        const {
          _id,
          firstName,
          lastName,
          photoURL,
          age,
          gender,
          about,
          skills,
        } = request.fromUserId;

        return (
          <div className="card card-side bg-base-300 shadow-sm m-10" key={_id}>
            <figure>
              <img src={photoURL} alt="userPhoto" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{firstName + " " + lastName}</h2>
              <p>Age : {age}</p>
              <p>Gender : {gender}</p>
              <p>About : {about}</p>
              <p>
                Skills :{" "}
                {skills.map((i, id) => (
                  <span key={id}>{i + ",  "}</span>
                ))}
              </p>
              <div>
                <button
                  className="btn btn-secondary my-0.5 mx-1"
                  onClick={() =>
                    handleRequests("rejected", request.fromUserId._id)
                  }
                >
                  Reject
                </button>
                <button
                  className="btn btn-primary mx-1"
                  onClick={() =>
                    handleRequests("accepted", request.fromUserId._id)
                  }
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
