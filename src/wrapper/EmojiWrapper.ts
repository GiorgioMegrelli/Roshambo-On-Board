import Canvas from "../canvas/Canvas";
import Coords from "../utils/classes/Coords";
import Degrees from "../utils/classes/Degrees";
import { px } from "../utils/functions/style-units";
import { BoundingSquare } from "./BoundingSpace";

class EmojiWrapper {
    value: string;
    container: HTMLDivElement;
    coords: Coords;
    degrees: Degrees;

    constructor(
        initValue: string,
        coords: Coords,
        degrees: Degrees = new Degrees(0),
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

    redraw() {
        const width = this.container.offsetWidth;
        const height = this.container.offsetHeight;
        const styles = this.container.style;
        styles.left = px(this.coords.x - width / 2);
        styles.top = px(this.coords.y - height / 2);
    }

    getBoundingSquare(): BoundingSquare {
        return new BoundingSquare(
            new Coords(this.coords.x, this.coords.y), Canvas.CENTER_SIZE
        );
    }

}

export default EmojiWrapper;
