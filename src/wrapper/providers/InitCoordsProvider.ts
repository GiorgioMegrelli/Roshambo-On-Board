import Coords from "../../utils/classes/Coords";
import { getRandomInt } from "../../utils/functions/random";

export interface InitCoordsProvider {
    nextValue(): Coords;
}

export class RandomInitCoordsProvider implements InitCoordsProvider {
    private readonly minWidth: number;
    private readonly maxWidth: number;
    private readonly minHeight: number;
    private readonly maxHeight: number;

    constructor(...coords: number[]) {
        if(coords.length === 0) {
            throw new Error("Empty arguments: " + coords);
        }

        if(coords.length === 1) {
            this.minWidth = this.minHeight = 0;
            this.maxWidth = this.maxHeight = coords[0];
        } else if(coords.length < 4) {
            this.minWidth = this.minHeight = 0;
            this.maxWidth = coords[0];
            this.maxHeight = coords[1];
        } else {
            this.minWidth = coords[0];
            this.minHeight = coords[1];
            this.maxWidth = coords[2];
            this.maxHeight = coords[3];
        }

        if(this.minWidth < 0
        || this.minHeight < 0
        || this.minWidth >= this.maxWidth
        || this.minHeight >= this.maxHeight) {
            const dims = [
                this.minWidth,
                this.maxWidth,
                this.minHeight,
                this.maxHeight,
            ].join(", ");
            throw new Error("Invalid dimensions: " + dims);
        }
    }

    nextValue(): Coords {
        const x = getRandomInt(this.minWidth, this.maxWidth);
        const y = getRandomInt(this.minHeight, this.maxHeight);
        return Coords.of(x, y);
    }
}
