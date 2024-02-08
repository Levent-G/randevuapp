import React, { useContext } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { AuthContext } from "../firebase/context/AuthContext";
import { auth } from "../firebase/firebase";
import { signOut } from "firebase/auth";
import LogoutIcon from "@mui/icons-material/Logout";
import EmailIcon from "@mui/icons-material/Email";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
const AuthNav = () => {
  const { girisKullanici } = useContext(AuthContext);
  
  return (
    <>
      <div className="bg-gray-800 text-white">
        <ul className="p-3  ">
          <li className="inline ">
            <span>
              <AccountCircleIcon /> {girisKullanici.displayName}
            </span>
          </li>

          <li className="inline  float-right">
            <span>
              {" "}
              <button
                onClick={() => signOut(auth)}
                className="pl-4 text-red-700 hover:text-red-400"
              >
                <LogoutIcon />
              </button>
            </span>
          </li>
          <li className="inline  float-right hover:text-gray-400">
            <span>
              <EmailIcon />
            </span>
          </li>
          <li className="inline mr-3 float-right hover:text-gray-400">
            <span>
              <CalendarMonthIcon />
            </span>
          </li>
        </ul>
      </div>
    </>
  );
};

export default AuthNav;
