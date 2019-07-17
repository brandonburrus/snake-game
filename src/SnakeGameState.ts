export interface Point {
    x: number;
    y: number;
}

export interface SnakePoint extends Point {
    skipRenderSteps?: number;
}

export interface GameApple {
    position: Point;
}

export enum PlayerDirection {
    UP,
    DOWN,
    LEFT,
    RIGHT,
    UNKNOWN,
}

export interface Rect {
    width: number;
    height: number;
}

export default interface SnakeGameState {
    apple: GameApple;
    snake: SnakePoint[];
    gameBoard: {
        size: Rect;
        scale: number;
    };
    score: number;
    gameIsOver: boolean;
}
