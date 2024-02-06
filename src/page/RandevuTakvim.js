import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  Grid,
  IconButton,
  Button,
  MenuItem,
  Menu,
} from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
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
const RandevuTakvim = () => {
  const randevuName = useParams();
  console.log(randevuName);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedHour, setSelectedHour] = useState(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [appointments, setAppointments] = useState([
    { date: "2024-02-01", name: "Alice", hours: ["10:00", "11:00"] },
    { date: "2024-02-05", name: "Bob", hours: ["13:00", "14:00", "15:00"] },
    {
      date: "2024-02-07",
      name: "Charlie",
      hours: ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"],
    },
    {
      date: "2024-02-08",
      name: "Alice",
      hours: [
        "09:00",
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00",
      ],
    },
    // Add example data here.
  ]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    return new Date(year, month, 0).getDate();
  };

  const getMonthName = (date) => {
    return date.toLocaleString("default", { month: "long" });
  };

  const previousMonth = () => {
    const prevMonth = new Date(currentMonth);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    setCurrentMonth(prevMonth);
  };

  const nextMonth = () => {
    const nextMonth = new Date(currentMonth);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    setCurrentMonth(nextMonth);
  };

  const isDateBooked = (date) => {
    const appointment = appointments.find(
      (appointment) => appointment.date === date
    );
    if (appointment) {
      const bookedHours = appointment.hours.map((hour) =>
        parseInt(hour.split(":")[0])
      );
      for (let hour = 9; hour <= 19; hour++) {
        if (!bookedHours.includes(hour)) {
          return false; // En az bir saat boş
        }
      }
      return true; // Tüm saatler dolu
    }
    return false; // Hiç randevu yok
  };

  const isHourBooked = (date, hour) => {
    const appointment = appointments.find(
      (appointment) => appointment.date === date
    );
    if (appointment) {
      return appointment.hours.includes(hour);
    }
    return false;
  };

  const handleDayClick = (date) => {
    if (new Date(date) < new Date()) {
      return; // Geçmiş tarihler için işlem yapma
    }
    setSelectedDate(date);
    setSelectedHour(null);
  };

  const handleHourClick = (hour) => {
    if (!isHourBooked(selectedDate, hour)) {
      setSelectedHour(hour);
    }
    setMenuAnchorEl(null);
  };

  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const renderCalendarDays = () => {
    const today = new Date().getDate();
    const currentYear = new Date().getFullYear();
    const currentMonthIndex = new Date().getMonth() + 1;
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDayOfMonth = new Date(
      currentYear,
      currentMonthIndex - 1,
      1
    ).getDay();
    const daysArray = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      daysArray.push(<Grid key={`empty-${i}`} item xs />);
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const date = `${currentMonth.getFullYear()}-${String(
        currentMonth.getMonth() + 1
      ).padStart(2, "0")}-${String(i).padStart(2, "0")}`;
      const isBooked = isDateBooked(date);
      const isToday =
        i === today && currentMonth.getMonth() === new Date().getMonth();
      const isSelected = selectedDate === date;
      const isPastDate = new Date(date) < new Date();
      daysArray.push(
        <Grid
          key={i}
          item
          xs={2} // Set width to 2 grid units
          onClick={() => handleDayClick(date)}
          style={{
            border: "solid 1px",
            borderColor: isToday ? "gray" : "black",
            backgroundColor: isSelected
              ? "blue"
              : isBooked
              ? "#f43535"
              : isToday
              ? "#f0f0f0"
              : isPastDate
              ? "gray"
              : "#19d341",
            color: isSelected ? "white" : "black",
            cursor: isPastDate ? "not-allowed" : "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50px",
          }}
        >
          <Typography variant="body1">{i}</Typography>
        </Grid>
      );
    }

    return daysArray;
  };

  const renderAppointmentMenu = () => {
    const hours = Array.from(
      { length: 12 },
      (_, i) => String(i + 9).padStart(2, "0") + ":00"
    );
    return (
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
      >
        {hours.map((hour) => (
          <Button onClick={handleOpen}>
            <MenuItem
              key={hour}
              onClick={() => handleHourClick(hour)}
              disabled={isHourBooked(selectedDate, hour)}
              style={{
                color: isHourBooked(selectedDate, hour) ? "#ff0000" : "green",
              }}
            >
              {hour}
            </MenuItem>
          </Button>
        ))}
      </Menu>
    );
  };

  return (
    <div className="ml-12 mr-12 mt-5">
       <Typography variant="h4" align="center" className="mb-5">RANDEVU İÇİN TARİH SEÇİNİZ</Typography>
      <Grid container spacing={0} className="bg-gray-100 ">
        <Grid item xs={12} className="p-5">
          <Grid container justifyContent="space-between" alignItems="center" className="p-5">
            <Grid item >
              <IconButton onClick={previousMonth} ><ArrowLeftIcon /></IconButton>
            </Grid>
            <Grid item>
              <Typography variant="h5" align="center">
                {getMonthName(currentMonth)} {currentMonth.getFullYear()}
              </Typography>
            </Grid>
            <Grid item>
              <IconButton onClick={nextMonth}><ArrowRightIcon/></IconButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} className="p-12">
          <Grid container spacing={0} justifyContent="center">
            {renderCalendarDays()}
          </Grid>
        </Grid>
        {selectedDate && (
          <Grid item xs={12}>
            <Grid
              container
              spacing={0}
              justifyContent="center"
              alignItems="center"
              className="mt-5"
            >
              <Button
                variant="outlined"
                onClick={handleMenuOpen}
                className="mt-5 bg-blue-400 p-4 text-white"
              >
                {selectedDate} / Tarihi İçin Randevu Saatini seç
              </Button>
              {renderAppointmentMenu()}
            </Grid>
          </Grid>
        )}
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            RANDEVU SEÇME
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            GEREKLİ BİLGİLER
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default RandevuTakvim;
