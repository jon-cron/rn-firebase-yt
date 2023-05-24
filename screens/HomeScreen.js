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
import { useDocument } from "../hooks/useDocument";
const HomeScreen = ({ navigation }) => {
  let testId = "34Z6PS9QTWK5rqmCpm5I";
  const { document, isPending } = useDocument("test", testId);
  const [dbDocument, setDbDocument] = useState(null);
  const handleLogout = async () => {
    await signOut(auth);
    navigation.replace("Login");
  };
  useLayoutEffect(() => {
    setDbDocument(document);
  }, [document, isPending]);
  if (document && isPending === false) {
    return (
      <View style={styles.container}>
        <Text>{dbDocument?.text}</Text>
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
