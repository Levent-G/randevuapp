import React, { useState, useContext } from "react";
import {
  Typography,
  Grid,
  IconButton,
  Button,
  MenuItem,
  Menu,
} from "@mui/material";

import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ModalComp from "../component/ModalComp";
import AuthNav from "../Layout/AuthNav";
import { AuthContext } from "../firebase/context/AuthContext";
import { RandevuContext } from "../firebase/context/RanedevuContext";
const RandevuTakvim = () => {
  const randevuName = "levent";

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedHour, setSelectedHour] = useState(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  const { documents, error } = RandevuContext("randevular");

  const appointments = documents?.map((doc) => ({
    date: doc?.randevuTarihi,
    name: doc?.randevuAlan,
    hours: [doc?.randevuSaati],
  }));
  console.log(appointments);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const { girisKullanici } = useContext(AuthContext);
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
    const appointment = appointments?.filter(
      (appointment) => appointment.date === date
    );
  
    if (appointment?.length === 0) {
      return false; // Hiç randevu yok
    }
  
    const allHours = appointment?.flatMap((appt) => appt.hours.map(hour => parseInt(hour.split(":")[0])));
    const allDayHours = Array.from({ length: 11 }, (_, i) => i + 9); // Gün içindeki tüm saatler (9'dan 19'a kadar)
    
    return allDayHours.every(hour => allHours?.includes(hour));
  };
  const isHourBooked = (date, hour) => {
    // Belirli bir tarihte olan tüm randevuları al
    const appointmentsOnDate = appointments?.filter(
      (appointment) => appointment.date === date
    );

    // Eğer hiç randevu yoksa
    if (appointmentsOnDate?.length === 0) {
      return false;
    }

    // Tüm randevuların saatlerini birleştir
    const allHours = appointmentsOnDate.flatMap(
      (appointment) => appointment.hours
    );

    // Belirli bir saat dolu mu kontrol et
    return allHours.includes(hour);
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
      handleOpen();
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
        ))}
      </Menu>
    );
  };

  return (
    <>
      <AuthNav />
      <div className="ml-12 mr-12 mt-5">
        {selectedDate && (
          <Grid item xs={12}>
            <Grid
              container
              spacing={0}
              justifyContent="center"
              alignItems="center"
              className="mb-5"
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
        <Typography variant="h4" align="center" className="mb-5">
          RANDEVU İÇİN TARİH SEÇİNİZ
        </Typography>
        <Grid container spacing={0} className="bg-gray-100 ">
          <Grid item xs={12} className="p-5">
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              className="p-5"
            >
              <Grid item>
                <IconButton onClick={previousMonth}>
                  <ArrowLeftIcon />
                </IconButton>
              </Grid>
              <Grid item>
                <Typography variant="h5" align="center">
                  {getMonthName(currentMonth)} {currentMonth.getFullYear()}
                </Typography>
              </Grid>
              <Grid item>
                <IconButton onClick={nextMonth}>
                  <ArrowRightIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} className="p-12">
            <Grid container spacing={0} justifyContent="center">
              {renderCalendarDays()}
            </Grid>
          </Grid>
        </Grid>
        <ModalComp
          open={open}
          setOpen={setOpen}
          selectedDate={selectedDate}
          selectedHour={selectedHour}
          params={randevuName}
          randevuAlan={girisKullanici}
       
        />
      </div>
    </>
  );
};

export default RandevuTakvim;
