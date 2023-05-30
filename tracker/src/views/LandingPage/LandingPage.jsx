import React from 'react';
import CallToActionWithVideo from "./CallToActionWithVideo";
import { useNavigate } from "react-router-dom";
import Statistics from "./Statistics"
import UserTestimonials from './UserTestimonials';
import LandingPageNav from '../../components/LandingPageNav/LandingPageNav'; // Make sure to import your navigation component

const LandingPage = () => {
    const navigate = useNavigate();

    const navigateToLogin = () => {
        navigate("/login");
    };

    return (
        <div>
            <LandingPageNav /> {/* This is your navigation component */}
            <CallToActionWithVideo onGetStartedClick={navigateToLogin} />
            <Statistics />
            <UserTestimonials />
        </div>
    );
};

export default LandingPage;