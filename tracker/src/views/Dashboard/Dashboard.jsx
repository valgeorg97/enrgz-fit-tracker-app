import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

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
      Dashboard
    </>
  );
}

export default Dashboard;