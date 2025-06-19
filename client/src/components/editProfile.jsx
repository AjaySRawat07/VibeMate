import React, { useState } from "react";
import UserCart from "../utils/userCart";
import axios from "axios";
import { BASE_URL2 } from "../utils/constants";
import { addUser } from "../store/userSlice";
import { useDispatch } from "react-redux";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age || "");
  const [photoURL, setPhotoURL] = useState(user.photoURL);
  const [about, setAbout] = useState(user.about || "");
  const [skills, setSkills] = useState(user.skills || "");
  const [gender, setGender] = useState(user.gender || "");
  const [error, setError] = useState("");
  const [toast, setToast] = useState(false);

  const dispatch = useDispatch();
  const saveProfile = async () => {
    setError("");
    try {
      let res = await axios.post(
        BASE_URL2 + "/profile/edit",
        {
          firstName,
          lastName,
          age,
          photoURL,
          about,
          skills,
        },
        {
          withCredentials: true,
          timeout: 2000,
        }
      );
      dispatch(addUser(res?.data?.data));
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 3000);
    } catch (error) {
      console.log("Error in save profile ", error);
      setError(error?.message);
    }
  };

  return (
    <div className="flex justify-center my-10 ">
      <div className="flex flex-col justify-center items-center bg-base-300 w-60 p-4">
        <fieldset className="fieldset">
          <legend className="fieldset-legend">FirstName</legend>
          <input
            type="text"
            className="input"
            value={firstName}
            placeholder="Type here"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">LastName</legend>
          <input
            type="text"
            value={lastName}
            className="input"
            placeholder="Type here"
            onChange={(e) => setLastName(e.target.value)}
          />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Age</legend>
          <input
            type="number"
            value={age}
            className="input"
            placeholder="Type here"
            onChange={(e) => setAge(e.target.value)}
          />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">PhotoURL</legend>
          <input
            type="text"
            value={photoURL}
            className="input"
            placeholder="Type here"
            onChange={(e) => setPhotoURL(e.target.value)}
          />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">About</legend>
          <input
            type="text"
            value={about}
            className="input"
            placeholder="Type here"
            onChange={(e) => setAbout(e.target.value)}
          />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Skills</legend>
          <input
            type="text"
            value={skills}
            className="input"
            placeholder="Type here"
            onChange={(e) => setSkills(e.target.value)}
          />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Gender</legend>
          <input
            type="text"
            value={gender}
            className="input"
            placeholder="Type here"
            onChange={(e) => setGender(e.target.value)}
          />
        </fieldset>
        <div className="bg-red-500 text-xl">{error}</div>
        <input
          type="submit"
          value="Submit"
          className="btn bg-indigo-600"
          onClick={saveProfile}
        />
      </div>

      <UserCart
        user={{ firstName, lastName, photoURL, age, about, skills, gender }}
      />
      {toast && (
        <div className="toast toast-bottom toast-start">
          <div className="alert alert-success">
            <span>Message sent successfully.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
