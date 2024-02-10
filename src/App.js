import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./firebase/context/AuthContext";
import HomePage from "./page/HomePage";
import Nav from "./Layout/Nav";
import Login from "./page/Login";
import RandevuTakvim from "./page/RandevuTakvim";
import { ToastContainer } from "react-toastify";
import Register from "./page/Register";
import RandevuTakip from "./page/RandevuTakip";
function App() {
  const { girisKullanici } = useContext(AuthContext);

  const YonlendirmeKontrol = ({ children }) => {
    if (!girisKullanici) {
      return <Navigate to="/login" />;
    }
    return children;
  };
  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/randevu/takvim"
            index
            element={
              <YonlendirmeKontrol>
                <RandevuTakvim />
              </YonlendirmeKontrol>
            }
          />

          <Route
            path="/randevu/takip"
            index
            element={
              <YonlendirmeKontrol>
                <RandevuTakip />
              </YonlendirmeKontrol>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
