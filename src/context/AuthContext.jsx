import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [googleuser, setGoogleUser] = useState([]);
  const [isgooglelogin, setIsGoogleLogin] = useState(false);
  const [iscurrentuser, setIsCurrentUser] = useState([]);
  const [oneweekweather, setOneweekWeather] = useState(null);

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const emailVerification = (auth) => {
    sendEmailVerification(auth.currentUser);
  };
  const signin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const logout = () => {
    return signOut(auth);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <UserContext.Provider
      value={{
        createUser,
        user,
        signin,
        emailVerification,
        logout,
        googleuser,
        setGoogleUser,
        isgooglelogin,
        setIsGoogleLogin,
        iscurrentuser,
        setIsCurrentUser,
        oneweekweather,
        setOneweekWeather
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
