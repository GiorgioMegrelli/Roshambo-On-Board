import Canvas from "./canvas/Canvas";
import ICanvas from "./canvas/ICanvas";
import EmojiController from "./controller/EmojiController";
import { RandomInitCoordsProvider } from "./providers/InitCoordsProvider";
import { D360InitDegreesProvider } from "./providers/InitDegreesProvider";
import { CyclicInitValueProvider } from "./providers/InitEmojiProvider";
import EmojiWrapperFactory from "./wrapper/EmojiWrapperFactory";

const FACTORY = new EmojiWrapperFactory(
    new CyclicInitValueProvider(),
    new RandomInitCoordsProvider(
        Canvas.WIDTH_MIN_MAX[0],
        Canvas.HEIGHT_MIN_MAX[0],
        Canvas.WIDTH_MIN_MAX[1],
        Canvas.HEIGHT_MIN_MAX[1],
    ),
    new D360InitDegreesProvider(),
);

const main = () => {
    const canvas: ICanvas = new Canvas();
    const controller = new EmojiController(canvas);
};

window.addEventListener("load", main);
