import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

import Typography from "@mui/material/Typography";
const RandevuCard = (props) => {
  return (
    <div>
      <Card
        sx={{
          maxWidth: 345,
          margin: "20px",
          boxShadow: "5px 5px 5px 10px gray ",
          padding: "10px",
        }}
      >
        <Typography  className="text-center">
          RANDEVU
        </Typography>
        <CardContent >
          <Typography gutterBottom component="div">
            Randevu Alan:{" "}
            <span className="uppercase">{props.randevu.randevuAlan}</span>
          </Typography>
          <Typography gutterBottom  component="div">
            Randevu Email:{" "}
            <span className="uppercase">{props.randevu.randevuAlanEmail}</span>
          </Typography>
          <div className="bg-gray-200 p-5">
          <Typography >
            Randevu Berber :{" "}
            <span className="uppercase">{props.randevu.berberSecim}</span>
          </Typography>
          <Typography >
            Randevu Not : {props.randevu.not}
          </Typography>
        </div>
        </CardContent>
      

        <CardActions className="mt-5">
          <Typography >
            Randevu Tarihi : {props.randevu.randevuTarihi}
          </Typography>
          <Typography >
            Randevu Saati : {props.randevu.randevuSaati}
          </Typography>
        </CardActions>
        <Typography  className="bg-gray-200 p-5">
          Randevu Onaylanma Durumu :{" "}
          {props.randevu?.isOnay == null ? (
            <span className="bg-red-500 p-1 text-white uppercase">Onaylanmadı</span>
          ) : (
            <span className="bg-green-500 p-1 text-white uppercase">
               Onaylandı
            </span>
          )}
        </Typography>
      </Card>
    </div>
  );
};

export default RandevuCard;
