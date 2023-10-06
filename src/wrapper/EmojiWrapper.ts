import Canvas from "../canvas/Canvas";
import Coords from "../utils/classes/Coords";
import Degrees from "../utils/classes/Degrees";
import Direction from "../utils/classes/Direction";
import { px } from "../utils/functions/style-units";
import { BoundingSpace } from "./BoundingSpace";

class EmojiWrapper {
    private value: string;
    private container: HTMLDivElement;
    private coords: Coords;
    private degrees: Degrees;

    constructor(
        initValue: string,
        coords: Coords,
        degrees: Degrees,
    ) {
        this.value = initValue;
        this.container = document.createElement("div");
        this.container.setAttribute("class", "canvas-emoji");
        this.container.innerHTML = initValue;
        this.coords = coords;
        this.degrees = degrees;
    }

    setValue(value) {
        this.value = value;
        this.container.innerHTML = value;
    }

    getValue(): string {
        return this.value;
    }

    redraw() {
        const width = this.container.offsetWidth;
        const height = this.container.offsetHeight;
        const styles = this.container.style;
        styles.left = px(this.coords.x - width / 2);
        styles.top = px(this.coords.y - height / 2);
    }

    getContainer(): HTMLElement {
        return this.container;
    }

    getBoundingSpace(): BoundingSpace {
        return new BoundingSpace(
            Coords.of(this.coords.x, this.coords.y),
            Canvas.CENTER_SIZE,
            Canvas.CENTER_SIZE,
        );
    }

    setCoords(coords: Coords) {
        this.coords = coords;
    }

    getCoords(): Coords {
        return this.coords;
    }

    nextCoords(distance: number): Coords {
        const offsetX = Math.round(
            this.degrees.cos() * distance,
        );
        const offsetY = Math.round(
            this.degrees.sin() * distance,
        );

        return this.coords.offset(offsetX, offsetY);
    }

    setDegrees(degrees: Degrees) {
        this.degrees = degrees;
    }

    getDegrees(): Degrees {
        return this.degrees;
    }

    bounceBack(dir: string): Degrees {
        const newValue = (() => {
            const value = this.degrees.degrees();
            if(value % Degrees.ONE_QUARTER_CICLE === 0) {
                return value;
            }

            switch(dir) {
                case Direction.EAST:
                    if(value < 90)
                        return -value;
                    if(value > 270)
                        return 360 - value;
                case Direction.SOUTH:
                    return 180 - value;
                case Direction.WEST:
                    return 360 - value;
                case Direction.NORTH:
                    return 540 - value;
            }

            throw new Error("Unknown direction: " + dir);
        })();
        return Degrees.opposite(newValue);
    }

}

export default EmojiWrapper;
