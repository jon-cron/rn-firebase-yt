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
import { auth } from "../firebase/firebase_config";
import { useCollection } from "../hooks/useCollection";
// import { useDocument } from "../hooks/useDocument";
const HomeScreen = ({ navigation }) => {
  const { documents } = useCollection("test");
  const handleLogout = async () => {
    await signOut(auth);
    navigation.replace("Login");
  };
  console.log(documents);
  return (
    <>
      {document && (
        <View style={styles.container}>
          <Text>{document?.text}</Text>
          <TouchableOpacity onPress={handleLogout}>
            <Text>Logout</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
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
