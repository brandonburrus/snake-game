import React, { useState, useEffect, useReducer, useMemo } from "react";
import { interval, fromEvent, merge } from "rxjs";
import { throttle, filter, share } from "rxjs/operators";
import snakeReducer from "./reducers/snake";
import GameGrid from "./components/GameGrid";

const initialSnake = [{ x: 0, y: 0 }];
// eslint-disable-next-line react-hooks/exhaustive-deps
const apple = {
    x: 0,
    y: 0,
    scramble(maxX = 3, maxY = 3) {
        this.x = Math.floor(Math.random() * maxX) * (Math.random() > 0.5 ? -1 : 1);
        this.y = Math.floor(Math.random() * maxY) * (Math.random() > 0.5 ? -1 : 1);
    },
};

apple.scramble();

// GameController gets input from the user, renders the game grid, and handles the render loop
export default function GameController({ gameSpeed = 100, gameWidth = 11, gameHeight = 11 }) {
    const [playerDirection, setPlayerDirection] = useState("RIGHT");
    const [paused, setPaused] = useState(true);
    const [snake, dispatch] = useReducer(snakeReducer, initialSnake);

    const renderSteps = useMemo(() => {
        const observable = interval(1000).pipe(share());
        observable.subscribe();
        return observable;
    }, []);

    console.log("Render");
    // Render loop side effect
    useEffect(() => {
        // Start a stream of render steps
        const renderLoop = renderSteps.pipe(filter(() => !paused)).subscribe(() => {
            dispatch({
                type: "MOVE",
                payload: {
                    direction: playerDirection,
                    apple,
                },
            });
        });
        return () => renderLoop.unsubscribe();
    }, [dispatch, playerDirection, paused, renderSteps]);

    // Player input handler side effect
    useEffect(() => {
        const keyboardEvents = merge(fromEvent(window.document, "keydown"), fromEvent(window.document, "keyup"))
            .pipe(throttle(() => renderSteps))
            .subscribe(event => {
                switch (event.key.toLowerCase()) {
                    case "a":
                        setPlayerDirection("LEFT");
                        break;
                    case "w":
                        setPlayerDirection("UP");
                        break;
                    case "d":
                        setPlayerDirection("RIGHT");
                        break;
                    case "s":
                        setPlayerDirection("DOWN");
                        break;
                    default:
                        return;
                }
            });
        return () => keyboardEvents.unsubscribe();
    }, [setPlayerDirection, renderSteps]);

    return (
        <main>
            {snake ? (
                <>
                    <GameGrid width={gameWidth} height={gameHeight} snake={snake} apple={apple} />
                    <button
                        onClick={() =>
                            dispatch({
                                type: "GROW",
                            })
                        }>
                        GROW
                    </button>
                    <button onClick={() => setPaused(!paused)}>PAUSE</button>
                </>
            ) : (
                <h1>Game Over</h1>
            )}
        </main>
    );
}
