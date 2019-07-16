import React from "react";
import { SnakePoint, GameApple } from "./SnakeGameState";
import styled from "styled-components";

const SnakeContainer = styled.div`
    position: relative;
    min-width: 300px;
    min-height: 300px;
    background-color: #f0f0f0;
    display: inline-block;

    & div.point {
        position: absolute;
        min-width: 12px;
        min-height: 12px;
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
}

export function Snake({ snake, apple }: SnakeProps) {
    return (
        <SnakeContainer>
            {snake.map((segment: SnakePoint, index: number) => {
                const positioning = {
                    bottom: segment.y * 12,
                    left: segment.x * 12,
                };
                return <div className="snake point" style={positioning} key={index} />;
            })}
            <div
                className="apple point"
                style={{
                    bottom: apple.position.y * 12,
                    left: apple.position.x * 12,
                }}
            />
        </SnakeContainer>
    );
}
