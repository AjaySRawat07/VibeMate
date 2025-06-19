import axios from "axios";
import React, { useState } from "react";
import { BASE_URL1 } from "../utils/constants";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";

const Signup = () => {
  const [inputValue, setInputValue] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    gender: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const handleClick = async () => {
    const { firstName, lastName, email, password, phoneNumber, gender } =
      inputValue;
    try {
      const res = await axios.post(
        BASE_URL1 + "/register",
        { firstName, lastName, phoneNumber, password, email, gender },
        { withCredentials: true }
      );
      console.log(res);
      if (res.data.success) {
        console.log("Signup success:", res);
        dispatch(addUser(res?.data?.data));
        return navigate("/profile");
      } else {
        console.warn("Signup failed:", res.data.message);
      }
    } catch (err) {
      if (err.response) {
        console.error("Signup error response:", err.response.data);
      } else {
        console.error("Error while sign-up:", err.message);
      }
    }
  };
  return (
    <div className="flex justify-center items-center m-2">
      <div className="card w-3/12 bg-base-200 shadow-sm py-5 flex justify-center items-center">
        <fieldset className="fieldset">
          <legend className="fieldset-legend">FirstName</legend>
          <input
            type="text"
            name="firstName"
            className="input"
            placeholder="Type here"
            onChange={changeHandler}
          />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">LastName</legend>
          <input
            type="text"
            name="lastName"
            className="input"
            placeholder="Type here"
            onChange={changeHandler}
          />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Email</legend>
          <input
            type="email"
            name="email"
            className="input"
            placeholder="Type here"
            onChange={changeHandler}
          />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">PhoneNumber</legend>
          <input
            type="number"
            name="phoneNumber"
            className="input"
            placeholder="Type here"
            onChange={changeHandler}
          />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Password</legend>
          <input
            type="password"
            name="password"
            className="input"
            required
            placeholder="Password"
            minLength="8"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            onChange={changeHandler}
          />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Gender</legend>
          <input
            type="text"
            name="gender"
            className="input"
            placeholder="male | female | other"
            onChange={changeHandler}
          />
        </fieldset>
        <button className="btn btn-ghost bg-secondary" onClick={handleClick}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Signup;
