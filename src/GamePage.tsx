import React, { useState, useEffect, useCallback } from "react";
import SnakeGameController from "./SnakeGameController";
import Nav from "./Nav";
import styled from "styled-components";
import SnakeGameState, { Rect } from "./State";
import { fromEvent } from "rxjs";
import ButtonStyling from "./ButtonStyling";
import { take } from "rxjs/operators";

const GameContainer = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 60px);
`;

interface GameOverProps {
    size: Rect;
    scale: number;
}

const GameOverContainer = styled.div`
    background-color: #f0f0f0;
    min-width: ${(props: GameOverProps) => props.size.width + props.scale}px;
    min-height: ${(props: GameOverProps) => props.size.height + props.scale}px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: "Rubik", Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;

    & h2 {
        font-size: 3rem;
        margin: 0.5rem;
    }

    & h3 {
        font-size: 1rem;
        margin: 0.5rem;
    }

    & div#space-wrapper {
        margin: 3.5rem 0;
    }
`;

const StartGameMessage = styled.div`
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
        const resizeEventStream = fromEvent(window, "resize").subscribe(() => {
            setWindowWidth(window.screen.width);
            setWindowHeight(window.screen.height);
        });
        return () => resizeEventStream.unsubscribe();
    });

    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);

    const gameDidEnd = useCallback(
        (state: SnakeGameState) => {
            setGameOver(true);
            setScore(state.score);
            setHighScore(Math.max(state.score, highScore));
        },
        [setGameOver, setScore, setHighScore, highScore]
    );

    const [showStartMessage, setShowStartMessage] = useState(true);

    useEffect(() => {
        const keyboardInputStream = fromEvent(document, "keydown")
            .pipe(take(1))
            .subscribe(() => {
                setShowStartMessage(false);
            });
        return () => keyboardInputStream.unsubscribe();
    }, [setShowStartMessage]);

    return (
        <div>
            <Nav />
            {showStartMessage && (
                <StartGameMessage>
                    <p>Use the Arrow Keys, or WASD to Start the Game.</p>
                </StartGameMessage>
            )}
            <GameContainer>
                {!gameOver ? (
                    <SnakeGameController {...gameSize()} scale={gameScale} gameDidEnd={gameDidEnd} />
                ) : (
                    <GameOverContainer size={gameSize()} scale={gameScale}>
                        <h2>Game Over!</h2>
                        <h3>
                            Score: {score} | High Score: {highScore}
                        </h3>
                        <div id="space-wrapper" />
                        <ButtonStyling>
                            <button onClick={() => setGameOver(false)}>Play Again</button>
                        </ButtonStyling>
                    </GameOverContainer>
                )}
            </GameContainer>
        </div>
    );
}
