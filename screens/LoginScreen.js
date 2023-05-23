import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { auth } from "../firebase/firebase_config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSignup = async () => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log(res._tokenResponse.idToken);
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error);
    }
  };
  const handleSignIn = async () => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      console.log(res._tokenResponse.idToken);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
        <TextInput
          autoCapitalize="none"
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          placeholder="Password"
          value={password}
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleSignIn}>
          <Text>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSignup}>
          <Text>Signup</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {},
  buttonContainer: {
    flexDirection: "row",
    minWidth: 150,
    justifyContent: "space-evenly",
    marginTop: 8,
  },
});

export default LoginScreen;
