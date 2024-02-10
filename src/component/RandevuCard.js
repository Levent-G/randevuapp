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
        <Typography variant="h4" className="text-center">
          RANDEVU
        </Typography>
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            Randevu Alan:{" "}
            <span className="uppercase">{props.randevu.randevuAlan}</span>
          </Typography>
          <Typography gutterBottom variant="h7" component="div">
            Randevu Email:{" "}
            <span className="uppercase">{props.randevu.randevuAlanEmail}</span>
          </Typography>
        </CardContent>
        <div className="bg-gray-200 p-5">
          <Typography variant="h6">
            Randevu Berber :{" "}
            <span className="uppercase">{props.randevu.berberSecim}</span>
          </Typography>
          <Typography variant="h7">
            Randevu Not : {props.randevu.not}
          </Typography>
        </div>

        <CardActions className="mt-5">
          <Typography variant="h6">
            Randevu Tarihi : {props.randevu.randevuTarihi}
          </Typography>
          <Typography variant="h6">
            Randevu Saati : {props.randevu.randevuSaati}
          </Typography>
        </CardActions>
        <Typography variant="h6" className="bg-gray-200 p-5">
          Randevu Onaylanma Durumu :{" "}
          {props.randevu.iptalDurum == null ? (
            <span className="bg-red-500 p-1 text-white uppercase">Onaylanmadı</span>
          ) : (
            <span className="bg-green-500 p-1 text-white uppercase">
              {props.randevu.iptalDurum}
            </span>
          )}
        </Typography>
      </Card>
    </div>
  );
};

export default RandevuCard;
