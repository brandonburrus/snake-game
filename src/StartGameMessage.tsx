import styled from "styled-components";

export default styled.div`
    background: none;
    min-width: 100vw;
    min-height: 100vh;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: "Rubik", Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
    color: #333;
    z-index: 10;

    & > p {
        position: relative;
        bottom: 3rem;
    }
`;
