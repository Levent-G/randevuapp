import { useEffect, useState, useRef } from "react";
import { db } from "../firebase";
import {
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
export const RandevuContext = (koleksiyon, _q, ) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  const q = useRef(_q).current;


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

  return { documents, error };
};
