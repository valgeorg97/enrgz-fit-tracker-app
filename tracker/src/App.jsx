import { ChakraProvider, Flex, useColorMode } from "@chakra-ui/react"
import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { getDocs, collection, where, query, doc, updateDoc, getDoc } from "firebase/firestore";
import { auth, db } from "./config/firebase";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { AuthContext } from "./context/AuthContext"
import { WorkoutContext } from "./context/WorkoutContext";
import { GoalContext } from "./context/GoalContext";
import { FriendsContext } from "./context/FriendsContext";
import { EnergizeGameContext } from "./context/EnergizeGameContext";
import ThemeButton from "./components/ThemeButton/ColorModeButton";

import userimage from "./assets/user.png"
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
import Friends from "./views/Friends/Friends";
import Footer from "./components/Footer/Footer";
import EnergizeGame from "./components/EnergizeGame/EnergizeGame";

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
  const [weight, setWeight] = useState("")
  const [height, setHeight] = useState("")
  const [friends, setFriends] = useState([]);

  const [workouts, setWorkouts] = useState([]);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [sharedWorkouts, setSharedWorkouts] = useState([]);
  const [finishedWorkouts, setFinishedWorkouts] = useState([]);


  const [userGoal, setUserGoal] = useState("")
  const [currentGoal, setCurrentGoal] = useState({ calory: 0 });
  const [mainGoals, setMainGoals] = useState([]);
  const [goalDocRef, setGoalDocRef] = useState(null);
  const [goals, setGoals] = useState([]);
  const [finishedGoals, setFinishedGoals] = useState([]);
  const [requests, setRequests] = useState([]);
  const [energizePoints, setEnergizePoints] = useState(0)


  const { colorMode } = useColorMode();
  const usersCollection = collection(db, "users");

  useEffect(() => {
    const fetchMainGoals = async () => {
      if (userDocID) {
        try {
          const qu = query(
            collection(db, "mainGoals"),
            where("owner", "==", userID)
          );
          const querySnapshot = await getDocs(qu);
          const mainGoalsData = [];
          querySnapshot.forEach((doc) => {
            mainGoalsData.push({ id: doc.id, ...doc.data() });
          });
          if (mainGoalsData.length > 0) {
            setMainGoals(mainGoalsData[0]);
            const mainGoalsDocRef = doc(db, "mainGoals", mainGoalsData[0].id);
            setGoalDocRef(mainGoalsDocRef);

            if (!mainGoalsData[0].currentGoal) {
              if (userGoal === "Extreme weight gain") {
                updateCurrentGoal(mainGoalsData[0].extremeGain);
              } else if (userGoal === "Extreme weight loss") {
                updateCurrentGoal(mainGoalsData[0].extremeLoss);
              } else if (userGoal === "Mild weight gain") {
                updateCurrentGoal(mainGoalsData[0].mildGain);
              } else if (userGoal === "Mild weight loss") {
                updateCurrentGoal(mainGoalsData[0].mildLoss);
              } else if (userGoal === "Weight gain") {
                updateCurrentGoal(mainGoalsData[0].gain);
              } else if (userGoal === "Weight loss") {
                updateCurrentGoal(mainGoalsData[0].loss);
              } else if (userGoal === "Maintain weight") {
                updateCurrentGoal(mainGoalsData[0].maintain);
              }
            } else {
              setCurrentGoal(mainGoalsData[0].currentGoal);
            }
          }
        } catch (error) {
          console.error("Error fetching main goals:", error);
        }
      }
    };
    fetchMainGoals();
  }, [userID, userDocID, userGoal]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userDocID) {
          const userDocref = doc(db, "users", userDocID);
          const userDoc = await getDoc(userDocref);
          const userData = userDoc.data();

          const requestsData = userData?.requests || [];
          setRequests(requestsData);

          const friendsData = userData?.friends || [];
          const filteredFriends = [];

          for (const friend of friendsData) {
            const friendDocRef = doc(db, "users", friend.userDocID);
            const friendDoc = await getDoc(friendDocRef);
            const friendData = friendDoc.data();
            filteredFriends.push(friendData);
          }
          setFriends(filteredFriends);
        }
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, [userDocID]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      if (userDocID) {
        try {
          const q = query(
            collection(db, `users/${userDocID}/workouts`),
            where("owner", "==", userID)
          );
          const querySnapshot = await getDocs(q);
          const workoutData = [];
          const finishedWorkoutsData = [];
          
          querySnapshot.forEach((doc) => {
            const workout = { id: doc.id, ...doc.data() };
            if (workout.status === "finished") {
              finishedWorkoutsData.push(workout);
            } else {
              workoutData.push(workout);
            }
          });
          setWorkouts(workoutData);
          setFinishedWorkouts(finishedWorkoutsData);
        } catch (error) {
          console.error("Error fetching workouts:", error);
        }
      }
    };
    fetchWorkouts();
  }, [userDocID, userID]);

  useEffect(() => {
    const fetchSharedWorkouts = async () => {
      try {
        const sharedWorkoutsCollectionRef = collection(db, "sharedWorkouts");
        const querySnapshot = await getDocs(sharedWorkoutsCollectionRef);
        const sharedWorkoutsData = [];
        querySnapshot.forEach((doc) => {
          sharedWorkoutsData.push({ id: doc.id, ...doc.data() });
        });
        setSharedWorkouts(sharedWorkoutsData);
      } catch (error) {
        console.error("Error fetching shared workouts:", error);
      }
    };
    fetchSharedWorkouts();
  }, []);

  useEffect(() => {
    const fetchGoals = async () => {
      if (userDocID) {
        try {
          const q = query(
            collection(db, `users/${userDocID}/goals`),
            where("owner", "==", userID)
          );
          const querySnapshot = await getDocs(q);
          const goalsData = [];
          const finishedGoalsData = [];

          querySnapshot.forEach((doc) => {
            const goal = { id: doc.id, ...doc.data() };
            if (goal.status === "finished") {
              finishedGoalsData.push(goal);
            } else {
              goalsData.push(goal);
            }
          });
          setGoals(goalsData);
          setFinishedGoals(finishedGoalsData);
        } catch (error) {
          console.error("Error fetching goals:", error);
        }
      }
    };

    fetchGoals();
  }, [userID, userDocID]);


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
        setWeight(doc.data().weight)
        setHeight(doc.data().height)
        setPassword(doc.data().password)
        setEnergizePoints(doc.data().energizePoints || 0)
      });
    };
    getUsers();
  }, [usersCollection, userID]);

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
        setUserGoal("")
      }
    });
    return unsubscribe;
  }, [photoURL]);

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

  const updateCurrentGoal = async (goal) => {
    setCurrentGoal(goal);
    const dataWithDocID = { currentGoal: goal };
    if (goalDocRef) {
      await updateDoc(goalDocRef, dataWithDocID);

    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isAuth,
        setIsLoggedIn: setIsAuth,
        isAdmin,
        setAdmin,
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
        setUserDocID,
        userGoal,
        weight,
        setWeight,
        height,
        setHeight
      }}
    >
      <WorkoutContext.Provider
        value={{
          workouts,
          setWorkouts,
          selectedWorkout,
          setSelectedWorkout,
          sharedWorkouts,
          setSharedWorkouts,
          finishedWorkouts,
          setFinishedWorkouts
        }}
      >
        <GoalContext.Provider
          value={{
            currentGoal,
            setCurrentGoal,
            mainGoals,
            setMainGoals,
            goalDocRef,
            setGoalDocRef,
            goals,
            setGoals,
            finishedGoals,
            setFinishedGoals,
          }}
        >
          <FriendsContext.Provider
            value={{
              requests,
              setRequests,
              friends,
              setFriends
            }}>
              <EnergizeGameContext.Provider
            value={{
              energizePoints,
              setEnergizePoints
            }}>
            <ChakraProvider>
              <Flex className="App" position="relative">
                {isAuth &&
                  location.pathname !== "/register" &&
                  location.pathname !== "/login" && <Navigation colorMode={colorMode} />}
                {isAuth &&
                  location.pathname !== "/register" &&
                  location.pathname !== "/login" && <UserMenu />}
                <Flex
                  as="main"
                  flexGrow={1}
                  justifyContent="center"
                  alignItems="center"
                  p={5}
                >
                  <Flex as="main" direction="column" minHeight="100vh" flexGrow={1} flexShrink={0} justifyContent="center" alignItems="center" p={5}>
                    <Routes marginBottom="auto">
                      <Route path="/" element={isAuth ? <Dashboard /> : <LandingPage />} />
                      <Route path="/dashboard" element={<Dashboard colorMode={colorMode} />} />
                      <Route path="/workouts" element={<Workouts />} />
                      <Route path="goals" element={<Goals />} />
                      <Route path="community" element={<Community />} />
                      <Route path="friends" element={<Friends />} />
                      <Route path="profile" element={<Profile />} />
                      <Route path="register" element={<Register />} />
                      <Route path="login" element={<Login />} />
                      <Route path="energizeConquest" element={<EnergizeGame/>}/>
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                    {location.pathname !== "/" && location.pathname !== "/community" && location.pathname !== "/workouts" ? <Footer /> : null}
                    {location.pathname === "/" ? <ThemeButton/> : null}
                  </Flex>
                </Flex>
              </Flex>
            </ChakraProvider>
            </EnergizeGameContext.Provider>
          </FriendsContext.Provider>
        </GoalContext.Provider>
      </WorkoutContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;