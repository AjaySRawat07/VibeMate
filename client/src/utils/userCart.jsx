import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { BASE_URL1, BASE_URL5 } from "./constants";
import { removeUserFeed } from "../store/feedStore";

const UserCart = ({ user }) => {
  const { _id, firstName, lastName, photoURL, gender, about, skills, age } =
    user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL5 + "/request/send/" + status + "/" + userId,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeUserFeed(userId));
    } catch (err) {
      console.error("Error in handle send request", err);
    }
  };

  return (
    <>
      <div className="card bg-base-300 w-96 shadow-sm">
        <figure>
          <img src={photoURL} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          <p>{about}</p>
          <div>{age + ", " + gender}</div>
          <p>{"skills:  " + skills}</p>
          <div className="card-actions justify-between">
            <button
              className="btn btn-primary"
              onClick={() => handleSendRequest("ignore", _id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handleSendRequest("interested", _id)}
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCart;
