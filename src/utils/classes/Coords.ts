class Coords {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    toArray(): number[] {
        return [this.x, this.y];
    }
}

export default Coords;
