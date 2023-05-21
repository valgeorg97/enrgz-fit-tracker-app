import React from 'react';
import CallToActionWithVideo from "./CallToActionWithVideo";
import { useNavigate } from "react-router-dom";
import Statistics from "./Statistics"

const LandingPage = () => {
    const navigate = useNavigate();

    const navigateToLogin = () => {
        navigate("/login");
    };

    return (
        <div>
            <CallToActionWithVideo onGetStartedClick={navigateToLogin} />
            <Statistics />
        </div>
    );
};

export default LandingPage;