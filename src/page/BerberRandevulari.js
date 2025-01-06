import React, { useEffect, useState, useContext } from "react";
import { Card, CardContent, Typography, Grid, IconButton, Modal, Box, Button } from "@mui/material";
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { RandevuContext } from "../firebase/context/RanedevuContext";  // Burada doğru importu sağlıyoruz
import { AuthContext } from "../firebase/context/AuthContext";

const BerberRandevulari = () => {
  const { girisKullanici } = useContext(AuthContext); // Giriş yapan berberin bilgisi
  const { documents, error, updateAppointmentStatus } = RandevuContext("randevular"); // Fonksiyonu doğru şekilde alıyoruz
  const [randevular, setRandevular] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedRandevu, setSelectedRandevu] = useState(null); // Onaylanacak randevuyu saklamak için
  const [status,setStatus] = useState(false);

  useEffect(() => {
    // Eğer kullanıcı giriş yaptıysa, sadece o berbere ait randevuları filtrele
    if (girisKullanici) {
      const filteredAppointments = documents?.filter(
        (doc) => doc?.berberSecim === girisKullanici.displayName
      );
      setRandevular(filteredAppointments);
    }
  }, [documents, girisKullanici]);

  if (error) {
    return <Typography color="error">Veri yüklenemedi!</Typography>;
  }

  const handleDoneClick = (randevu) => {
    setSelectedRandevu(randevu);
    setStatus(true)
    setOpenModal(true); // Modalı açıyoruz
  };

  const handleCloseClick = (randevu) => {
    setSelectedRandevu(randevu);
    setStatus(false);
    setOpenModal(true); // Modalı açıyoruz
  };

  const handleConfirm = () => {
   
    if (selectedRandevu) {
      // Randevu durumunu güncelle
      updateAppointmentStatus(selectedRandevu.id, { isOnay: status });
      setOpenModal(false); // Modalı kapat
    }
  };

  return (
    <Grid container spacing={2}>
      {randevular?.length > 0
        ? randevular.map((randevu, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card variant="outlined" sx={{ position: "relative" }}>
                <CardContent>
                  <Typography variant="h6">{randevu?.randevuTarihi}</Typography>
                  <Typography variant="body2">
                    Saat: {randevu?.randevuSaati}
                  </Typography>
                  <Typography variant="body2" className="mb-5">
                    Randevu Alan: {randevu?.randevuAlan}
                  </Typography>
                  <Typography
                    variant="body2"
                    className={`p-1 text-white uppercase mt-5 text-center ${
                      randevu?.isOnay ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {randevu?.isOnay ? "Onaylandı" : "Onaylanmadı"}
                  </Typography>
                </CardContent>
                {/* Done ve Close Iconları */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 10,
                    right: 10,
                    display: "flex",
                    gap: "10px", // Iconlar arasında boşluk
                  }}
                >
                  <IconButton
                    onClick={() => handleDoneClick(randevu)}
                    color="primary"
                    disabled={randevu?.isOnay} // Eğer randevu zaten onaylıysa, butonu devre dışı bırak
                  >
                    <DoneIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleCloseClick(randevu)} // Burada Close iconu tıklanınca işlem yapılacak
                    color="secondary"
                  >
                    <CloseIcon />
                  </IconButton>
                </div>
              </Card>
            </Grid>
          ))
        : "Hiç randevu bulunmamaktadır."}
      
      {/* Modal */}
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: 24,
            width: 300,
            textAlign: "center",
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            Randevuyu {selectedRandevu?.isOnay ? "iptal etmek" : "onaylamak"} istiyor musunuz?
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Button
              onClick={() => handleConfirm()} 
              variant="contained"
              color="primary"
              sx={{ mr: 2 }}
            >
              Onayla
            </Button>
            <Button
              onClick={() => setOpenModal(false)} 
              variant="contained"
              color="secondary"
            >
              Vazgeç
            </Button>
          </Box>
        </Box>
      </Modal>
    </Grid>
  );
};

export default BerberRandevulari;
