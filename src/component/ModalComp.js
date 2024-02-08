import React, { useState } from "react";
import { Typography, Box, TextField, MenuItem, Button } from "@mui/material";
import Modal from "@mui/material/Modal";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const ModalComp = (props) => {
  const handleClose = () => props.setOpen(false);
  const [berberSecim, setBerberSecim] = useState("");
  const [not, setNot] = useState("");
  const [control, setControl] = useState(false);
  const currencies = [
    {
      value: "ahmet",
      label: "ahmet",
    },
    {
      value: "mehmet",
      label: "mehmet",
    },
    {
      value: "cengiz",
      label: "cengiz",
    },
    {
      value: "murat",
      label: "murat",
    },
  ];
  return (
    <div>
      <Modal
        open={props.open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        

          <Typography
            id="modal-modal-title"
            variant="h5"
            component="h1"
            className="pb-5 "
          >
            RANDEVU Günü ve Saati <hr className="bg-black"/>
          </Typography>

          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h6"
            className="pb-5 text-white bg-gray-500 p-4"
          >
            Gün:  {props.selectedDate}
          </Typography>

          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h6"
            className="pb-5 text-white bg-gray-500 p-4"
          >
            Saat: {props.selectedHour} 
          </Typography><hr className="bg-black"/>

          <Typography
            id="modal-modal-title"
            variant="h5"
            component="h1"
            className="pb-5 "
          >
            RANDEVU Alamak istediğniz kişi ve notunuz <hr className="bg-black"/>
          </Typography>
          <TextField
            value={berberSecim}
            id="outlined-select-currency"
            select
            label="Berber"
            defaultValue="EUR"
            sx={{ marginTop: "20px" }}
            helperText="Lütfen berberinizi seçiniz"
            onChange={(e) => setBerberSecim(e.target.value)}
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            value={not}
            id="outlined"
            label="Berber not"
            type="text"
            required
            className="w-full mt-5"
            sx={{ marginTop: "40px" }}
            onChange={(e) => setNot(e.target.value)}
          />
          {control && (
            <>
              <p className="bg-gray-600 text-gray-200 p-4">
                <span className="uppercase font-bold text-white">
                  {props.params.name}
                </span>{" "}
                ismi ile{" "}
                <span className=" uppercase font-bold text-white">
                  {berberSecim}{" "}
                </span>
                berberinden,<span className="font-bold text-white">"{not}" </span>
                notu ile{" "}
                <span className="font-bold  text-white">
                  {props.selectedDate}
                </span>{" "}
                tarihinde saat:
                <span className="font-bold  text-white">
                  {props.selectedHour}
                </span>{" "}
                randevunuzu onaylıyor musunuz ?{" "}
              </p>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "green",
                  color: "white",
                  float: "left",
                  "&:hover": {
                    backgroundColor: "darkgreen",
                  },
                  marginTop: "40px",
                }}
                onClick={() => {
                  setControl(false);
                  alert("RANDEVUNUZ ALINMIŞTIR. BERBERİNİZ RANDEVUNUZU ONAYLADIĞINDA KONTROL EDEBİLİRSİNİZ");
                  setBerberSecim("");
                  setNot("");
                  handleClose();
                }}
              >
                Randevu Onayla
              </Button>
              <Button
                variant="outlined"
                sx={{
                  backgroundColor: "red",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "darkred",
                  },
                  marginTop: "10px",
                }}
                onClick={() => {
                  setControl(false);
                  handleClose();
                }}
              >
                Randevu Değiştir
              </Button>
            </>
          )}
          {!control && (
            <Button
              variant="outlined"
              onClick={() => setControl(true)}
              sx={{marginTop:"20px"}}
              className="mt-5 bg-blue-400 p-4 text-white"
            >
              Randevu Onayla
            </Button>
          )} <hr className="bg-black"/>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalComp;
