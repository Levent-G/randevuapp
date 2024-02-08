import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import {
    Typography,
 
  } from "@mui/material";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Register = () => {

  const [yukleniyor, setYukleniyor] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  // KAYIT OL START----------------------------------------------------------
  const SignUpFunction = async (e) => {
    e.preventDefault();
    setYukleniyor(true);
  
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      try {
        await updateProfile(res.user, {
          displayName: name,
        });
        toast.success("Kayıt Başarılı Lütfen Giriş Yapınız !");
        setYukleniyor(false);
 
      } catch (error) {
        toast.error(error.message);
        setYukleniyor(false);
      }
    } catch (error) {
      toast.error(error.message);
      setYukleniyor(false);
    }
  };
  //KAYIT OL END ----------------------------------------------------------------
  return (
    <div className="text-center w-1/2 justify-center ml-auto mr-auto mt-12 ">
      <Typography variant="h3" component="h3" >KAYIT OL</Typography>
      <form onSubmit={SignUpFunction}>
        <TextField
          value={name}
          id="text"
          label="name"
          variant="outlined"
          className="w-full mt-5"
          autoComplete="text"
          required
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          value={email}
          id="email"
          label="email"
          variant="outlined"
          autoComplete="email"
          required
          className="w-full mt-5"
          onChange={(e) => setEmail(e.target.value)}
          sx={{marginTop:"20px"}}
        />
        <TextField
          value={password}
          id="password"
          label="Password"
          type="password"
          required
          autoComplete="current-password"
          className="w-full mt-5"
          onChange={(e) => setPassword(e.target.value)}
          sx={{marginTop:"20px"}}
        />
        <TextField
          id="passwordAgain"
          label="passwordAgain"
          type="password"
          required
          autoComplete="current-password"
          className="w-full mt-5"
          sx={{marginTop:"20px"}}
        />
        {yukleniyor && (
          <span className="bg-blue-500">Yükleniyor lütfen bekleyiniz...</span>
        )}
      
        <button
          variant="contained"
          className=" bg-blue-950 p-4 text-white mt-5"
          type="submit"
        >
          SIGN UP
        </button>
        <p>
          Üyelik varsa{" "}
          <Link to="/login" className="text-red-500">
            Giriş Yapınız
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
