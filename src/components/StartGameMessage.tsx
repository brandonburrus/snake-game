import styled from "styled-components";

export default styled.div`
    background: none;
    min-width: 100vw;
    min-height: calc(100vh - 60px);
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: "Rubik", Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
    color: #333;

    & > p {
        position: relative;
        bottom: 3rem;
        text-align: center;
        max-width: 450px;
        margin: 30px;
        z-index: 2;
    }
`;
