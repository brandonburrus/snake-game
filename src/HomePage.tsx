import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

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

    & a#game-link {
        background-color: #20b2aa;
        box-shadow: 3px 3px 0px #0f524f;
        color: white;
        padding: 1rem 3rem;
        text-decoration: none;
        font-family: "Rubik", Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
        font-size: 1.2rem;

        :hover {
            box-shadow: 5px 5px 0px #0f524f;
        }
    }
`;

export default function HomePage() {
    return (
        <PageContainer>
            <h1 id="game-title">Snake</h1>
            <h2 id="author-subtitle">by Brandon Burrus</h2>
            <Link id="game-link" to="/game">
                Play Now!
            </Link>
        </PageContainer>
    );
}
