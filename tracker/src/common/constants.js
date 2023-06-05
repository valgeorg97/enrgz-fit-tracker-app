import profileIcon from "../assets/fitnessIcon.png"
import goalIcon from "../assets/goalIcon.png"
import progressIcon from "../assets/pace.png"
import profileGirlIcon from "../assets/177687.png"
import leadboard from "../assets/leadboard.png"

export const countryCodes = [
    { code: "+355", country: "Albania" },
    { code: "+376", country: "Andorra" },
    { code: "+374", country: "Armenia" },
    { code: "+43", country: "Austria" },
    { code: "+375", country: "Belarus" },
    { code: "+32", country: "Belgium" },
    { code: "+387", country: "Bosnia and Herzegovina" },
    { code: "+359", country: "Bulgaria" },
    { code: "+385", country: "Croatia" },
    { code: "+357", country: "Cyprus" },
    { code: "+420", country: "Czech Republic" },
    { code: "+45", country: "Denmark" },
    { code: "+372", country: "Estonia" },
    { code: "+358", country: "Finland" },
    { code: "+33", country: "France" },
    { code: "+49", country: "Germany" },
    { code: "+30", country: "Greece" },
    { code: "+36", country: "Hungary" },
    { code: "+354", country: "Iceland" },
    { code: "+353", country: "Ireland" },
    { code: "+39", country: "Italy" },
    { code: "+371", country: "Latvia" },
    { code: "+423", country: "Liechtenstein" },
    { code: "+370", country: "Lithuania" },
    { code: "+352", country: "Luxembourg" },
    { code: "+389", country: "North Macedonia" },
    { code: "+356", country: "Malta" },
    { code: "+373", country: "Moldova" },
    { code: "+377", country: "Monaco" },
    { code: "+382", country: "Montenegro" },
    { code: "+31", country: "Netherlands" },
    { code: "+47", country: "Norway" },
    { code: "+48", country: "Poland" },
    { code: "+351", country: "Portugal" },
    { code: "+40", country: "Romania" },
    { code: "+7", country: "Russia" },
    { code: "+378", country: "San Marino" },
    { code: "+381", country: "Serbia" },
    { code: "+421", country: "Slovakia" },
    { code: "+386", country: "Slovenia" },
    { code: "+34", country: "Spain" },
    { code: "+46", country: "Sweden" },
    { code: "+41", country: "Switzerland" },
    { code: "+380", country: "Ukraine" },
    { code: "+44", country: "United Kingdom" },
    { code: "+379", country: "Vatican City" },
  ];
  
  export const difficulties = [
    { label: 'Easy', value: 'easy', color: 'green.500' },
    { label: 'Medium', value: 'medium', color: 'yellow.500' },
    { label: 'Hard', value: 'hard', color: 'red.500' },
  ];
  
export const muscles = ['abdominals', 'abductors', 'adductors', 'biceps', 'calves', 'chest', 'forearms', 'glutes', 'hamstrings', 'lats', 'lower_back', 'middle_back', 'neck', 'quadriceps', 'traps', 'triceps'];
  
//workouts & nutrition intake API KEY
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
      'Since using ENERGIZE fitness tracker, I no longer wonder if I can indulge in a DONER today. Instead, I simply check the number of calories I\'ve consumed and make an informed decision based on that. ENERGIZE helps me maintain a balanced approach to my diet and empowers me to make mindful choices.',
    avatar:
      'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
  },
  {
    name: 'Krysta B.',
    role: 'User',
    content:
      "Never have I come across a more efficient fitness tracker. It’s streamlined, user-friendly, and offers a wealth of information about my workouts and calorie burn. A real game-changer in personal fitness technology!",
    avatar:
      'https://images.unsplash.com/photo-1598550874175-4d0ef436c909?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
  },
  {
    name: 'Darcy L.',
    role: 'User',
    content:
      "This fitness tracker has been a revelation, meticulously keeping track of my goals and workouts. It's my daily motivator, always pushing me to hit that extra step or burn that extra calorie.",
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=334&q=80',
  },
  {
    name: 'Daniel T.',
    role: 'User',
    content:
      "The goal tracking feature on this fitness tracker has been a major asset. I've seen significant progress in my fitness level, and the precise calorie count has helped keep my diet in check.",
    avatar:
      'https://images.unsplash.com/photo-1606513542745-97629752a13b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
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