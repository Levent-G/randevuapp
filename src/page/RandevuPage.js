import { Container } from "@mui/material";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";

const RandevuPage = () => {
  const [randevuIsım, setRandevuIsım] = useState("");
  const navigate = useNavigate();
  return (
    <div>
      <Container className=" text-center mt-12 ">
        <h1>Randevu İçin İsiminizi giriniz</h1>

        <div className="p-5">
          <TextField
            id="outlined-basic"
            required
            label="İsminiz"
            variant="outlined"
            value={randevuIsım}
            onChange={(e) => setRandevuIsım(e.target.value)}
          />
          <br />
          <button
            variant="contained"
            className="mt-5 bg-blue-400 p-3 text-white"
            onClick={()=> navigate(`/randevu/${randevuIsım}`)}
          >
            Onayla
          </button>
        </div>
      </Container>
    </div>
  );
};

export default RandevuPage;
