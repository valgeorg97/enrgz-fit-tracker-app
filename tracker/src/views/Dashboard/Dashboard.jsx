import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import WaterCalculator from '../../components/WaterIntake/WaterIntake'; // adjust the import path according to your file structure

const Dashboard = () => {
//   const { isLoggedIn } = useContext(AuthContext);
//   let navigate = useNavigate();

//   useEffect(() => {
//     if (!isLoggedIn) {
//       navigate("/", { replace: true });
//     }
//   }, [isLoggedIn, navigate]);

  return (
    <>
      <WaterCalculator />
    </>
  );
}

export default Dashboard;