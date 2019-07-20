import React from "react";
import styled from "styled-components";
import ButtonStyling from "./components/ButtonStyling";
import { Link } from "react-router-dom";

const PageContainer = styled.section`
    background-color: #f9f9f9;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    & h1#game-title {
        margin: 1rem;
        font-size: 6rem;
        font-family: "Rubik", Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
        color: #333;
        text-transform: uppercase;
        position: relative;
        bottom: 6rem;
    }

    & h2#author-subtitle {
        font-size: 1.4rem;
        font-family: "Rubik", Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
        color: #333;
        position: relative;
        bottom: 6rem;
    }
`;

export default function HomePage() {
    return (
        <PageContainer>
            <h1 id="game-title">Snake</h1>
            <h2 id="author-subtitle">by Brandon Burrus</h2>
            <ButtonStyling id="game-link">
                <Link to="/game">Play Now</Link>
            </ButtonStyling>
        </PageContainer>
    );
}
