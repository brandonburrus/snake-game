import React, { ReactNode } from "react";
import styled from "styled-components";

const Styling = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 60px);

    & p#current-score {
        font-family: "Rubik", Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
        padding: 1.5rem;
    }
`;

export type GameContainerProps = {
    children?: ReactNode;
};

export default function({ children }: GameContainerProps) {
    return <Styling>{children}</Styling>;
}
