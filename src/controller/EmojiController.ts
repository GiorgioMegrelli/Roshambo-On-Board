import Canvas from "../canvas/Canvas";
import ICanvas from "../canvas/ICanvas";
import Coords from "../utils/classes/Coords";
import Direction from "../utils/classes/Direction";
import { BoundingSpace } from "../wrapper/BoundingSpace";
import EmojiWrapper from "../wrapper/EmojiWrapper";

const BORDERS: [BoundingSpace, string][] = [
    [
        BoundingSpace.fromTopLeft(
            Coords.of(0, 0), Canvas.BORDER, Canvas.HEIGHT,
        ),
        Direction.WEST,
    ], [
        BoundingSpace.fromTopLeft(
            Coords.of(0, 0), Canvas.WIDTH, Canvas.BORDER,
        ),
        Direction.NORTH,
    ], [
        BoundingSpace.fromTopLeft(
            Coords.of(Canvas.WIDTH_MIN_MAX[1], 0), Canvas.BORDER, Canvas.HEIGHT,
        ),
        Direction.EAST,
    ], [
        BoundingSpace.fromTopLeft(
            Coords.of(0, Canvas.HEIGHT_MIN_MAX[1]), Canvas.WIDTH, Canvas.BORDER,
        ),
        Direction.SOUTH,
    ],
];

const countInBorders = (coords: Coords): string[] => {
    const result: string[] = [];
    for(const [border, dir] of BORDERS) {
        if(border.containsPoint(coords)) {
            result.push(dir);
        }
    }
    return result;
};

class EmojiController {
    static readonly OFFSET = 2;

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
                const nextCoords = wrapper.nextCoords(EmojiController.OFFSET);
                const dirs = countInBorders(nextCoords);
                if(dirs.length === 0) {
                    wrapper.setCoords(nextCoords);
                    wrapper.redraw();
                } else {
                    wrapper.bouncingBack(dirs[0]);
                }
            });
        }, 40);
        setTimeout(() => {
            clearInterval(interval);
        }, 7000);
    }

    private computeKey(wrapper: EmojiWrapper): string {
        const coords = wrapper.getCoords();
        return coords.x + ":" + coords.y;
    }

}

export default EmojiController;
