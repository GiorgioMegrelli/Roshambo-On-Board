import { InitCoordsProvider } from "../providers/InitCoordsProvider";
import { InitDegreesProvider } from "../providers/InitDegreesProvider";
import { InitValueProvider } from "../providers/InitEmojiProvider";
import EmojiWrapper from "./EmojiWrapper";

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
            value,
            coords.toArray(),
            degrees.degrees(),
        );
    }
}

export default EmojiWrapperFactory;
