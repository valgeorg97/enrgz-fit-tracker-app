import React from 'react';
import CallToActionWithVideo from "./CallToActionWithVideo";
import { useNavigate } from "react-router-dom";
import Statistics from "./Statistics"
import UserTestimonials from './UserTestimonials';
import LandingPageNav from '../../components/LandingPageNav/LandingPageNav'; 
import About from "../About/About"

const LandingPage = () => {
    const navigate = useNavigate();

    const navigateToLogin = () => {
        navigate("/login");
    };

    return (
        <div>
            <LandingPageNav /> {/* This is your navigation component */}
            <div id="home">
              <CallToActionWithVideo onGetStartedClick={navigateToLogin} />
            </div>
            <Statistics />
            <div id="our-users">
              <UserTestimonials />
            </div>
            <div id="about">
              <About />
            </div>
        </div>
    );
};

export default LandingPage