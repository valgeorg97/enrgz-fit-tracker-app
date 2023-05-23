import { ChakraProvider, Flex} from "@chakra-ui/react"
import {AuthContext} from "./context/AuthContext"
import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import userimage from "./assets/user.png"
import { getDocs, collection, where, query } from "firebase/firestore";
import { auth, db } from "./services/firebase";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

import Navigation from "./components/Navigation/Navigation";
import NotFound from "./views/NotFound/NotFound";
import Register from "./views/Authentication/Register/Register"
import Profile from "./views/Profile/Profile";
import Workouts from "./views/Workouts/Workouts";
import Goals from "./views/Goals/Goals";
import Community from "./views/Community/Community";
import Login from "./views/Authentication/Login/Login";
import LandingPage from "./views/LandingPage/LandingPage";
import Dashboard from "./views/Dashboard/Dashboard";
import UserMenu from "./components/UserMenu/UserMenu";

function App() {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth") === "true");
  const [isAdmin, setAdmin] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [userID, setUserID] = useState("");
  const [userDocID, setUserDocID] = useState("")
  const [name, setName] = useState("");
  const [family, setFamily] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState(userimage);
  const [password, setPassword] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [userGoal, setUserGoal] = useState("")


  const usersCollection = collection(db, "users");

  useEffect(() => {
    const getUsers = async () => {
      const q = query(usersCollection, where("id", "==", userID));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        if (doc.data().isBlocked === true) {
          setIsBlocked(true);
        }
        if (doc.data().role === 'admin') {
          setAdmin(true);
        }
        setUserDocID(doc.data().docID)
        setName(doc.data().name)
        setFamily(doc.data().family)
        setUsername(doc.data().username)
        setPhoneNumber(doc.data().phoneNumber)
        setEmail(doc.data().email);
        setUserGoal(doc.data().goal)
      });
    };
    getUsers();
  }, [usersCollection,userID]);

  // Check if user is authenticated
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuth(true);
        setPhotoURL(user.photoURL || photoURL);
        setUserID(user.uid);
      } else {
        setName('')
        setEmail("");
        setIsAuth(false);
        setAdmin(false);
        setIsBlocked(false);
        setPhotoURL(userimage)
        setUserID("");
      }
    });
    return unsubscribe;
  }, []);
  
  const signUserOut = () => {
    signOut(auth)
      .then(() => {
        localStorage.setItem("isAuth", false);
        setIsAuth(false);
        setEmail("");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isAuth,
        setIsLoggedIn: setIsAuth,
        isAdmin,
        signOut: signUserOut,
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
        password,
        setPassword,
        phoneNumber,
        setPhoneNumber,
        userDocID,
        userGoal,
      }}
    >
      <ChakraProvider>
        <Flex className="App" position="relative">
        {isAuth && location.pathname !== "/register" && location.pathname !== "/login" && <Navigation />}
          {isAuth && location.pathname !== "/register" && location.pathname !== "/login" && <UserMenu />}
          <Flex as="main" flexGrow={1} justifyContent="center" alignItems="center" p={5}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="workouts" element={<Workouts />} />
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