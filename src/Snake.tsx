import React from "react";
import { SnakePoint } from "./SnakeGameState";
import styled from "styled-components";

const SnakeContainer = styled.div`
    position: relative;
    min-width: 300px;
    min-height: 300px;
    background-color: #f0f0f0;
    display: inline-block;

    & div.snake {
        position: absolute;
        min-width: 12px;
        min-height: 12px;
        background-color: #20b2aa;
    }

    & div.snake:first-child {
        background-color: #008b8b;
        z-index: 2;
    }
`;

export interface SnakeProps {
    snake: SnakePoint[];
}

export function Snake({ snake }: SnakeProps) {
    return (
        <SnakeContainer>
            {snake.map((segment: SnakePoint, index: number) => {
                const positioning = {
                    bottom: segment.y * 12,
                    left: segment.x * 12,
                };
                return <div className="snake" style={positioning} key={index} />;
            })}
        </SnakeContainer>
    );
}
