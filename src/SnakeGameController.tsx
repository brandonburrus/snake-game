import React, { Component } from "react";
import { Observable, Subscription, fromEvent } from "rxjs";
import SnakeGameState, { PlayerDirection } from "./SnakeGameState";

export interface SnakeGameProps {
    width?: number;
    height?: number;
}

export default class SnakeGameController extends Component<SnakeGameProps> {
    private keyboardEvents: Observable<KeyboardEvent> = fromEvent<KeyboardEvent>(document, "keydown");
    private keyboardEventStream?: Subscription;
    private playerDirection: PlayerDirection = PlayerDirection.UNKNOWN;

    static defaultProps = {
        width: 10,
        height: 10,
    };

    static state: SnakeGameState = {
        apple: {
            position: {
                x: 0,
                y: 0,
            },
        },
        snake: [],
        gameBoard: {
            width: SnakeGameController.defaultProps.width,
            height: SnakeGameController.defaultProps.height,
        },
    };

    public constructor(props: SnakeGameProps) {
        super(props);
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
        });
    }

    public componentWillUnmount() {
        this.keyboardEventStream && this.keyboardEventStream.unsubscribe();
    }

    public render() {
        return (
            <main>
                <h1>Hello, World!</h1>
            </main>
        );
    }
}
