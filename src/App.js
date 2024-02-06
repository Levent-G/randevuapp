import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./page/HomePage";
import Nav from "./Layout/Nav";
import RandevuPage from "./page/RandevuPage";
import RandevuTakvim from "./page/RandevuTakvim";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/randevu" element={<RandevuPage />} />
          <Route path="/randevu/:name" element={<RandevuTakvim />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
