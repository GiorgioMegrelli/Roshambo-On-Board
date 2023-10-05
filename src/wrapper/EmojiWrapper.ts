import { px } from "../utils/functions/style-units";

class EmojiWrapper {
    value: string;
    container: HTMLDivElement;
    x: number;
    y: number;
    degrees: number;

    constructor(
        initValue: string,
        [x, y]: number[] = [0, 0],
        degrees: number = 0,
    ) {
        this.value = initValue;
        this.container = document.createElement("div");
        this.container.setAttribute("class", "canvas-emoji");
        this.container.innerHTML = initValue;
        this.x = x;
        this.y = y;
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
        styles.left = px(this.x - width / 2);
        styles.top = px(this.y - height / 2);
    }
}

export default EmojiWrapper;
