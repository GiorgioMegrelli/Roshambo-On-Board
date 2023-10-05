class Coords {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    offset(offsetX: number, offsetY: number): Coords {
        return Coords.of(
            this.x + offsetX, this.y + offsetY,
        );
    }

    toArray(): number[] {
        return [this.x, this.y];
    }

    static of(x: number, y: number): Coords {
        return new Coords(x, y);
    }
}

export default Coords;
