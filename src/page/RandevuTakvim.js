import React, { useState, useContext } from "react";
import { Grid, Button, Typography } from "@mui/material";
import { AuthContext } from "../firebase/context/AuthContext";
import { RandevuContext } from "../firebase/context/RanedevuContext";
import AppointmentMenu from "../component/randevuTakvim/AppointmentMenu";
import CalendarControls from "../component/randevuTakvim/CalendarControls";
import AppointmentModal from "../component/randevuTakvim/AppointmentModal";
import { CalendarDay } from "../component/randevuTakvim/CalendarDay";

const RandevuTakvim = () => {
  const randevuName = "levent";
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedHour, setSelectedHour] = useState(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const { documents } = RandevuContext("randevular");
  const { girisKullanici } = useContext(AuthContext);

  const appointments = documents?.map((doc) => ({
    date: doc?.randevuTarihi,
    name: doc?.randevuAlan,
    hours: [doc?.randevuSaati],
  }));

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);

  const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

  const isHourBooked = (date, hour) => {
    const appointmentsOnDate = appointments?.filter(
      (appointment) => appointment.date === date
    );
    const allHours = appointmentsOnDate?.flatMap((appointment) => appointment.hours);
    return allHours?.includes(hour);
  };

  const handleDayClick = (date) => {
    if (new Date(date) < new Date()) return; // Geçmiş tarihler için işlem yapma
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

  const renderCalendarDays = () => {
    const today = new Date().getDate();
    const currentYear = new Date().getFullYear();
    const currentMonthIndex = new Date().getMonth() + 1;
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDayOfMonth = new Date(currentYear, currentMonthIndex - 1, 1).getDay();
    const daysArray = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      daysArray.push(<Grid key={`empty-${i}`} item xs />);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const date = `${currentMonth.getFullYear()}-${String(
        currentMonth.getMonth() + 1
      ).padStart(2, "0")}-${String(i).padStart(2, "0")}`;
      const isBooked = isHourBooked(date);
      const isToday = i === today && currentMonth.getMonth() === new Date().getMonth();
      const isSelected = selectedDate === date;
      const isPastDate = new Date(date) < new Date();
      daysArray.push(
        <CalendarDay
          key={i}
          date={date}
          isBooked={isBooked}
          isToday={isToday}
          isSelected={isSelected}
          isPastDate={isPastDate}
          handleDayClick={handleDayClick}
        />
      );
    }

    return daysArray;
  };

  return (
    <div className="ml-12 mr-12 mt-5">
      {selectedDate && (
        <Grid item xs={12}>
          <Grid container spacing={0} justifyContent="center" alignItems="center" className="mb-5">
            <Button
              variant="outlined"
              onClick={(event) => setMenuAnchorEl(event.currentTarget)}
              className="mt-5 bg-blue-400 p-4 text-white"
            >
              {selectedDate} / Tarihi İçin Randevu Saatini seç
            </Button>
            <AppointmentMenu
              menuAnchorEl={menuAnchorEl}
              setMenuAnchorEl={setMenuAnchorEl}
              selectedDate={selectedDate}
              handleHourClick={handleHourClick}
              isHourBooked={isHourBooked}
            />
          </Grid>
        </Grid>
      )}
      <Typography variant="h4" align="center" className="mb-5">
        RANDEVU İÇİN TARİH SEÇİNİZ
      </Typography>
      <Grid container spacing={0} className="bg-gray-100 ">
        <Grid item xs={12} className="p-5">
          <CalendarControls currentMonth={currentMonth} setCurrentMonth={setCurrentMonth} />
        </Grid>
        <Grid item xs={12} className="p-12">
          <Grid container spacing={0} justifyContent="center">
            {renderCalendarDays()}
          </Grid>
        </Grid>
      </Grid>
      <AppointmentModal
        open={open}
        setOpen={setOpen}
        selectedDate={selectedDate}
        selectedHour={selectedHour}
        randevuName={randevuName}
        girisKullanici={girisKullanici}
      />
    </div>
  );
};

export default RandevuTakvim;
