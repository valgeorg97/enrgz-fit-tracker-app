import React from 'react';
import CallToActionWithVideo from "./CallToActionWithVideo";
import { useNavigate } from "react-router-dom";
import Statistics from "./Statistics"
import UserTestimonials from './UserTestimonials';
import LandingPageNav from '../../components/LandingPageNav/LandingPageNav'; 
import About from "../About/About"
import HowItWorks from '../../components/HowItWorks/HowItWorks';
import LandingPageFooter from '../LandingPage/LandingPageFooter/LandingPageFooter'

const LandingPage = () => {
    const navigate = useNavigate();

    const navigateToLogin = () => {
        navigate("/login");
    };

    return (
        <div>
            <LandingPageNav /> 
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
            <div id="howItWorks">
              <HowItWorks onGetStartedClick={navigateToLogin}/>
            </div>
            <div>
              <LandingPageFooter />
            </div>
        </div>
    );
};

export default LandingPage;