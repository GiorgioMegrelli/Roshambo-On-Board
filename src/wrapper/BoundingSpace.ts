import Coords from "../utils/classes/Coords";
import Direction from "../utils/classes/Direction";

export class BoundingPoint {
    point: Coords;
    dir: Direction;

    constructor(point: Coords, dir: Direction) {
        this.point = point;
        this.dir = dir;
    }
}

export class BoundingSquare {
    private readonly center: Coords;
    private readonly halfSize: number;

    constructor(center: Coords, squareSize: number) {
        this.center = center;
        this.halfSize = Math.floor(squareSize / 2);
    }

    containsPoint(point: BoundingPoint): boolean {
        const minX = this.center.x - this.halfSize;
        const maxX = this.center.x + this.halfSize;
        const minY = this.center.y - this.halfSize;
        const maxY = this.center.y + this.halfSize;
        const x = point.point.x;
        const y = point.point.y;
        return minX < x && x < maxX
            && minY < y && y < maxY;
    }

    hasOverlay(other: BoundingSquare): boolean {
        const otherCorners = other.getCorners();
        for(let i = 0; i < otherCorners.length; i++) {
            if(this.containsPoint(otherCorners[i])) {
                return true;
            }
        }
        return false;
    }

    getTopLeft(): Coords {
        return this.center.offset(
            -this.halfSize, -this.halfSize,
        );
    }

    getCorners(): BoundingPoint[] {
        const halfSize = this.halfSize;
        return [
            [-halfSize, -halfSize, Direction.NORTH_WEST],
            [halfSize, -halfSize, Direction.NORTH_EAST],
            [halfSize, halfSize, Direction.SOUTH_EAST],
            [-halfSize, halfSize, Direction.SOUTH_WEST],
        ].map((arr) => {
            const [offsetX, offsetY, dir] = arr;
            return new BoundingPoint(
                this.center.offset(offsetX, offsetY), dir,
            );
        });
    }

    getEdges(): BoundingPoint[] {
        const halfSize = this.halfSize;
        return [
            [0, -halfSize, Direction.NORTH],
            [halfSize, 0, Direction.EAST],
            [0, halfSize, Direction.SOUTH],
            [-halfSize, 0, Direction.WEST],
        ].map((arr) => {
            const [offsetX, offsetY, dir] = arr;
            return new BoundingPoint(
                this.center.offset(offsetX, offsetY), dir,
            );
        });
    }
}
