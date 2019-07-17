import React, { Component } from "react";
import { Observable, Subscription, fromEvent } from "rxjs";
import SnakeGameState, { PlayerDirection } from "./SnakeGameState";
import gameReducer from "./reducers/SnakeGameReducer";
import { Action } from "./reducers/SnakeGameActions";
import { SnakeGame } from "./SnakeGame";

export interface SnakeGameProps {
    width?: number;
    height?: number;
}

export default class SnakeGameController extends Component<SnakeGameProps, SnakeGameState> {
    private keyboardEvents: Observable<KeyboardEvent> = fromEvent<KeyboardEvent>(document, "keydown");
    private keyboardEventStream?: Subscription;
    private playerDirection: PlayerDirection = PlayerDirection.UNKNOWN;

    private static defaultProps = {
        width: 10,
        height: 10,
    };

    public state: SnakeGameState = {
        score: 0,
        snake: [{ x: 0, y: 0 }],
        apple: {
            position: {
                x: 0,
                y: 0,
            },
        },
        gameBoard: {
            size: {
                width: SnakeGameController.defaultProps.width,
                height: SnakeGameController.defaultProps.height,
            },
            scale: 15,
        },
        gameIsOver: false,
    };

    public constructor(props: SnakeGameProps) {
        super(props);
    }

    public dispatch(gameAction: Action) {
        this.setState(gameReducer(this.state, gameAction));
    }

    public componentDidMount() {
        this.dispatch({
            type: "EAT",
        });
        this.keyboardEventStream = this.keyboardEvents.subscribe((keyboardEvent: KeyboardEvent) => {
            switch (keyboardEvent.key.toLowerCase()) {
                case "arrowup":
                case "w":
                    this.playerDirection = PlayerDirection.UP;
                    break;
                case "arrowright":
                case "d":
                    this.playerDirection = PlayerDirection.RIGHT;
                    break;
                case "arrowdown":
                case "s":
                    this.playerDirection = PlayerDirection.DOWN;
                    break;
                case "arrowleft":
                case "a":
                    this.playerDirection = PlayerDirection.LEFT;
                    break;
                default:
                    console.warn("Unknown player input was fired.");
            }
            // TODO: Remove, only used for manual testing purposes
            this.dispatch({
                type: "MOVE",
                payload: this.playerDirection,
            });
        });
    }

    public componentWillUnmount() {
        this.keyboardEventStream && this.keyboardEventStream.unsubscribe();
    }

    public render() {
        return (
            <main>
                <SnakeGame
                    snake={this.state.snake}
                    apple={this.state.apple}
                    dimensions={this.state.gameBoard.size}
                    scale={this.state.gameBoard.scale}
                />
                <br />
                <button onClick={() => this.dispatch({ type: "GROW" })} style={{ display: "block" }}>
                    GROW
                </button>
                <p>{this.state.score}</p>
                {this.state.gameIsOver && <p>GAME OVER!</p>}
            </main>
        );
    }
}
