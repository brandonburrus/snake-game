import SnakeGameState, { SnakePoint, PlayerDirection } from "../SnakeGameState";
import { Action, MoveAction } from "./SnakeGameActions";

export default function(state: SnakeGameState, action: Action): SnakeGameState {
    switch (action.type) {
        case "MOVE":
            const movement: PlayerDirection = (action as MoveAction).payload;
            if (movement === PlayerDirection.UNKNOWN) {
                return state;
            }
            return {
                ...state,
                snake: state.snake.map<SnakePoint>((snakeSegment: SnakePoint, position: number) => {
                    if (position === 0) {
                        switch (movement) {
                            case PlayerDirection.UP:
                                return { ...snakeSegment, y: snakeSegment.y + 1 };
                            case PlayerDirection.DOWN:
                                return { ...snakeSegment, y: snakeSegment.y - 1 };
                            case PlayerDirection.LEFT:
                                return { ...snakeSegment, x: snakeSegment.x - 1 };
                            case PlayerDirection.RIGHT:
                                return { ...snakeSegment, x: snakeSegment.x + 1 };
                            default:
                                throw new Error("Unknown player movement action was given.");
                        }
                    } else {
                        const previousSegment: SnakePoint = state.snake[position - 1];
                        if (previousSegment) {
                            return previousSegment;
                        } else {
                            return snakeSegment;
                        }
                    }
                }),
            };
    }
}
