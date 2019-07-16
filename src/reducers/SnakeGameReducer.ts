import SnakeGameState, { SnakePoint, PlayerDirection } from "../SnakeGameState";
import { Action, MoveAction } from "./SnakeGameActions";

export default function reducer(state: SnakeGameState, action: Action): SnakeGameState {
    switch (action.type) {
        case "MOVE":
            const movement: PlayerDirection = (action as MoveAction).payload;
            if (movement === PlayerDirection.UNKNOWN) {
                return state;
            }
            const snakeHead: SnakePoint = state.snake[0];
            if (snakeHead && snakeHead.x === state.apple.position.x && snakeHead.y === state.apple.position.y) {
                state = reducer(state, { type: "EAT" });
            }
            return {
                ...state,
                snake: state.snake.map<SnakePoint>((snakeSegment: SnakePoint, position: number) => {
                    if (position === 0) {
                        let newSegment: SnakePoint;
                        switch (movement) {
                            case PlayerDirection.UP:
                                newSegment = { ...snakeSegment, y: snakeSegment.y + 1 };
                                break;
                            case PlayerDirection.DOWN:
                                newSegment = { ...snakeSegment, y: snakeSegment.y - 1 };
                                break;
                            case PlayerDirection.LEFT:
                                newSegment = { ...snakeSegment, x: snakeSegment.x - 1 };
                                break;
                            case PlayerDirection.RIGHT:
                                newSegment = { ...snakeSegment, x: snakeSegment.x + 1 };
                                break;
                            default:
                                throw new Error("Unknown player movement action was given.");
                        }
                        // TODO: Check if snake is out of game boundaries, ran into himself, or ate an apple
                        return newSegment;
                    } else if (snakeSegment.skipRenderSteps && snakeSegment.skipRenderSteps > 0) {
                        return {
                            ...snakeSegment,
                            skipRenderSteps: snakeSegment.skipRenderSteps - 1,
                        };
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
        case "GROW":
            if (state.snake.length > 0) {
                const lastSegment: SnakePoint = state.snake[state.snake.length - 1];
                return {
                    ...state,
                    snake: [
                        ...state.snake,
                        {
                            ...lastSegment,
                            skipRenderSteps: lastSegment.skipRenderSteps ? lastSegment.skipRenderSteps + 1 : 1,
                        },
                    ],
                };
            } else {
                return state;
            }
        case "EAT":
            return reducer(
                {
                    ...state,
                    apple: {
                        position: {
                            x: Math.floor(Math.random() * state.gameBoard.width),
                            y: Math.floor(Math.random() * state.gameBoard.height),
                        },
                    },
                    score: state.score + 1,
                },
                {
                    type: "GROW",
                }
            );
    }
}
