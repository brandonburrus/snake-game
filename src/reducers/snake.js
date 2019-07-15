export default function snakeReducer(snake, action) {
    switch (action.type) {
        case "MOVE":
            const snakeHead = snake[0];
            const { apple } = action.payload;
            if (snakeHead && apple && snakeHead.x === apple.x && snakeHead.y === apple.y) {
                apple.scramble();
                snake = snakeReducer(snake, {
                    type: "GROW",
                });
            }
            return snake.map((segment, position) => {
                if (position === 0) {
                    switch (action.payload.direction) {
                        case "UP":
                            return { ...segment, y: segment.y + 1 };
                        case "DOWN":
                            return { ...segment, y: segment.y - 1 };
                        case "RIGHT":
                            return { ...segment, x: segment.x + 1 };
                        case "LEFT":
                            return { ...segment, x: segment.x - 1 };
                        default:
                            throw new Error("Unknown player direction was dispatched to snake state reducer");
                    }
                } else if (segment.skipRenderSteps && segment.skipRenderSteps > 0) {
                    return { ...segment, skipRenderSteps: segment.skipRenderSteps - 1 };
                } else {
                    const previousSegment = snake[position - 1];
                    return { ...previousSegment };
                }
            });
        case "GROW":
            const lastSegment = snake[snake.length - 1];
            if (!lastSegment) {
                return snake;
            }
            return [...snake, { ...lastSegment, skipRenderSteps: 1 }];
        default:
            throw new Error("Unknown action was dispatched!");
    }
}
