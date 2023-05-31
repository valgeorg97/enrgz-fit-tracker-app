const fitnessFacts = [
    "Just 30 minutes of moderate exercise a day can significantly improve your health and decrease the risk of chronic illnesses such as heart disease, diabetes, and certain types of cancer.",
    "Regular physical activity can increase your brain health and mental functions. Studies show that it can improve memory and thinking skills.",
    "Muscle is more metabolically active than fat. For each pound of muscle you gain, your body burns an extra 50 calories a day.",
    "During intense exercise, your body can produce up to 2 to 3 litres of sweat per hour.",
    "Women's muscles tend to fatigue less quickly than men's, but men are usually stronger.",
    "The heart is the strongest muscle in the body. On an average, it beats more than 2.5 billion times over a lifetime.",
    "Laughing can give your body a mini workout, too! It works out several muscles in the body and can burn calories.",
    "Exercising regularly can actually slow down the aging process at a cellular level, potentially leading to healthier and longer life.",
    "The human body has more than 650 muscles, which make up around 40% of our total body weight.",
    "Working out doesn't only burn fat but also helps to reduce anxiety and depression due to the endorphins that are released during physical activity."
];

const lifestyleFacts = [
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


const displayRandomFact = () => {
    const allFacts = fitnessFacts.concat(lifestyleFacts);
    const randomFact = allFacts[Math.floor(Math.random() * allFacts.length)];
    return randomFact;
}
export default displayRandomFact;