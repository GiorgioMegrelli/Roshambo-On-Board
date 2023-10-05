import Degrees from "../../utils/classes/Degrees";
import { getRandomInt } from "../../utils/functions/random";

export interface InitDegreesProvider {
    nextValue(): Degrees;
}

export class D360InitDegreesProvider implements InitDegreesProvider {
    nextValue(): Degrees {
        return new Degrees(
            getRandomInt(0, 360)
        );
    }
}
