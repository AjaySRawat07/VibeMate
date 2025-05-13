import React from "react";

const UserCart = ({ user }) => {
  const { firstName, lastName, photoURL, gender, about, skills, age } = user;
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
            <button className="btn btn-primary">Ignore</button>
            <button className="btn btn-secondary">Interested</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCart;
