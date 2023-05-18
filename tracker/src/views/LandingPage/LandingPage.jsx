import Login from "../Authentication/Login/Login";
import Register from "../Authentication/Register/Register";
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