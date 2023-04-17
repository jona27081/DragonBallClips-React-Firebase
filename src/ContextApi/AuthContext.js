import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userID, setUserID] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [picture, setPicture] = useState("");

  const responseFacebook = (response) => {
    console.log(response);
    setIsLoggedIn(true);
    setUserID(response.userID);
    setName(response.name);
    setEmail(response.email);
    setPicture(response.picture.data.url);
  };

  return (
    <AuthContext.Provider value={{ 
      isLoggedIn, 
      userID, 
      name, 
      email, 
      picture, 
      responseFacebook 
    }}>
      {children}
    </AuthContext.Provider>
  );
};