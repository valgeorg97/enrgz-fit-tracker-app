import profileIcon from "../assets/fitnessIcon.png"
import goalIcon from "../assets/goalIcon.png"
import progressIcon from "../assets/pace.png"
import profileGirlIcon from "../assets/177687.png"
import leadboard from "../assets/leadboard.png"
import terminator from "../assets/terminator.jpg"
import doner from "../assets/doner.png"
import andrewT from "../assets/andrewT.png"
import serena from "../assets/serena.png"
  
export const difficulties = [
  { label: 'Easy', value: 'easy', color: 'green.500' },
  { label: 'Medium', value: 'medium', color: 'yellow.500' },
  { label: 'Hard', value: 'hard', color: 'red.500' },
];
  
export const muscles = ['abdominals', 'abductors', 'adductors', 'biceps', 'calves', 'chest', 'forearms', 'glutes', 'hamstrings', 'lats', 'lower_back', 'middle_back', 'neck', 'quadriceps', 'traps', 'triceps'];
export const API_KEY = "AfAWwp+nw89/859EX9kTYA==FXcxQwZhBYqX3BIK"
export const MEAL_TYPES_ORDER = ["Breakfast", "Lunch", "Dinner", "Snack"];

export const DIFFICULTY_COLORS = {
  easy: "green",
  medium: "orange",
  hard: "red",
};

export const TESTIMONIALS = [
  {
    name: 'Mitio Dunera',
    role: 'User',
    content:
      "Since using ENERGIZE fitness tracker, I no longer wonder if I can indulge in a DONER today. Instead, I simply check the number of calories I\'ve consumed and make an informed decision based on that. ENERGIZE helps me maintain a balanced approach to my diet and empowers me to make mindful choices.",
    avatar: doner,
  },
  {
    name: 'Arnold Schwarzenegger',
    role: 'The Terminator',
    content:
    "Hasta la vista, lazy days! Energize has transformed my fitness routine into an epic battle against calories and weak muscles. I track every move, conquer my workouts, and crush my goals.  Get ready to say 'I'll be back' to those extra pounds because with Energize, victory is inevitable!",
    avatar: terminator,
  },
  {
    name: 'Andrew Tate',
    role: 'Top G',
    content:
    "Hey there, Andrew Tate here! Energize and its Top G features have totally leveled up my fitness game. It's like having a personal cheerleader in my pocket, pushing me to dominate the gym.  So if you're ready to unleash your inner beast and join the Top G squad, grab your workout gear and let's conquer the fitness world with Energize!",
    avatar: andrewT,
  },
  {
    name: 'Serena Williams',
    role: 'Tennis player',
    content:
    "Hey y'all, Serena Williams here! Energize is my secret weapon for keeping up with my toddler and dominating my workouts. It's like a power boost that helps me tackle tantrums and still have energy to spare. With Energize, I'm acing motherhood and tennis, one day at a time!",
    avatar: serena
  },
];

export const FITNESS_CALC_API_KEY = "c8f88b8e37mshbbcacf51c255978p133a69jsn48d57aca2db6";

export const FITNESS_FACTS = [
  "Just 30 minutes of moderate exercise a day can significantly improve your health and decrease the risk of chronic illnesses such as heart disease, diabetes, and certain types of cancer.",
  "Regular physical activity can increase your brain health and mental functions. Studies show that it can improve memory and thinking skills.",
  "Muscle is more metabolically active than fat. For each pound of muscle you gain, your body burns an extra 50 calories a day.",
  "During intense exercise, your body can produce up to 2 to 3 litres of sweat per hour.",
  "Women's muscles tend to fatigue less quickly than men's, but men are usually stronger.",
  "The heart is the strongest muscle in the body. On an average, it beats more than 2.5 billion times over a lifetime.",
  "Laughing can give your body a mini workout, too! It works out several muscles in the body and can burn calories.",
  "Exercising regularly can actually slow down the aging process at a cellular level, potentially leading to healthier and longer life.",
  "The human body has more than 650 muscles, which make up around 40% of our total body weight.",
  "Working out doesn't only burn fat but also helps to reduce anxiety and depression due to the endorphins that are released during physical activity.",
  "Eating breakfast can help kickstart your metabolism and keep you focused throughout the day.",
  "It's not just about diet and exercise – getting enough sleep is crucial to maintaining a healthy lifestyle.",
  "Water makes up about 60% of your body weight. Staying hydrated can help maintain bodily functions and even help you lose weight.",
  "A handful of nuts a day can provide your body with essential healthy fats, protein and vitamins.",
  "Spending time outdoors can improve your mood and boost your vitamin D levels.",
  "Mindful eating – taking the time to savor and enjoy your food – can help prevent overeating.",
  "Positive social interactions and maintaining healthy relationships can contribute to a healthier, happier lifestyle.",
  "Laughing not only works your muscles but it can also boost your immune system and mood.",
  "A diet rich in fruits and vegetables can lower the risk of many chronic diseases and keep your body functioning optimally.",
  "Regular meditation can help reduce stress and anxiety, promote emotional health, and improve concentration."
];


export const HOW_IT_WORKS_STEPS = [
  {
      title: "Create Profile",
      content: "In our fitness tracker app, set up your unique profile by providing key details such as name, age, height, weight, gender, and fitness goals. Based on this information, our sophisticated algorithm calculates your daily caloric needs, aligning them with your fitness objectives for a targeted and efficient approach.",
      bgImage: "image/path/here",
      icon: profileIcon,
      icon2: profileGirlIcon
  },
  {
      title: "Create Workouts and Goals",
      content: "Harness the power of our fitness tracker app to effortlessly create, manage, and track your unique fitness goals and workout routines. With the added feature of exploring and learning from the workout regimes of others, enhance your fitness journey and find new inspiration within our vibrant user community.",
      bgImage: "image/path/here",
      icon: goalIcon,
  },
  {
      title: "Participate in Energize Conquest",
      content: "As you work towards achieving your fitness goals, earn points and climb the ranks in our Energize community through the Energize Conquest game. Each completed goal translates into points, pushing you higher in our leaderboard. Challenge yourself, make progress, and have fun as you become a fitness conqueror.",
      bgImage: "image/path/here",
      icon: leadboard,
  },
  {
      title: "Embrace Your Journey, At Your Own Speed",
      content: "With Energize, our fitness tracker app, you can seamlessly log activities - from hydration to meals to workouts. These records allow you to track progress towards your fitness goals. Remember, this journey is uniquely yours; progress at your own pace, with no imposed constraints.",
      bgImage: "image/path/here",
      icon: progressIcon,
  },
];