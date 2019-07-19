import { generateGridCoordinateList, getCoordinateWhitelist } from "./util";

describe("Utilities functions", () => {
    const WIDTH = 2,
        HEIGHT = 2;
    test("A list of coordinate points is generated", () => {
        const grid = generateGridCoordinateList({ width: WIDTH, height: HEIGHT });
        const expected = [{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }, { x: 1, y: 0 }];
        expect(grid).toBeDefined();
        expect(grid).toHaveLength(WIDTH * HEIGHT);
        expect(grid).toEqual(expect.arrayContaining(expected));
    });
    test("A whitelist of coordinates is generated", () => {
        const blacklist = [{ x: 0, y: 0 }];
        const input = [{ x: 0, y: 0 }, { x: 1, y: 1 }];
        const expected = [{ x: 1, y: 1 }];
        const test = getCoordinateWhitelist(input, blacklist);
        expect(test).toBeDefined();
        expect(test).toEqual(expected);
    });
});
