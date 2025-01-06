import { useEffect, useState, useRef } from "react";
import { db } from "../firebase";
import { collection, onSnapshot, query, where, doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const RandevuContext = (koleksiyon, _q) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);
  const q = useRef(_q).current;

  // Randevuyu güncelleme fonksiyonu
  const updateAppointmentStatus = async (appointmentId, newStatus) => {
    try {
      const appointmentRef = doc(db, koleksiyon, appointmentId);  // Randevunun referansını alıyoruz
      await updateDoc(appointmentRef, { isOnay: newStatus.isOnay }); // Veriyi güncelliyoruz

      toast.success("Randevu durumu güncellendi!");
      // Güncelleme sonrası veriyi tekrar çekme
      setDocuments((prevDocuments) =>
        prevDocuments.map((doc) =>
          doc.id === appointmentId ? { ...doc, isOnay: newStatus.isOnay } : doc
        )
      );
    } catch (error) {
      console.log(error.message);
      setError("Randevu durumu güncellenirken hata oluştu!");
      toast.error("Bir hata oluştu!");
    }
  };

  useEffect(() => {
    let ref = collection(db, koleksiyon);
    if (q) {
      ref = query(ref, where(...q));
    }

    const unsub = onSnapshot(
      ref,
      (snap) => {
        let dizi = [];
        snap.docs.forEach((doc) => {
          dizi.push({ ...doc.data(), id: doc.id });
        });
        setDocuments(dizi);
        setError(null);
      },
      (error) => {
        console.log(error.message);
        setError("Verilere Erişilemedi !");
      }
    );

    return () => unsub();
  }, [koleksiyon, q]);

  return { documents, error, updateAppointmentStatus };
};
