import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./firebase/context/AuthContext";
import HomePage from "./page/HomePage";
import Nav from "./Layout/Nav";
import Login from "./page/Login";
import RandevuTakvim from "./page/RandevuTakvim";
import { ToastContainer } from "react-toastify";
import Register from "./page/Register";
function App() {
  const { girisKullanici } = useContext(AuthContext);

  const YonlendirmeKontrol = ({ children }) => {
    if (!girisKullanici) {
      return <Navigate to="/" />;
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
          <Route path="/register" element={<Register/>}/>
          <Route
              path="/randevu/takvim"
              index
              element={
                <YonlendirmeKontrol>
                  <RandevuTakvim />
                </YonlendirmeKontrol>
              }
            />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
