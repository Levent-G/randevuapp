import React, { useContext, useEffect } from "react";
import AuthNav from "../Layout/AuthNav";
import { AuthContext } from "../firebase/context/AuthContext";
import { RandevuContext } from "../firebase/context/RanedevuContext";
import RandevuCard from "../component/RandevuCard";
import Grid from "@mui/material/Grid";

import Box from "@mui/material/Box";
const RandevuTakip = () => {
  const { girisKullanici } = useContext(AuthContext);

  const { documents, error } = RandevuContext("randevular", [
    "id",
    "==",
    girisKullanici.uid,
  ]);

  return (
    <div>
      <AuthNav />
      <div className="notlar">
        {error && <div className="error">{error}</div>}
        <Box sx={{ width: "100%",marginLeft:"30px" }}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            {documents &&
              documents.map((doc) => (
                <>
                  <Grid xs={12} md={3}>
                    <RandevuCard randevu={doc} />
                  </Grid>
                </>
              ))}{" "}
          </Grid>
        </Box>
      </div>
    </div>
  );
};

export default RandevuTakip;
