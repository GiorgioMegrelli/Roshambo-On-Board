import Coords from "../utils/classes/Coords";
import Direction from "../utils/classes/Direction";

export class BoundingPoint {
    point: Coords;
    dir: Direction;

    constructor(point: Coords, dir: Direction) {
        this.point = point;
        this.dir = dir;
    }

    static from(coords: Coords): BoundingPoint {
        return new BoundingPoint(coords, Direction.NONE);
    }

}

export class BoundingSpace {
    private readonly center: Coords;
    private readonly width: number;
    private readonly height: number;
    private readonly halfWidth: number;
    private readonly halfHeight: number;

    constructor(center: Coords, width: number, height: number) {
        this.center = center;
        this.width = width;
        this.height = height;
        this.halfWidth = Math.floor(width / 2);
        this.halfHeight = Math.floor(height / 2);;
    }

    containsPoint(point: Coords | BoundingPoint): boolean {
        const minX = this.center.x - this.halfWidth;
        const maxX = this.center.x + this.halfWidth;
        const minY = this.center.y - this.halfHeight;
        const maxY = this.center.y + this.halfHeight;
        const x = (point instanceof Coords)? point.x: point.point.x;
        const y = (point instanceof Coords)? point.y: point.point.y;
        return minX < x && x < maxX
            && minY < y && y < maxY;
    }

    hasOverlay(other: BoundingSpace): boolean {
        const otherPoints: BoundingPoint[] = [
            ...other.getCorners(),
            ...other.getEdges(),
            BoundingPoint.from(other.center),
        ];
        for(const otherPoint of otherPoints) {
            if(this.containsPoint(otherPoint)) {
                return true;
            }
        }
        return false;
    }

    getTopLeft(): Coords {
        return this.center.offset(
            -this.halfWidth, -this.halfHeight,
        );
    }

    getCorners(): BoundingPoint[] {
        return [
            [-this.halfWidth, -this.halfHeight, Direction.NORTH_WEST],
            [this.halfWidth, -this.halfHeight, Direction.NORTH_EAST],
            [this.halfWidth, this.halfHeight, Direction.SOUTH_EAST],
            [-this.halfWidth, this.halfHeight, Direction.SOUTH_WEST],
        ].map((arr: [number, number, Direction]) => {
            const [offsetX, offsetY, dir] = arr;
            return new BoundingPoint(
                this.center.offset(offsetX, offsetY), dir,
            );
        });
    }

    getEdges(): BoundingPoint[] {
        return [
            [0, -this.halfHeight, Direction.NORTH],
            [this.halfWidth, 0, Direction.EAST],
            [0, this.halfHeight, Direction.SOUTH],
            [-this.halfWidth, 0, Direction.WEST],
        ].map((arr: [number, number, Direction]) => {
            const [offsetX, offsetY, dir] = arr;
            return new BoundingPoint(
                this.center.offset(offsetX, offsetY), dir,
            );
        });
    }

    getWidth(): number {
        return this.width;
    }

    getHeight(): number {
        return this.height;
    }

    static fromTopLeft(
        topLeft: Coords,
        width: number,
        height: number,
    ): BoundingSpace {
        const center = topLeft.offset(
            Math.floor(width / 2),
            Math.floor(height / 2),
        );

        return new BoundingSpace(
            center, width, height,
        );
    }

}
