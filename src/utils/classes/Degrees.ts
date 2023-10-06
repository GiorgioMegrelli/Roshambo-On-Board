import Direction from "./Direction";

class Degrees {
    static readonly DIR_TO_DEGREES = {
        [Direction.NORTH]: 270,
        [Direction.EAST]: 0,
        [Direction.SOUTH]: 90,
        [Direction.WEST]: 180,
    };

    private readonly value: number;

    constructor(value: number) {
        this.value = value;
    }

    private toRadians() {
        return this.value * (Math.PI / 180);
    }

    degrees() {
        return this.value;
    }

    sin() {
        return Math.sin(this.toRadians());
    }

    cos() {
        return Math.cos(this.toRadians());
    }

    static bounceBack(degrees: Degrees, dir: string): Degrees {
        if(!Degrees.DIR_TO_DEGREES.hasOwnProperty(dir)) {
            throw new Error("Unknown direction: " + dir);
        }

        const value = degrees.degrees();
        const centerDegrees = Degrees.DIR_TO_DEGREES[dir];
        switch(dir) {
            case Direction.EAST:
                break;
            case Direction.SOUTH:
                break;
            case Direction.WEST:
                break;
            case Direction.NORTH:
                break;
        }
        return degrees;
    }

}

export default Degrees;
