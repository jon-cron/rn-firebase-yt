import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase_config";
import { useDocument } from "../hooks/useDocument";
const HomeScreen = ({ navigation }) => {
  const [dbDocument, setDbDocument] = useState(null);
  let testId = "34Z6PS9QTWK5rqmCpm5I";
  const handleLogout = async () => {
    await signOut(auth);
    navigation.replace("Login");
  };
  const { document } = useDocument("test", testId);
  console.log(document);
  return (
    <View style={styles.container}>
      <Text>{document.text}</Text>
      <TouchableOpacity onPress={handleLogout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
