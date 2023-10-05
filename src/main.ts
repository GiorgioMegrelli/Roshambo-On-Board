import "./loader";
import Canvas from "./canvas/Canvas";
import ICanvas from "./canvas/ICanvas";
import EmojiController from "./controller/EmojiController";
import { RandomInitCoordsProvider } from "./wrapper/providers/InitCoordsProvider";
import { D360InitDegreesProvider } from "./wrapper/providers/InitDegreesProvider";
import { CyclicInitValueProvider } from "./wrapper/providers/InitEmojiProvider";
import EmojiWrapperFactory from "./wrapper/EmojiWrapperFactory";

const MAX_EMOJI_SIZE = 30;
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
    FACTORY.createN(MAX_EMOJI_SIZE).forEach((wrapper) => {
        controller.register(wrapper);
    });
};

window.addEventListener("load", main);
