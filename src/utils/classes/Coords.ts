class Coords {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    offset(offsetX: number, offsetY: number): Coords {
        return new Coords(
            this.x + offsetX, this.y + offsetY,
        );
    }

    toArray(): number[] {
        return [this.x, this.y];
    }
}

export default Coords;
