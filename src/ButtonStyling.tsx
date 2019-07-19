import styled from "styled-components";

export default styled.div`
    background-color: #20b2aa;
    box-shadow: 3px 3px 0px #0f524f;
    padding: 1rem 3rem;

    :hover {
        box-shadow: 5px 5px 0px #0f524f;
    }

    & > * {
        font-family: "Rubik", Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
        text-decoration: none;
        font-size: 1.2rem;
        color: white;
        background: none;
        outline: 0;
        border: 0;
    }
`;
