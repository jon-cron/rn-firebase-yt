import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import AuthContextProvider, { AuthContext } from "./store/auth/auth-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useEffect } from "react";
import { getAuth, id } from "firebase/auth";
import { auth } from "./firebase/firebase_config";
const Root = () => {
  const Stack = createNativeStackNavigator();
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    const getVerified = async () => {
      try {
        const idToken = await AsyncStorage.getItem("token");
        const res = await auth.verifyIdToken(idToken);
        console.log(res);
      } catch (err) {
        console.log(err, err.message);
      }
    };
    getVerified();
  }, []);
  // useEffect(() => {
  //   const getToken = async () => {
  //     const storedToken = await AsyncStorage.getItem("token");
  //     if (storedToken) {
  //       authCtx.authenticate(storedToken);
  //     }
  //   };
  //   getToken();
  // }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!authCtx.token ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : (
          <Stack.Screen name="Home" component={HomeScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <AuthContextProvider>
      <Root />
    </AuthContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
