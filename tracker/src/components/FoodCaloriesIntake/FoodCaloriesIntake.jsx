import { useState, useEffect } from "react";
import {
  Box,
  Input,
  Flex,
  Button,
  Text,
  VStack,
  CircularProgress,
  CircularProgressLabel,
  Select,
  Collapse,
  Divider,
  Heading
} from "@chakra-ui/react";
import { db } from "../../config/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { GoalContext } from "../../context/GoalContext";
import {EnergizeGameContext} from "../../context/EnergizeGameContext"

const FoodCaloriesIntake = () => {
  const { energizePoints, setEnergizePoints } = useContext(EnergizeGameContext);
  const { currentGoal } = useContext(GoalContext);
  const { userDocID } = useContext(AuthContext);
  const [consumedCalories, setConsumedCalories] = useState(0);
  // const [totalCalories, setTotalCalories] = useState(2000);
  const [query, setQuery] = useState("");
  const [grams, setGrams] = useState("");
  const [isViewMore, setIsViewMore] = useState(false);
  const [mealType, setMealType] = useState("Breakfast");

  const [foodItems, setFoodItems] = useState({
    Breakfast: [],
    Lunch: [],
    Dinner: [],
    Snack: [],
  });
  const [expandedMealTypes, setExpandedMealTypes] = useState({
    Breakfast: false,
    Lunch: false,
    Dinner: false,
    Snack: false,
  });
  const mealTypesOrder = ["Breakfast", "Lunch", "Dinner", "Snack"];

  useEffect(() => {
    const fetchUserData = async () => {
      if (userDocID) {
        const docRef = doc(db, "users", userDocID);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const lastUpdate = docSnap.data().lastUpdate?.toDate();
          const today = new Date();
          today.setHours(0, 0, 0, 0);

          if (!lastUpdate || lastUpdate.getTime() !== today.getTime()) {
            setConsumedCalories(0);
            setFoodItems({
              Breakfast: [],
              Lunch: [],
              Dinner: [],
              Snack: [],
            });
          } else {
            setConsumedCalories(docSnap.data().consumedCalories || 0);
            setFoodItems(
              docSnap.data().foodItems || {
                Breakfast: [],
                Lunch: [],
                Dinner: [],
                Snack: [],
              }
            );
          }
        } else {
          console.log("No such document!");
        }
      }
    };

    fetchUserData();
  }, [userDocID]);

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleGramsChange = (e) => {
    setGrams(e.target.value);
  };

  const handleMealTypeChange = (e) => {
    setMealType(e.target.value);
  };

  const handleToggleMealType = (type) => {
    setExpandedMealTypes((prevState) => ({
      ...prevState,
      [type]: !prevState[type],
    }));
  };

  const handleAddFood = async () => {
    if (query !== "" && grams !== "") {
      try {
        const response = await fetch(
          `https://api.api-ninjas.com/v1/nutrition?query=${grams}g ${query}`,
          {
            method: "GET",
            headers: {
              "X-Api-Key": "AfAWwp+nw89/859EX9kTYA==FXcxQwZhBYqX3BIK",
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data) && data.length) {
            let foodItem = {
              name: query,
              grams: grams,
              calories: data[0].calories,
            };
            setFoodItems((prevState) => {
              let updatedFoodItems = {
                ...prevState,
                [mealType]: [...prevState[mealType], foodItem],
              };

              const newConsumedCalories = consumedCalories + data[0].calories;

              // Update energize points
              if (newConsumedCalories >= currentGoal.calory && newConsumedCalories <= currentGoal.calory + 200) {
                setEnergizePoints(prevPoints => prevPoints + 5); // increment energize points
                if (userDocID) {
                  const userRef = doc(db, "users", userDocID);
                  setDoc(userRef, { energizePoints: energizePoints + 5}, { merge: true }); // update firestore
                }
              }

              // Save to Firestore
              if (userDocID) {
                const userRef = doc(db, "users", userDocID);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                setDoc(
                  userRef,
                  {
                    consumedCalories: newConsumedCalories,
                    lastUpdate: today,
                    foodItems: updatedFoodItems,
                  },
                  { merge: true }
                );
              }

              return updatedFoodItems;
            });

            setConsumedCalories((prevCalories) => prevCalories + data[0].calories);

          } else {
            console.log("No data found");
          }
        } else {
          throw new Error("Network response was not ok.");
        }
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    }
    setQuery("");
    setGrams("");
  };
  const resetConsumedCalories = async () => {
    if (userDocID) {
      const userRef = doc(db, "users", userDocID);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // remove time part
      await setDoc(
        userRef,
        { consumedCalories: 0, lastUpdate: today },
        { merge: true }
      );
    }
  };
  const saveConsumedCalories = async () => {
    if (userDocID) {
      const userRef = doc(db, "users", userDocID);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      await setDoc(
        userRef,
        { consumedCalories: consumedCalories, lastUpdate: today },
        { merge: true }
      );
    }
  };

  const calorieProgress = (consumedCalories / currentGoal.calory) * 100;

  const handleViewMore = () => {
    setIsViewMore((prevState) => !prevState);
  };

  return (
    <Box
      background="linear-gradient(225deg, #f5f7fa 0%, #c3cfe2 100%)"
      boxShadow="lg"
      shadow="xl"
      p={4}
      borderRadius="md"
      w="400px"
    >
      <Heading size="md" textAlign={"center"} mb={3}>Calories Intake</Heading>
      <Text fontSize="xl" mb={1}>
        Base Goal Calories: {currentGoal && currentGoal.calory.toFixed(0)} kcal
      </Text>
      <Text fontSize="xl" mb={1}>
        Calories consumed today: {consumedCalories.toFixed(0)}{" "}
        kcal
      </Text>

      <CircularProgress value={calorieProgress} color="green.400" size="150px">
        <CircularProgressLabel>
          {
            consumedCalories > currentGoal.calory
              ? (
                <Box display="flex" flexDirection="column" alignItems="center">
                  
                  <Text fontSize="18px" fontWeight={"semibold"} >Over</Text>
                  <Text fontSize="18px" fontWeight={"semibold"}>{`${(consumedCalories - currentGoal.calory).toFixed(0)} kcal`}</Text>
                </Box>
              )
              : (
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Text fontSize="2xl">{`${(currentGoal.calory - consumedCalories).toFixed(0)} kcal`}</Text>
                  <Text fontSize="15px" fontWeight={"bold"} color="green.400">Remaining</Text>
                </Box>
              )
          }
        </CircularProgressLabel>
      </CircularProgress>
      <Button ml={4} colorScheme="linkedin" onClick={handleViewMore}>
        {isViewMore ? "View Less" : "View More"}
      </Button>
      <Collapse in={isViewMore}>
        <Box>
          <Input
            mb={1}
            value={query}
            onChange={handleQueryChange}
            placeholder="Enter food item"
          />
          <Input
            mb={1}
            value={grams}
            onChange={handleGramsChange}
            placeholder="Enter grams"
          />
          <Select mb={1} value={mealType} onChange={handleMealTypeChange}>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Snack">Snack</option>
          </Select>
          <Flex justifyContent="center">
            <Button colorScheme="linkedin" onClick={handleAddFood}>
              Add Food
            </Button>
          </Flex>
        </Box>
        <Divider mt={5} />
        {mealTypesOrder.map((mealType) => (
  <VStack key={mealType} align="start" spacing={4} mt={4}>
    <Button
      variant="link"
      onClick={() => handleToggleMealType(mealType)}
    >
      {mealType}
    </Button>
    <Collapse in={expandedMealTypes[mealType]}>
      {foodItems[mealType].map((item, index) => (
        <Text key={index}>
          {item.name} - {item.grams}g - {item.calories}kcal
        </Text>
      ))}
    </Collapse>
  </VStack>
))}
      </Collapse>
    </Box>
  );
};

export default FoodCaloriesIntake;
