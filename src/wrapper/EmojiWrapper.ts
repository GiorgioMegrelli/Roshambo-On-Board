import Canvas from "../canvas/Canvas";
import Coords from "../utils/classes/Coords";
import Degrees from "../utils/classes/Degrees";
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

    bouncingBack(dir: string) {
        console.log(
            Degrees.bounceBack(
                this.degrees, dir,
            )
        )
    }

}

export default EmojiWrapper;
