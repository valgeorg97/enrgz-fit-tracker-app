
import { FITNESS_FACTS } from "../../common/constants";


const displayRandomFact = () => {
    const randomFact = FITNESS_FACTS[Math.floor(Math.random() * FITNESS_FACTS.length)];
    return randomFact;
}
export default displayRandomFact;