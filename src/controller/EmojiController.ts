import Canvas from "../canvas/Canvas";
import ICanvas from "../canvas/ICanvas";
import Coords from "../utils/classes/Coords";
import { BoundingSpace } from "../wrapper/BoundingSpace";
import EmojiWrapper from "../wrapper/EmojiWrapper";

class EmojiController {
    private static readonly BORDERS: BoundingSpace[] = [
        BoundingSpace.fromTopLeft(
            Coords.of(0, 0), Canvas.BORDER, Canvas.HEIGHT,
        ),
        BoundingSpace.fromTopLeft(
            Coords.of(0, 0), Canvas.WIDTH, Canvas.BORDER,
        ),
        BoundingSpace.fromTopLeft(
            Coords.of(Canvas.WIDTH_MIN_MAX[1], 0), Canvas.BORDER, Canvas.HEIGHT,
        ),
        BoundingSpace.fromTopLeft(
            Coords.of(0, Canvas.HEIGHT_MIN_MAX[1]), Canvas.WIDTH, Canvas.BORDER,
        ),
    ];

    private readonly canvas: ICanvas;
    private readonly wrappers: EmojiWrapper[];
    private readonly wrapperKeys: Set<string>;

    constructor(canvas: ICanvas) {
        this.canvas = canvas;
        this.wrappers = [];
        this.wrapperKeys = new Set();
    }

    register(wrapper: EmojiWrapper) {
        const key = this.computeKey(wrapper);
        if(this.wrapperKeys.has(key)) {
            throw new Error("Duplicate key error");
        }

        this.canvas.add(wrapper.getContainer());
        this.wrappers.push(wrapper);
        this.wrapperKeys.add(key);
        wrapper.redraw();
    }

    nextStep() {
        const interval = setInterval(() => {
            this.wrappers.forEach((wrapper) => {
                const nextCoords = wrapper.nextCoords(1);
                if(!EmojiController.inBorders(nextCoords)) {
                    wrapper.setCoords(nextCoords);
                    wrapper.redraw();
                }
            });
        }, 25);
        setTimeout(() => {
            clearInterval(interval);
        }, 5000);
    }

    private computeKey(wrapper: EmojiWrapper): string {
        const coords = wrapper.getCoords();
        return coords.x + ":" + coords.y;
    }

    private static inBorders(coords: Coords): boolean {
        for(const border of EmojiController.BORDERS) {
            if(border.containsPoint(coords)) {
                return true;
            }
        }
        return false;
    }
}

export default EmojiController;
