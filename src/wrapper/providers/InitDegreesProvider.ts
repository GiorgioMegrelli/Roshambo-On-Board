import Degrees from "../../utils/classes/Degrees";
import { getRandomInt } from "../../utils/functions/random";

export interface InitDegreesProvider {
    nextValue(): Degrees;
}

export class D360InitDegreesProvider implements InitDegreesProvider {
    private static readonly DIFF = 15;

    nextValue(): Degrees {
        const scale = getRandomInt(360 / D360InitDegreesProvider.DIFF);
        return Degrees.of(scale * D360InitDegreesProvider.DIFF);
    }
}
