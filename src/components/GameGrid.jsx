import React from "react";
import styled, { css } from "styled-components";

const Grid = styled.div`
    display: inline-grid;
    grid-template-rows: repeat(${props => props.w}, 1fr);
    grid-template-columns: repeat(${props => props.h}, 1fr);
    grid-gap: 5px;
`;

const GridSegment = styled.div`
    width: 16px;
    height: 16px;
    background: #f0f0f0;
    ${props =>
        props.snake &&
        css`
            background: blue;
        `}
    ${props =>
        props.apple &&
        css`
            background: red;
        `}
`;

export default function GameGrid({ width, height, snake, apple }) {
    return (
        <section>
            <Grid w={width} h={height}>
                {[...new Array(width * height).keys()].map(key => {
                    // Determine X and Y coordinates based on the current iteration
                    const [x, y] = [
                        Math.floor(key % height) - Math.floor(width / 2),
                        -Math.floor(key / width) + Math.floor(height / 2),
                    ];
                    if (snake) {
                        for (let segment of snake) {
                            if (segment.x === x && segment.y === y) {
                                return <GridSegment snake key={key} />;
                            }
                        }
                    }
                    if (apple && apple.x === x && apple.y === y) {
                        return <GridSegment apple key={key} />;
                    }
                    return <GridSegment key={key} x={x} y={y} />;
                })}
            </Grid>
        </section>
    );
}
