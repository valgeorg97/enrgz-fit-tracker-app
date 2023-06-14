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
import { useToast } from "@chakra-ui/react";
import { db } from "../../../config/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { GoalContext } from "../../../context/GoalContext";
import { EnergizeGameContext } from "../../../context/EnergizeGameContext"
import { API_KEY } from "../../../common/constants";
import { MEAL_TYPES_ORDER } from "../../../common/constants";
import getNutritionData from "../../../services/nutritionService";

/**
 * FoodCaloriesIntake is a component that allows users to log the food they consume 
 * and track their total calorie intake against their set calorie goal.
 * 
 * It utilizes the GoalContext to access the user's set calorie goal, and the 
 * EnergizeGameContext to update the user's energize points. It fetches nutrition data 
 * of the food item inputted by the user using the getNutritionData service, and it 
 * updates the user's data in firebase with the updated food items and consumed calories.
 * 
 * State variables:
 *  - `energizePoints` is a state variable from the EnergizeGameContext.
 *  - `setEnergizePoints` is a function to update energizePoints.
 *  - `currentGoal` is a state variable from the GoalContext, representing the user's current calorie goal.
 *  - `userDocID` is a state variable from the AuthContext, representing the document id of the user in the firebase database.
 *  - `consumedCalories` is a state variable representing the total number of calories the user has consumed.
 *  - `setQuery` is a function to update query.
 *  - `grams` is a state variable representing the weight in grams of the food item inputted by the user.
 *  - `setGrams` is a function to update grams.
 *  - `isViewMore` is a state variable that determines whether the 'view more' button has been pressed, to display more info.
 *  - `setIsViewMore` is a function to update isViewMore.
 *  - `mealType` is a state variable representing the type of meal (e.g. Breakfast, Lunch, Dinner, Snack).
 *  - `setMealType` is a function to update mealType.
 *  - `toast` is a function from the @chakra-ui/react library to display toast notifications.
 *  - `isPointsAwarded` is a state variable that determines whether energize points have already been awarded for reaching the calorie goal.
 *  - `setIsPointsAwarded` is a function to update isPointsAwarded.
 *  - `foodItems` is a state variable representing the food items consumed by the user.
 *  - `setFoodItems` is a function to update foodItems.
 *  - `expandedMealTypes` is a state variable representing the meal types that are expanded.
 *  - `setExpandedMealTypes` is a function to update expandedMealTypes.
 *
 * @component
 * @returns {JSX.Element}
 */

const FoodCaloriesIntake = () => {
  const { energizePoints, setEnergizePoints } = useContext(EnergizeGameContext);
  const { currentGoal } = useContext(GoalContext);
  const { userDocID } = useContext(AuthContext);
  const [consumedCalories, setConsumedCalories] = useState(0);
  const [query, setQuery] = useState("");
  const [grams, setGrams] = useState("");
  const [isViewMore, setIsViewMore] = useState(false);
  const [mealType, setMealType] = useState("Breakfast");
  const toast = useToast();
  const [isPointsAwarded, setIsPointsAwarded] = useState(false);

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

  useEffect(() => {
    const fetchUserData = async () => {
      if (userDocID) {
        const docRef = doc(db, "users", userDocID);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const lastUpdate = docSnap.data().lastUpdate?.toDate();
          const today = new Date();

          if (!lastUpdate ||
            lastUpdate.getDate() !== today.getDate() ||
            lastUpdate.getMonth() !== today.getMonth() ||
            lastUpdate.getFullYear() !== today.getFullYear()) {
            setConsumedCalories(0);
            setFoodItems({
              Breakfast: [],
              Lunch: [],
              Dinner: [],
              Snack: [],
            });
            setIsPointsAwarded(false);
            await setDoc(
              docRef,
              {
                consumedCalories: 0,
                foodItems: {
                  Breakfast: [],
                  Lunch: [],
                  Dinner: [],
                  Snack: [],
                },
                isPointsAwarded: false,
                lastUpdate: today
              },
              { merge: true }
            );
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
            setIsPointsAwarded(docSnap.data().isPointsAwarded || false);
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
        const data = await getNutritionData(query, grams, API_KEY);
  
        if (Array.isArray(data) && data.length) {
          let foodItem = {
            name: query,
            grams: grams,
            calories: data[0].calories,
          };
  
          let newEnergizePoints = energizePoints;
          let isPointsAwarded = false;
          const today = new Date();
          today.setHours(0, 0, 0, 0);
  
          if (userDocID) {
            const docRef = doc(db, "users", userDocID);
            const docSnap = await getDoc(docRef);
    
            if (docSnap.exists()) {
              const lastUpdate = docSnap.data().lastUpdate?.toDate();
              if (!lastUpdate || lastUpdate.getDate() !== today.getDate() || lastUpdate.getMonth() !== today.getMonth() || lastUpdate.getFullYear() !== today.getFullYear()) {
                isPointsAwarded = false;
              } else {
                isPointsAwarded = docSnap.data().isPointsAwarded || false;
              }
            }
          }
  
          setFoodItems((prevState) => {
            let updatedFoodItems = {
              ...prevState,
              [mealType]: [...prevState[mealType], foodItem],
            };
  
            const newConsumedCalories = consumedCalories + data[0].calories;
            setConsumedCalories(newConsumedCalories);
  
            if (userDocID && !isPointsAwarded) {
              const docRef = doc(db, "users", userDocID);
              if (newConsumedCalories >= currentGoal.calory && newConsumedCalories <= currentGoal.calory + 200) {
                newEnergizePoints += 5;
                isPointsAwarded = true;
  
                toast({
                  title: "Congratulations!",
                  description: "You've earned 5 Energize Points for reaching your calorie goal!",
                  status: "success",
                  duration: 9000,
                  isClosable: true,
                  position: "top",
                });
              }
  
              const updateData = {
                consumedCalories: newConsumedCalories,
                foodItems: updatedFoodItems,
                lastUpdate: today,
                energizePoints: newEnergizePoints,
                isPointsAwarded: isPointsAwarded,
              };
  
              setEnergizePoints(newEnergizePoints);
              setIsPointsAwarded(isPointsAwarded);
              setDoc(docRef, updateData, { merge: true }).catch((error) => {
                console.error("Error updating document: ", error);
              });
            }
  
            return updatedFoodItems;
          });
        } else {
          toast({
            title: "Food not found",
            description: `We couldn't find the food item you're looking for. Please try again.`,
            status: "error",
            duration: 9000,
            isClosable: true,
            position: "top",
          });
        }
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    }
    setQuery("");
    setGrams("");
  };

  const calorieProgress = (consumedCalories / currentGoal.calory) * 100;

  const handleViewMore = () => {
    setIsViewMore((prevState) => !prevState);
  };

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      background="linear-gradient(15deg, #13547a 0%, #80d0c7 100%)"
      boxShadow="lg"
      p={4}
      borderRadius="md"
      w="400px"
    >
      <Heading size="md" textAlign={"center"} mb={3}>Calories Intake</Heading>
      <Text fontSize="xl" mb={1}>
        Base Goal Calories: {currentGoal?.calory?.toFixed(0) ?? 0} kcal
      </Text>
      <Text fontSize="xl" mb={1}>
        Calories consumed today: {consumedCalories.toFixed(0)} kcal
      </Text>

      <CircularProgress value={calorieProgress} color="green.400" size="260px">
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
                  <Text fontSize="15px" fontWeight={"bold"} color="grey.400">Remaining</Text>
                </Box>
              )
          }
        </CircularProgressLabel>
      </CircularProgress>
      <Button mt={4} colorScheme="linkedin" onClick={handleViewMore}>
        {isViewMore ? "View Less" : "View More"}
      </Button>
      <Collapse in={isViewMore}>
        <Box >
          <Input
            textColor="black"
            mb={1}
            value={query}
            onChange={handleQueryChange}
            placeholder="Enter food item"
            sx={{
              '::placeholder': {
                color: 'white',
              },
            }}
          />

          <Input
            mb={1}
            value={grams}
            onChange={handleGramsChange}
            placeholder="Enter grams"
            sx={{
              '::placeholder': {
                color: 'white',
              },
            }}
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
        {MEAL_TYPES_ORDER.map((mealType) => (
          <VStack key={mealType} align="start" spacing={4} mt={4}>
            <Button
              color="black"
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
    </Flex>
  );
};

export default FoodCaloriesIntake;