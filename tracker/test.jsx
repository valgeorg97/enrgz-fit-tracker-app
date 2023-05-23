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
          setMainGoals(mainGoalsData[0]);
          if (mainGoalsData[0]) {
            const mainGoalsDocRef = doc(db, "mainGoals", mainGoalsData[0].id);
            setDocRef(mainGoalsDocRef);

            if (!mainGoals.currentGoal) {
              console.log('yes');
              let updatedCurrentGoal = null;

            if (userGoal === "Extreme weight gain") {
              updatedCurrentGoal = mainGoalsData[0].extremeGain;
            } else if (userGoal === "Extreme weight loss") {
              updatedCurrentGoal = mainGoalsData[0].extremeLoss;
            } else if (userGoal === "Mild weight gain") {
              updatedCurrentGoal = mainGoalsData[0].mildGain;
            } else if (userGoal === "Mild weight loss") {
              updatedCurrentGoal = mainGoalsData[0].mildLoss;
            } else if (userGoal === "Weight gain") {
              updatedCurrentGoal = mainGoalsData[0].gain;
            } else if (userGoal === "Weight loss") {
              updatedCurrentGoal = mainGoalsData[0].loss;
            } else if (userGoal === "Maintain weight") {
              updatedCurrentGoal = mainGoalsData[0].maintain;
            }

            if (updatedCurrentGoal) {
              setCurrentGoal(updatedCurrentGoal);
              await updateDoc(mainGoalsDocRef, { currentGoal: updatedCurrentGoal });
              setMainGoals((prevMainGoals) => ({
                ...prevMainGoals,
                currentGoal: updatedCurrentGoal
              }));
            }
            }
          }
        } catch (error) {
          console.error("Error fetching main goals:", error);
        }
      }
    };
    console.log('yes');
    fetchMainGoals();
  }, [userID,userDocID,userGoal,currentGoal,mainGoals]);



  const handleFinishGoal = async (goal) => {
    try {
      const goalRef = doc(db, `users/${userDocID}/goals`, goal.id);
      await updateDoc(goalRef, { finished: true }); // Update the document with the finished property
      closeModal();
      toast.success("Goal finished successfully!");
    } catch (error) {
      toast.error("Error finishing goal:", error);
    }
  };

  <Button colorScheme="linkedin" onClick={closeModal}>Close</Button>
              <Button
                colorScheme="green"
                size="md"
                w="10px"
                onClick={() => handleFinishGoal(selectedGoal)}
              >
                <Flex align="center">
                  <FaCheck />
                </Flex>
              </Button>


import { FaTrashAlt,FaCheck } from "react-icons/fa";
