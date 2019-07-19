import React, { useState, useEffect, useCallback } from "react";
import SnakeGameController from "./SnakeGameController";
import Nav from "./Nav";
import styled from "styled-components";
import { Rect } from "./State";
import { fromEvent } from "rxjs";

const GameContainer = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 60px);
`;

export default function GamePage() {
    const [windowWidth, setWindowWidth] = useState(window.screen.width);
    const [windowHeight, setWindowHeight] = useState(window.screen.height);
    const [gameScale, setGameScale] = useState(20);

    const gameSize: () => Rect = useCallback(() => {
        const calculatedWidth = Math.min(500, windowWidth - 40) - (windowWidth % gameScale);
        const calculatedHeight = Math.min(500, windowHeight - 180) - (windowHeight % gameScale);
        return {
            width: calculatedWidth,
            height: calculatedHeight,
        };
    }, [windowWidth, windowHeight, gameScale]);

    useEffect(() => {
        const resizeEventStream = fromEvent(window, "resize").subscribe(value => {
            setWindowWidth(window.screen.width);
            setWindowHeight(window.screen.height);
        });
        return () => resizeEventStream.unsubscribe();
    });

    return (
        <div>
            <Nav />
            <GameContainer>
                <SnakeGameController {...gameSize()} scale={gameScale} />
            </GameContainer>
        </div>
    );
}
