import { Bee } from "./bee";
import { B } from "./global";

(B as Bee) = new Bee();

declare global{
    namespace JSX {
        interface Element extends HoneyBee.Element{ }
        interface IntrinsicElements extends HoneyBee.IntrinsicElements{}
    }
}
const HoneyBee = (B as Bee);
export default HoneyBee;


