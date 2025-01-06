import React, { useContext, useEffect, useState } from "react";
import RandevuTakvim from "./RandevuTakvim";
import BerberRandevulari from "./BerberRandevulari";
import { AuthContext } from "../firebase/context/AuthContext";
import AuthNav from "../Layout/AuthNav";

const HomePage = () => {
  const { girisKullanici } = useContext(AuthContext); // Giriş yapan berberin bilgisi
  const berberler = {
    name: "mehmet",
  };
  const [isBerber, setIsBerber] = useState(false);
  useEffect(() => {
    if (girisKullanici) {
      if (girisKullanici.displayName === berberler.name) {
        setIsBerber(true);
      }
    }
  }, [girisKullanici]);

  return (
    <div>
      <AuthNav />
      {isBerber ? <BerberRandevulari /> : <RandevuTakvim />}
    </div>
  );
};

export default HomePage;
