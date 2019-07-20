import { Point, Rect, PlayerDirection } from "./game/State";

export function generateGridCoordinateList(grid: Rect): Point[] {
    let coordinates: Point[] = [];
    for (let x = 0; x < grid.width; x++) {
        for (let y = 0; y < grid.height; y++) {
            coordinates.push({ x, y });
        }
    }
    return coordinates;
}

export function getCoordinateWhitelist(coordsinates: Point[], blacklist: Point[]): Point[] {
    return coordsinates.filter(
        (coordinate: Point) =>
            !blacklist.some((badCoordinate: Point) => {
                return coordinate.x === badCoordinate.x && coordinate.y === badCoordinate.y;
            })
    );
}

export function determineDirection(x: number, y: number, width: number): PlayerDirection {
    const invertedX: number = Math.abs(x - width);
    if (x > y) {
        if (invertedX > y) {
            return PlayerDirection.UP;
        } else {
            return PlayerDirection.RIGHT;
        }
    } else {
        if (invertedX > y) {
            return PlayerDirection.LEFT;
        } else {
            return PlayerDirection.DOWN;
        }
    }
}
