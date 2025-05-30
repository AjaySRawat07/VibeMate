import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL3 } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../store/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const fetchData = async () => {
    try {
      const res = await axios.post(
        BASE_URL3 + "/user/connections",
        {},
        {
          withCredentials: true,
        }
      );
      console.log("Response data ", res?.data?.data);
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.error("Error in connections", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!connections) return;

  if (connections.length === 0) return <h1>No Connection Found</h1>;

  return (
    <div className="flex flex-col justify-center items-center my-8">
      <h1 className="font-bold text-3xl">Connections</h1>

      {connections.map((connection, id) => {
        const { firstName, lastName, photoURL, age, gender, about, skills } =
          connection;

        return (
          <div className="card card-side bg-base-300 shadow-sm m-10" key={id}>
            <figure>
              <img src={photoURL} alt="userPhoto" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{firstName + " " + lastName}</h2>
              <p>Age : {age}</p>
              <p>Gender : {gender}</p>
              <p>About : {about}</p>
              <p>Skills : {skills}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
