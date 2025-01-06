import { IconButton, Typography, Grid } from "@mui/material";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

const CalendarControls = ({ currentMonth, setCurrentMonth }) => {
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

  const getMonthName = (date) => {
    return date.toLocaleString("default", { month: "long" });
  };

  return (
    <Grid container justifyContent="space-between" alignItems="center" className="p-5">
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
  );
};

export default CalendarControls;
