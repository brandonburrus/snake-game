import React, { useState, useEffect, useCallback } from "react";
import SnakeGameController from "./game/SnakeGameController";
import Nav from "./components/Nav";
import SnakeGameState, { Rect } from "./game/State";
import { fromEvent, merge } from "rxjs";
import { take } from "rxjs/operators";

import ButtonStyling from "./components/ButtonStyling";
import GameContainer from "./components/GameContainer";
import GameOverContainer from "./components/GameOverContainer";
import StartGameMessage from "./components/StartGameMessage";
import TickRateSlider from "./components/TickRateSlider";
import { FromEventTarget } from "rxjs/internal/observable/fromEvent";

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

    const gameScoreDidChange = useCallback(
        (score: number) => {
            setScore(score);
        },
        [setScore]
    );

    const [showStartMessage, setShowStartMessage] = useState(true);

    useEffect(() => {
        const keyboardInputStream = merge(
            fromEvent(document, "keydown"),
            fromEvent(document.getElementById("snake-game") as FromEventTarget<MouseEvent>, "mousedown")
        )
            .pipe(take(1))
            .subscribe(() => {
                setShowStartMessage(false);
            });
        return () => keyboardInputStream.unsubscribe();
    }, [setShowStartMessage]);

    const [tickRate, setTickRate] = useState(550);

    return (
        <div>
            <Nav />
            {showStartMessage && (
                <StartGameMessage>
                    <p>
                        {window.screen.width > 450
                            ? "Use the Arrow Keys, or WASD to Start the Game."
                            : "Tap on the game board in the direction you want to move"}
                    </p>
                </StartGameMessage>
            )}
            <GameContainer>
                {!gameOver ? (
                    <>
                        <SnakeGameController
                            {...gameSize()}
                            scale={gameScale}
                            gameDidEnd={gameDidEnd}
                            renderTickRate={tickRate}
                            gameScoreDidChange={gameScoreDidChange}
                        />
                        <p id="current-score">Score: {score}</p>
                        <TickRateSlider
                            initialTickRate={tickRate}
                            didChange={value => {
                                setTickRate(value);
                            }}
                        />
                    </>
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
