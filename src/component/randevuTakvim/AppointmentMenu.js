import { Menu, MenuItem } from "@mui/material";

const AppointmentMenu = ({ menuAnchorEl, setMenuAnchorEl, selectedDate, handleHourClick, isHourBooked }) => {
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const hours = Array.from({ length: 12 }, (_, i) => String(i + 9).padStart(2, "0") + ":00");

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
          disabled={isHourBooked(selectedDate, hour)} // Eğer saat doluysa disabled
          style={{
            color: isHourBooked(selectedDate, hour) ? "#ff0000" : "green", // Dolu saatler kırmızı
          }}
        >
          {hour}
        </MenuItem>
      ))}
    </Menu>
  );
};

export default AppointmentMenu;
