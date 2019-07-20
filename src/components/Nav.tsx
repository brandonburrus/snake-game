import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NavContainer = styled.nav`
    display: block;
    padding: 0.75rem 1.25rem;
    background-color: #e9e9e9;
    display: flex;
    flex-direction: row;
    align-items: center;

    & h1 > a {
        font-family: "Rubik", Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
        font-size: 2rem;
        color: #20b2aa;
        display: inline-block;
        margin: 0.25rem 0.4rem;
        margin-right: 1rem;
        text-decoration: none;
    }

    & > a {
        margin: 0.6rem;
        font-family: "Rubik", Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
        font-size: 1rem;
        color: #333;
        text-decoration: none;
        text-transform: uppercase;
    }
`;

export default function Nav() {
    return (
        <NavContainer>
            <h1>
                <Link to="/">Snake</Link>
            </h1>
            <Link to="/">Home</Link>
            <Link to="/game">Game</Link>
        </NavContainer>
    );
}
