import React, { createContext, useEffect, useState } from "react";
// NOTE run npm install @react-native-async-storage/async-storage in the command prompt
// NOTE this is the third party library that helps us save information onto the users phone
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth } from "firebase/auth";
import { auth } from "../../firebase/firebase_config";
export const AuthContext = createContext({
  token: "",
  uid: "",
  isAuthenticated: false,
  authenticate: (token, uid) => {},
  logout: () => {},
});

const AuthContextProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState();
  const authenticate = async (user) => {
    // NOTE for setItem(key, itemToStore) Item to store must be a string.
    setAuthToken(user.refreshToken);
    console.log("storing token", authToken);
    await AsyncStorage.setItem("authToken", authToken);
    try {
      auth.createCustomToken(authToken);
    } catch (err) {
      console.log(err.message);
    }
  };
  const logout = () => {
    setAuthToken(null);
    AsyncStorage.removeItem("token");
  };

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
