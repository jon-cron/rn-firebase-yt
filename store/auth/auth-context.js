import React, { createContext, useState } from "react";
// NOTE run npm install @react-native-async-storage/async-storage in the command prompt
// NOTE this is the third party library that helps us save information onto the users phone
import AsyncStorage from "@react-native-async-storage/async-storage";
export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  authenticate: (token) => {},
  logout: () => {},
});

const AuthContextProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState();
  const authenticate = (token) => {
    setAuthToken(token);
  };
  const logout = () => {
    setAuthToken(null);
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
