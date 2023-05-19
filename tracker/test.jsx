useEffect(() => {
  const goalsRef = collection(db, `users/${userDocID}/goals`);

      const goalsQuery = query(goalsRef,where("owner", "==", userID))
      const unsubscribe = onSnapshot(goalsQuery, (querySnapshot) => {
        const goalsData = [];
        querySnapshot.forEach((doc) => {
          goalsData.push({ id: doc.id, ...doc.data() });
        });
        setGoals(goalsData);
      })
      return unsubscribe
}, [userID, userDocID]);