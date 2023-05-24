import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebase_config";

export const useDocument = (c, id) => {
  const [document, setDocument] = useState(null);

  useEffect(() => {
    // NOTE here is a good example of how to get a snapshot of a single doc using Firebase 9
    const unsub = async () => {
      const docRef = doc(db, c, id);
      const doc = onSnapshot(docRef, (snapshot) => {
        if (snapshot.exists()) {
          setDocument(snapshot.data());
        }
      });
    };
    return () => unsub();
  }, [c, id]);
  return { document };
};
