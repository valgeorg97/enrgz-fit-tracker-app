import { ChakraProvider, Box, Button, Flex} from "@chakra-ui/react"
import {AuthContext} from "./context/AuthContext"
import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import userimage from "./assets/user.png"
import React from "react";

import Navigation from "./components/Navigation/Navigation";
import Home from "./views/Home/Home"
import NotFound from "./views/NotFound/NotFound";
import Register from "./views/Authentication/Register/Register"
import Landing from "./views/LandingPage/LandingPage"
import Profile from "./views/Profile/Profile";
import Exercises from "./views/Exercises/Exercises";
import Goals from "./views/Goals/Goals";
import Community from "./views/Community/Community";
import Login from "./views/Authentication/Login/Login";


function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth") === "true");
  const [isAdmin, setAdmin] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);

  const [userID, setUserID] = useState("");
  const [name, setName] = useState("");
  const [family, setFamily] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState(userimage);



  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isAuth,
        setIsLoggedIn: setIsAuth,
        isAdmin: false,
        setIsAdmin: setAdmin,
        // signOut: signUserOut,
        isBlocked,
        setIsBlocked,

        userID,
        setUserID,
        name,
        setName,
        family,
        setFamily,
        username,
        setUsername,
        email,
        setEmail,
        photoURL,
        setPhotoURL,
      }}
    >
      <ChakraProvider>
        <Flex className="App">
          <Navigation />
          <Flex
            as="main"
            flexGrow={1}
            justifyContent="center" // Center horizontally
            alignItems="center" // Center vertically
            p={5} // Add some padding
          >
            <Routes>
              <Route path="/" element={<Landing />} /> 
              <Route path="exercises" element={<Exercises />} />
              <Route path="goals" element={<Goals />} />
              <Route path="community" element={<Community />} />
              <Route path="profile" element={<Profile />} />
              <Route path="register" element={<Register />} />
              <Route path="login" element={<Login />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Flex>
        </Flex>
      </ChakraProvider>
    </AuthContext.Provider>
  )
}

export default App;




  // // Query Firestore users collection
  // const usersCollection = collection(db, "users");

  // // Check if user is blocked
  // useEffect(() => {
  //   const getUsers = async () => {
  //     const q = query(usersCollection, where("id", "==", userID));
  //     const querySnapshot = await getDocs(q);
  //     querySnapshot.forEach((doc) => {
  //       if (doc.data().isBlocked === true) {
  //         console.log(doc.data().isBlocked);
  //         setIsBlocked(true);
  //       }
  //     });
  //   };
  //   getUsers();
  // }, [userID]);

  // // Check if user is authenticated
  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       setEmail(user.email);
  //       setIsAuth(true);
  //       setAdmin(user.email === adminEmail);
  //       setPhotoURL(user.photoURL || photoURL);
  //       setUserID(user.uid);
  //     } else {
  //       setEmail("");
  //       setIsAuth(false);
  //       setAdmin(false);
  //       setIsBlocked(false);
  //     }
  //   });
  //   return unsubscribe;
  // }, [adminEmail]);

  // /**
  //  * Sign out the user and update state accordingly
  //  */
  // const signUserOut = () => {
  //   signOut(auth)
  //     .then(() => {
  //       localStorage.setItem("isAuth", false);
  //       setIsAuth(false);
  //       setEmail("");
  //       navigate("/");
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };