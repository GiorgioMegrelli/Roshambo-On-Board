import { InitCoordsProvider } from "./providers/InitCoordsProvider";
import { InitDegreesProvider } from "./providers/InitDegreesProvider";
import { InitValueProvider } from "./providers/InitEmojiProvider";
import EmojiWrapper from "./EmojiWrapper";
import Canvas from "../canvas/Canvas";
import { getRandomInt, shuffle } from "../utils/functions/random";
import Coords from "../utils/classes/Coords";

class EmojiWrapperFactory {
    private readonly initValueProvider: InitValueProvider;
    private readonly initCoordsProvider: InitCoordsProvider;
    private readonly initDegreesProvider: InitDegreesProvider;

    constructor(
        initValueProvider: InitValueProvider,
        initCoordsProvider: InitCoordsProvider,
        initDegreesProvider: InitDegreesProvider,
    ) {
        this.initValueProvider = initValueProvider;
        this.initCoordsProvider = initCoordsProvider;
        this.initDegreesProvider = initDegreesProvider;
    }

    create(): EmojiWrapper {
        const value = this.initValueProvider.nextValue();
        const coords = this.initCoordsProvider.nextValue();
        const degrees = this.initDegreesProvider.nextValue();
        return new EmojiWrapper(
            value, coords, degrees,
        );
    }

    createN(n: number): EmojiWrapper[] {
        const [widthMin, widthMax] = Canvas.WIDTH_MIN_MAX;
        const [heightMin, heightMax] = Canvas.HEIGHT_MIN_MAX;
        const alpha = Canvas.CENTER_SIZE + 10;
        const result = [];
        for(let i = widthMin; i <= widthMax; i += alpha) {
            for(let j = heightMin; j <= heightMax; j += alpha) {
                result.push([i, j]);
            }
        }

        if(result.length < n) {
            throw new Error("Number of possible location is less than " + n);
        }

        return shuffle(result).slice(0, n).map(coords => {
            return new EmojiWrapper(
                this.initValueProvider.nextValue(),
                Coords.of(coords[0], coords[1]),
                this.initDegreesProvider.nextValue(),
            );
        });
    }

}

export default EmojiWrapperFactory;
