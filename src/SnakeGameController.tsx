import React, { Component } from "react";
import { Observable, Subscription, fromEvent } from "rxjs";
import SnakeGameState, { PlayerDirection, SnakePoint } from "./SnakeGameState";
import gameReducer from "./reducers/SnakeGameReducer";
import { Action } from "./reducers/SnakeGameActions";

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
        apple: {
            position: {
                x: 0,
                y: 0,
            },
        },
        snake: [{ x: 0, y: 0 }],
        gameBoard: {
            width: SnakeGameController.defaultProps.width,
            height: SnakeGameController.defaultProps.height,
        },
    };

    public constructor(props: SnakeGameProps) {
        super(props);
    }

    public dispatch(gameAction: Action) {
        this.setState(gameReducer(this.state, gameAction));
    }

    public componentDidMount() {
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
                <h1>Hello, World!</h1>
                {this.state.snake.map((segment: SnakePoint, index: number) => {
                    return (
                        <li key={index}>
                            (x: {segment.x}, y: {segment.y})
                        </li>
                    );
                })}
            </main>
        );
    }
}
