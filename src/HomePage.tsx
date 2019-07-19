import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const PageContainer = styled.section`
    background-color: red;
`;

export default function HomePage() {
    return (
        <PageContainer>
            <h1>Snake</h1>
            <Link to="/game">Play Now!</Link>
        </PageContainer>
    );
}
