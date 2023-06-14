import { FITNESS_FACTS } from "../../common/constants";

/**
 * Display a random fitness fact.
 *
 * @returns {string} A random fitness fact.
 */

const displayRandomFact = () => {
    const randomFact = FITNESS_FACTS[Math.floor(Math.random() * FITNESS_FACTS.length)];
    return randomFact;
}
export default displayRandomFact;