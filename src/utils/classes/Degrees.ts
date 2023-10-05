class Degrees {
    private value: number;

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
}

export default Degrees;
