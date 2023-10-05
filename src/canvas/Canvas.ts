import ICanvas from "./ICanvas";

class Canvas implements ICanvas {
    static readonly WIDTH = 800;
    static readonly HEIGHT = 600;
    static readonly BORDER = 30;
    static readonly WIDTH_MIN_MAX = [
        Canvas.BORDER, Canvas.WIDTH - Canvas.BORDER,
    ];
    static readonly HEIGHT_MIN_MAX = [
        Canvas.BORDER, Canvas.HEIGHT - Canvas.BORDER,
    ];
    static readonly CENTER_SIZE = 20;

    private canvas: HTMLElement;

    constructor(elementId: string = "canvas") {
        const canvas = document.getElementById(elementId);
        if(canvas === null) {
            throw new Error("Couldn't find element with id: " + elementId);
        }
        this.canvas = canvas;
        const styles = canvas.style;
        styles.width = Canvas.WIDTH + "px";
        styles.height = Canvas.HEIGHT + "px";
    }

    add(child: HTMLElement) {
        this.canvas.appendChild(child);
    }
}

export default Canvas;
