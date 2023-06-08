
 const getNutritionData = async (query, grams, API_KEY) => {
    try {
      const response = await fetch(
        `https://api.api-ninjas.com/v1/nutrition?query=${grams}g ${query}`,
        {
          method: "GET",
          headers: {
            "X-Api-Key": API_KEY,
          },
        }
      );
  
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("Error fetching data: ", error);
      throw error;
    }
  };

  export default getNutritionData;