import CallToActionWithVideo from "./CallToActionWithVideo";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
    const navigate = useNavigate();

    const navigateToLogin = () => {
        navigate("/login");
    };

    return (
        <CallToActionWithVideo onGetStartedClick={navigateToLogin} />
    );
};

export default LandingPage;