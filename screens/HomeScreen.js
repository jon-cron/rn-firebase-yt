import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
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
import { AuthContext } from "../store/auth/auth-context";
// import { useDocument } from "../hooks/useDocument";
const HomeScreen = () => {
  const authCtx = useContext(AuthContext);
  const { documents } = useCollection("test");
  const handleLogout = async () => {
    await signOut(auth);
    authCtx.logout();
  };
  return (
    <View style={styles.container}>
      <Text>
        {documents && documents[0]?.text}: {auth?.currentUser?.email}
      </Text>
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
