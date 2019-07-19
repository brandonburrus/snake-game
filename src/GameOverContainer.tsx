import styled from "styled-components";
import { Rect } from "./State";

export interface GameOverProps {
    size: Rect;
    scale: number;
}

export default styled.div`
    min-width: ${(props: GameOverProps) => props.size.width + props.scale}px;
    min-height: ${(props: GameOverProps) => props.size.height + props.scale}px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: "Rubik", Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;

    & > h2 {
        font-size: 3rem;
        margin: 0.5rem;
    }

    & div#space-wrapper {
        margin: 3.5rem 0;
    }
`;
