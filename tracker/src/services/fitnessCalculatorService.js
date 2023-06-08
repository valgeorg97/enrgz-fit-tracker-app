const calculateCalories = async (age, gender, height, weight, activityLevel, API_KEY) => {
    let apiActivityLevel;
    switch (activityLevel) {
      case 'lightly-active':
        apiActivityLevel = 'level_2';
        break;
      case 'active':
        apiActivityLevel = 'level_3';
        break;
      case 'very-active':
        apiActivityLevel = 'level_4';
        break;
      default:
        apiActivityLevel = 'level_1';
    }
  
    const response = await fetch(`https://fitness-calculator.p.rapidapi.com/dailycalorie?age=${age}&gender=${gender}&height=${height}&weight=${weight}&activitylevel=${apiActivityLevel}`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': 'fitness-calculator.p.rapidapi.com'
      }
    });
  
    if (response.ok) {
      const data = await response.json();
      return { bmr: data.data.BMR, goals: data.data.goals };
    } else {
      console.error('Failed to calculate calories', response.status);
      return null;
    }
  };

  export default calculateCalories;