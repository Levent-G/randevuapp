import React from "react";
import { Link } from "react-router-dom";
const Nav = () => {
  return (
    <>
      <div className="bg-gray-200 p-3">
        <p className=" float-left p-3">RANDEVU APP</p>
        <ul className="p-3 text-right ">
          <Link to="/">
            <li className="inline m-2">
              <span>Home</span>
            </li>
          </Link>
          <Link to="/login">
            <li className="inline m-2">
              <span>Randevu</span>
            </li>
          </Link>
        </ul>
      </div>
    </>
  );
};

export default Nav;
