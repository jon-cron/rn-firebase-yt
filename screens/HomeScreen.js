import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase/firebase_config";
// import { useDocument } from "../hooks/useDocument";
const HomeScreen = ({ navigation }) => {
  let testId = "34Z6PS9QTWK5rqmCpm5I";
  const [document, setDocument] = useState(null);
  const [isPending, setIsPending] = useState(null);
  // const { document, isPending } = useDocument("test", testId);
  // const [dbDocument, setDbDocument] = useState();
  const handleLogout = async () => {
    await signOut(auth);
    navigation.replace("Login");
  };
  useEffect(() => {
    setIsPending(true);
    // NOTE here is a good example of how to get a snapshot of a single doc using Firebase 9
    const unsub = async () => {
      const jobRef = doc(db, "test", testId).then(
        onSnapshot(jobRef, (snapshot) => {
          setDocument(snapshot.data());
        })
      );
      setIsPending(false);
    };
    return () => unsub();
  }, []);
  if (isPending != null) {
    return (
      <View style={styles.container}>
        <Text>{document?.text}</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
