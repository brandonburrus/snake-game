import { Point, Rect } from "./game/State";

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
