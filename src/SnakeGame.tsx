import React from "react";
import { SnakePoint, GameApple, Rect } from "./SnakeGameState";
import styled from "styled-components/macro";

type SnakeContainerProps = {
    dimensions: Rect;
    scale: number;
};

const SnakeContainer = styled.div`
    position: relative;
    min-width: ${({ dimensions, scale }: SnakeContainerProps) => (dimensions.width + 1) * scale}px;
    min-height: ${({ dimensions, scale }: SnakeContainerProps) => (dimensions.height + 1) * scale}px;
    background-color: #f0f0f0;
    display: inline-block;

    & div.point {
        position: absolute;
        min-width: ${({ scale }: SnakeContainerProps) => scale}px;
        min-height: ${({ scale }: SnakeContainerProps) => scale}px;
    }

    & div.snake {
        background-color: #20b2aa;
    }

    & div.snake:first-child {
        background-color: #008b8b;
        z-index: 3;
    }

    & div.apple {
        background-color: #c40000;
        z-index: 2;
    }
`;

export interface SnakeProps {
    snake: SnakePoint[];
    apple: GameApple;
    dimensions: Rect;
    scale: number;
}

export function SnakeGame({ snake, apple, dimensions, scale }: SnakeProps) {
    return (
        <SnakeContainer dimensions={dimensions} scale={scale}>
            {snake.map((segment: SnakePoint, index: number) => {
                const positioning = {
                    bottom: segment.y * scale,
                    left: segment.x * scale,
                };
                return <div className="snake point" style={positioning} key={index} />;
            })}
            <div
                className="apple point"
                style={{
                    bottom: apple.position.y * scale,
                    left: apple.position.x * scale,
                }}
            />
        </SnakeContainer>
    );
}
