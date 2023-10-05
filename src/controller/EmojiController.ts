import ICanvas from "../canvas/ICanvas";
import EmojiWrapper from "../wrapper/EmojiWrapper";

class EmojiController {
    private readonly canvas: ICanvas;
    private readonly wrappers: EmojiWrapper[];

    constructor(canvas: ICanvas) {
        this.canvas = canvas;
        this.wrappers = [];
    }

    register(wrapper: EmojiWrapper) {
        this.canvas.add(wrapper.container);
        this.wrappers.push(wrapper);
        wrapper.redraw();
    }
}

export default EmojiController;
