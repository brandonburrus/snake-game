import SnakeGameState, { SnakePoint, PlayerDirection } from "../SnakeGameState";
import { Action, MoveAction } from "./SnakeGameActions";

export default function reducer(state: SnakeGameState, action: Action): SnakeGameState {
    switch (action.type) {
        case "MOVE":
            const movement: PlayerDirection = (action as MoveAction).payload;
            if (movement === PlayerDirection.UNKNOWN) {
                return state;
            }
            const movementReduction = {
                ...state,
                snake: state.snake.map<SnakePoint>((snakeSegment: SnakePoint, position: number) => {
                    // Snakes head is always the first element in the snake array
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
            const snakeHead = movementReduction.snake[0];
            // Determine if the snake ate an apple (comparing snake head location to apple location)
            if (snakeHead && snakeHead.x === state.apple.position.x && snakeHead.y === state.apple.position.y) {
                return reducer(movementReduction, { type: "EAT" });
                // Determine if the snake is trying to run into itself (returning game over if so)
            } else if (state.snake.some((segment: SnakePoint) => segment.x === snakeHead.x && segment.y === snakeHead.y)) {
                return state;
                // Determin if the snake is attempting to go out of bounds
            } else if (
                snakeHead.x > state.gameBoard.size.width ||
                snakeHead.y > state.gameBoard.size.height ||
                snakeHead.x < 0 ||
                snakeHead.y < 0
            ) {
                return state;
            }
            return movementReduction;
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
            // TODO: Ensure randomized location is not in snakes body
            return {
                ...reducer(state, {
                    type: "GROW",
                }),
                apple: {
                    position: {
                        x: Math.floor(Math.random() * state.gameBoard.size.width),
                        y: Math.floor(Math.random() * state.gameBoard.size.height),
                    },
                },
                score: state.score + 1,
            };
    }
}
