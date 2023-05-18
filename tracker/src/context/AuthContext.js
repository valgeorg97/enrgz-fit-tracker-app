import { createContext } from "react";

export const AuthContext = createContext({
    isLoggedIn: false,
    setIsLoggedIn: () => {},
    isAdmin: false,
    setIsAdmin: () => {},
    signOut: () => {},
    isBlocked: "",
    setIsBlocked: () => {},

    userID: "",
    setUserID: () => {},
    name: "",
    setName: () => {},
    family: "",
    setFamily: () => {},
    username: "",
    setUsername: () => {},
    email: "",
    setEmail: () => {},
    photoURL: "",
    setPhotoURL: () => {},
    password: "",
    setPassword: () => {}
    // currentUserEmail: "",
    // setCurrentUserEmail: () => {},
});
