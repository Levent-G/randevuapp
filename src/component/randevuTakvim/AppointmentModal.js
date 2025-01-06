import ModalComp from "../../component/ModalComp";

const AppointmentModal = ({ open, setOpen, selectedDate, selectedHour, randevuName, girisKullanici }) => {
  return (
    <ModalComp
      open={open}
      setOpen={setOpen}
      selectedDate={selectedDate}
      selectedHour={selectedHour}
      params={randevuName}
      randevuAlan={girisKullanici}
    />
  );
};

export default AppointmentModal;
