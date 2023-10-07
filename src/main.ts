import "./loader";
import Canvas from "./canvas/Canvas";
import ICanvas from "./canvas/ICanvas";
import EmojiController from "./controller/EmojiController";
import { RandomInitCoordsProvider } from "./wrapper/providers/InitCoordsProvider";
import { D360InitDegreesProvider } from "./wrapper/providers/InitDegreesProvider";
import { CyclicInitValueProvider } from "./wrapper/providers/InitEmojiProvider";
import EmojiWrapperFactory from "./wrapper/EmojiWrapperFactory";
import { EMOJIS } from "./const/emojis";
import UIController from "./ui/UIController";

const VARIATION = 10;
const MAX_EMOJI_SIZE = EMOJIS.length * VARIATION;

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
    const uiController = new UIController(controller);

    controller.addListener(uiController);

    FACTORY.createN(MAX_EMOJI_SIZE).forEach((wrapper) => {
        controller.register(wrapper);
    });
    controller.startSimulation();
};

window.addEventListener("load", main);
