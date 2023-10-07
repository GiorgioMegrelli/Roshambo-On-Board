import Canvas from "../canvas/Canvas";
import ICanvas from "../canvas/ICanvas";
import { EMOJI_RULES } from "../const/emojis";
import ISimulationController from "../ui/ISimulationController";
import Coords from "../utils/classes/Coords";
import Degrees from "../utils/classes/Degrees";
import Direction from "../utils/classes/Direction";
import { BoundingSpace } from "../wrapper/BoundingSpace";
import EmojiCounter from "../wrapper/EmojiCounter";
import EmojiWrapper from "../wrapper/EmojiWrapper";
import IEmojiStateChangeListener from "./IEmojiStateChangeListener";
import EmojiWrapperZipper from "./helper/EmojiWrapperZipper";

const BORDERS: [BoundingSpace, Direction][] = [
    [
        BoundingSpace.fromTopLeft(Coords.of(0, 0), Canvas.BORDER, Canvas.HEIGHT),
        Direction.WEST,
    ], [
        BoundingSpace.fromTopLeft(Coords.of(0, 0), Canvas.WIDTH, Canvas.BORDER),
        Direction.NORTH,
    ], [
        BoundingSpace.fromTopLeft(Coords.of(Canvas.WIDTH_MIN_MAX[1], 0), Canvas.BORDER, Canvas.HEIGHT),
        Direction.EAST,
    ], [
        BoundingSpace.fromTopLeft(Coords.of(0, Canvas.HEIGHT_MIN_MAX[1]), Canvas.WIDTH, Canvas.BORDER),
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

class EmojiController implements ISimulationController {
    static readonly OFFSET = 2;
    static readonly SIMULATION_TIMEOUT = 25;

    private readonly canvas: ICanvas;
    private readonly wrappers: EmojiWrapper[] = [];
    private readonly listeners: IEmojiStateChangeListener[] = [];
    private simulationInterval: NodeJS.Timeout | null = null;

    constructor(canvas: ICanvas) {
        this.canvas = canvas;
    }

    register(wrapper: EmojiWrapper) {
        this.canvas.add(wrapper.getContainer());
        this.wrappers.push(wrapper);
        wrapper.redraw();
    }

    addListener(listener: IEmojiStateChangeListener) {
        this.listeners.push(listener);
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

        const zipper = new EmojiWrapperZipper(this.wrappers);
        while(zipper.hasNext()) {
            const [wrapperLeft, wrapperRight] = zipper.next();
            const boundingLeft = wrapperLeft.getBoundingSpace();
            const boundingRight = wrapperRight.getBoundingSpace();
            if(boundingLeft.hasOverlay(boundingRight)) {
                const valLeft = wrapperLeft.getValue();
                const valRight = wrapperRight.getValue();
                const diff = EMOJI_RULES[valLeft][valRight];
                if(diff > 0) {
                    wrapperRight.setValue(valLeft);
                } else if(diff < 0) {
                    wrapperLeft.setValue(valRight);
                }
                if(diff !== 0) {
                    wrapperLeft.setDegrees(
                        Degrees.opposite(wrapperLeft.getDegrees()),
                    );
                    wrapperRight.setDegrees(
                        Degrees.opposite(wrapperRight.getDegrees()),
                    );
                }
            }
        }

        if(this.getWinner() !== null) {
            this.stop();
        }
        this.invokeListeners();
    }

    startSimulation() {
        this.simulationInterval = setInterval(() => {
            this.nextStep();
        }, EmojiController.SIMULATION_TIMEOUT);
    }

    stop() {
        if(this.simulationInterval !== null) {
            clearInterval(this.simulationInterval);
            this.simulationInterval = null;
        }
    }

    isStopped(): boolean {
        return this.simulationInterval === null;
    }

    getEmojiFrequencies(): EmojiCounter {
        return new EmojiCounter(this.wrappers);
    }

    getWinner(): string | null {
        const freqs = this.getEmojiFrequencies().getFrequencies();
        const filtered = Object.entries(freqs).filter((val) => {
            const [_, freq] = val;
            return freq === this.wrappers.length;
        }).map((val) => {
            return val[0];
        });
        if(filtered.length === 0) {
            return null;
        }
        return filtered[0];
    }

    private invokeListeners() {
        for(const listener of this.listeners) {
            listener.update(this);
        }
    }

}

export default EmojiController;
