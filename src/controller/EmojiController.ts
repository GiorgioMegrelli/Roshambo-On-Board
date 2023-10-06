import Canvas from "../canvas/Canvas";
import ICanvas from "../canvas/ICanvas";
import { EMOJI_RULES } from "../const/emojis";
import ISimulationController from "../ui/ISimulationController";
import Coords from "../utils/classes/Coords";
import Direction from "../utils/classes/Direction";
import { BoundingSpace } from "../wrapper/BoundingSpace";
import EmojiCounter from "../wrapper/EmojiCounter";
import EmojiWrapper from "../wrapper/EmojiWrapper";
import IEmojiStateChangeListener from "./IEmojiStateChangeListener";

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

        for(let i = 0; i < this.wrappers.length; i++) {
            const wrapper_i = this.wrappers[i];
            const wrapperBounding_i = wrapper_i.getBoundingSpace();
            for(let j = i + 1; j < this.wrappers.length; j++) {
                const wrapper_j = this.wrappers[j];
                const wrapperBounding_j = wrapper_j.getBoundingSpace();
                if(wrapperBounding_i.hasOverlay(wrapperBounding_j)) {
                    const val_i = wrapper_i.getValue();
                    const val_j = wrapper_j.getValue();
                    const diff = EMOJI_RULES[val_i][val_j];
                    if(diff > 0) {
                        wrapper_j.setValue(val_i);
                    } else if(diff < 0) {
                        wrapper_i.setValue(val_j);
                    } else {
                        continue;
                    }
                }
            }
        }

        this.invokeListeners();
        if(this.isWin()) {
            this.stop();
        }
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

    private invokeListeners() {
        for(const listener of this.listeners) {
            listener.update(this);
        }
    }

    private isWin(): boolean {
        const freqs = this.getEmojiFrequencies().getFrequencies();
        return Object.entries(freqs).some((val) => {
            const [_, freq] = val;
            return freq === this.wrappers.length;
        });
    }

}

export default EmojiController;
