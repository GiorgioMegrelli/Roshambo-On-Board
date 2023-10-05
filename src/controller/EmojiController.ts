import ICanvas from "../canvas/ICanvas";
import EmojiWrapper from "../wrapper/EmojiWrapper";

class EmojiController {
    private readonly canvas: ICanvas;
    private readonly wrappers: EmojiWrapper[];
    private readonly wrapperKeys: Set<unknown>;

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

        this.canvas.add(wrapper.container);
        this.wrappers.push(wrapper);
        this.wrapperKeys.add(key);
        wrapper.redraw();
    }

    private computeKey(wrapper: EmojiWrapper): string {
        const coords = wrapper.coords;
        return coords.x + ":" + coords.y;
    }
}

export default EmojiController;
