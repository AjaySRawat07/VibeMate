import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  // console.log(user);

  return (
    <Fragment>
      <div className="navbar bg-accent">
        <div className="flex-1">
          <Link className="btn btn-ghost text-xl" to="/">
            VibeMate
          </Link>
        </div>
        {user && (
          <div className="flex justify-center items-center gap-2">
            <div className="form-control font-semibold text-xl">
              Welcome , {user.firstName}
            </div>
            <div className="dropdown dropdown-end mx-4">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link className="justify-between" to="/profile">
                    Profile
                  </Link>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Navbar;
