import Direction from "./Direction";

class Degrees {
    static readonly ONE_QUARTER_CICLE = 90;
    static readonly HALF_CICLE = 180;
    static readonly TWO_QUARTER_CICLE = 270;
    static readonly FULL_CICLE = 360;
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
        return this.value * (Math.PI / Degrees.HALF_CICLE);
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

    static of(value: number | Degrees): Degrees {
        if(value instanceof Degrees) {
            return new Degrees(value.degrees());
        }
        return new Degrees(value);
    }

    static opposite(value: number | Degrees): Degrees {
        let degrees = (value instanceof Degrees)? value.degrees(): value;
        if(degrees < Degrees.HALF_CICLE) {
            degrees += Degrees.HALF_CICLE;
        } else {
            degrees -= Degrees.HALF_CICLE;
        }
        return new Degrees(degrees);
    }

}

export default Degrees;
