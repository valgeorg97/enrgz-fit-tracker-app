import React, { useEffect, useState, useContext } from 'react';
import { db} from '../../services/firebase';
import { doc, getDoc } from "firebase/firestore";
import { AuthContext } from '../../context/AuthContext';

const WaterCalculator = () => {
  const [weight, setWeight] = useState(null);
  const [consumedWater, setConsumedWater] = useState(0);
  const { userID, userDocID } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserData = async () => {
      if(userDocID){
        const docRef = doc(db, 'users', userDocID);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setWeight(docSnap.data().weight);
        } else {
          console.log("No such document!");
        }
      }
    }

    fetchUserData();
  }, [userDocID]);

  const calculateWaterIntake = () => {
    if (!weight) {
      return 'Loading...';
    }

    let waterIntake = 0.03 * weight;
    return waterIntake;
  }

  const calculatePercentage = () => {
    let totalIntake = calculateWaterIntake();
    let percentage = (consumedWater / totalIntake) * 100;
    return Math.min(percentage, 100);  // cap it at 100%
  }

  return (
    <div>
      <h2>Water Intake</h2>
      <div>
        <p>Your weight: {weight ? weight + ' kg' : 'Loading...'}</p>
      </div>
      <div>
        <p>Your recommended water intake is: {calculateWaterIntake()} liters</p>
      </div>
      <div>
        <label>Water consumed today (in liters): </label>
        <input 
          type="number" 
          value={consumedWater}
          min="0"
          onChange={(e) => setConsumedWater(parseFloat(e.target.value))}
        />
      </div>
      <div>
        <h3>Progress:</h3>
        <progress value={calculatePercentage()} max="100" />
        <p>{calculatePercentage()}%</p>
      </div>
    </div>
  );
}

export default WaterCalculator;