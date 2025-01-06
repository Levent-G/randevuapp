import { Grid, Typography } from "@mui/material";

export const CalendarDay = ({
    date,
    isBooked,
    isToday,
    isSelected,
    isPastDate,
    handleDayClick,
  }) => {
    // date'i Date objesine dönüştürme
    const dayDate = new Date(date);
  
    return (
      <Grid
        item
        xs={2}
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
        <Typography variant="body1">{dayDate.getDate()}</Typography> {/* Günün sayısını al */}
      </Grid>
    );
  };
  