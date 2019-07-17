import SnakeGameState, { Point, SnakePoint, PlayerDirection } from "../SnakeGameState";
import { Action, MoveAction } from "./SnakeGameActions";
import { getCoordinateWhitelist, generateGridCoordinateList } from "../util";

export default function reducer(state: SnakeGameState, action: Action): SnakeGameState {
    if (action.type !== "NEW_GAME" && state.gameIsOver) {
        return state;
    }
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
                return {
                    ...state,
                    gameIsOver: true,
                };
                // Determin if the snake is attempting to go out of bounds
            } else if (
                snakeHead.x > state.gameBoard.size.width ||
                snakeHead.y > state.gameBoard.size.height ||
                snakeHead.x < 0 ||
                snakeHead.y < 0
            ) {
                return {
                    ...state,
                    gameIsOver: true,
                };
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
            const randomizeOptions: Point[] = getCoordinateWhitelist(
                generateGridCoordinateList(state.gameBoard.size),
                state.snake
            );
            if (randomizeOptions.length <= 0) {
                return {
                    ...state,
                    gameIsOver: true,
                };
            }
            return {
                ...reducer(state, {
                    type: "GROW",
                }),
                apple: {
                    position: randomizeOptions[Math.floor(Math.random() * randomizeOptions.length)],
                },
                score: state.score + 1,
                highScore: Math.max(state.highScore, state.score + 1),
            };
        case "NEW_GAME":
            return {
                ...state,
                snake: [{ x: 0, y: 0 }],
                score: 0,
                apple: {
                    position: {
                        x: Math.floor(Math.random() * state.gameBoard.size.width),
                        y: Math.floor(Math.random() * state.gameBoard.size.height),
                    },
                },
                gameIsOver: false,
            };
    }
}
