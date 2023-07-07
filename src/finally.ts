import { Bee } from "./bee";
import { B } from "./global";

(B as Bee) = new Bee();
const HoneyBee = (B as Bee);
export default HoneyBee;