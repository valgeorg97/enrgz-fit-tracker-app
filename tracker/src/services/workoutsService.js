const getWorkoutExercises = async (selectedMuscle, API_KEY) => {
    try {
      const response = await fetch(`https://api.api-ninjas.com/v1/exercises?muscle=${selectedMuscle}`, {
        method: 'GET',
        headers: { 'X-Api-Key': API_KEY },
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      return data;
  
    } catch (error) {
      console.error("Error fetching related exercises: ", error);
      throw error;
    }
  }
  
  export default getWorkoutExercises;