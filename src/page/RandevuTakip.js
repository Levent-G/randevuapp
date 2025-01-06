import React, { useContext } from "react";
import AuthNav from "../Layout/AuthNav";
import { AuthContext } from "../firebase/context/AuthContext";
import { RandevuContext } from "../firebase/context/RanedevuContext";
import RandevuCard from "../component/RandevuCard";
import Grid from "@mui/material/Grid";

import Box from "@mui/material/Box";
import { Container } from "@mui/material";
const RandevuTakip = () => {
  const { girisKullanici } = useContext(AuthContext);

  const { documents, error } = RandevuContext("randevular", [
    "id",
    "==",
    girisKullanici?.uid,
  ]);

  console.log(girisKullanici, "kullanici");
  return (
    <div>
      <AuthNav />
      {documents?.length !== 0 ? (
        <div className="notlar">
          <Container>
            {error && <div className="error">{error}</div>}
            <Box sx={{ width: "100%" }}>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                {documents &&
                  documents.map((doc) => (
                    <>
                      <Grid xs={12} md={4}>
                        <RandevuCard randevu={doc} />
                      </Grid>
                    </>
                  ))}{" "}
              </Grid>
            </Box>
          </Container>
        </div>
      ) : (
        <p>hiç randevunuz bulunmamakta</p>
      )}
    </div>
  );
};

export default RandevuTakip;
