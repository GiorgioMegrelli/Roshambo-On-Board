import Canvas from "../canvas/Canvas";
import ICanvas from "../canvas/ICanvas";
import Coords from "../utils/classes/Coords";
import Direction from "../utils/classes/Direction";
import { BoundingSpace } from "../wrapper/BoundingSpace";
import EmojiWrapper from "../wrapper/EmojiWrapper";

const BORDERS: [BoundingSpace, Direction][] = [
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

const countInBorders = (coords: Coords): Direction[] => {
    const result: Direction[] = [];
    for(const [border, dir] of BORDERS) {
        if(border.containsPoint(coords)) {
            result.push(dir);
        }
    }
    return result;
};

class EmojiController {
    static readonly OFFSET = 2;
    static readonly SIMULATION_TIMEOUT = 25;

    private readonly canvas: ICanvas;
    private readonly wrappers: EmojiWrapper[];

    constructor(canvas: ICanvas) {
        this.canvas = canvas;
        this.wrappers = [];
    }

    register(wrapper: EmojiWrapper) {
        this.canvas.add(wrapper.getContainer());
        this.wrappers.push(wrapper);
        wrapper.redraw();
    }

    nextStep() {
        for(const wrapper of this.wrappers) {
            const nextCoords = wrapper.nextCoords(EmojiController.OFFSET);
            const dirs = countInBorders(nextCoords);
            if(dirs.length === 0) {
                wrapper.setCoords(nextCoords);
                wrapper.redraw();
            } else {
                wrapper.setDegrees(
                    wrapper.bounceBack(dirs[0]),
                );
            }
        }
    }

    startSimulation() {
        setInterval(() => {
            this.nextStep();
        }, EmojiController.SIMULATION_TIMEOUT);
    }

}

export default EmojiController;
