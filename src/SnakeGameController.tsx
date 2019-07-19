import React, { Component } from "react";
import { Observable, Subscription, fromEvent, interval } from "rxjs";
import { filter } from "rxjs/operators";
import SnakeGameState, { PlayerDirection } from "./State";
import gameReducer from "./reducers/SnakeReducer";
import { Action } from "./reducers/Action";
import { SnakeGame } from "./SnakeGame";

export interface SnakeGameProps {
    width?: number;
    height?: number;
    scale?: number;
    renderTickRate?: number;
    gameDidEnd?: (state: SnakeGameState) => void;
}

export default class SnakeGameController extends Component<SnakeGameProps, SnakeGameState> {
    private keyboardEvents: Observable<KeyboardEvent> = fromEvent<KeyboardEvent>(document, "keydown");
    private renderSteps: Observable<number> = interval(
        this.props.renderTickRate || SnakeGameController.defaultProps.renderTickRate
    );
    private keyboardEventStream?: Subscription;
    private renderStepStream?: Subscription;
    private playerDirection: PlayerDirection = PlayerDirection.UNKNOWN;

    private static defaultProps = {
        width: 10,
        height: 10,
        scale: 15,
        renderTickRate: 500,
    };

    public state: SnakeGameState = {
        score: 0,
        highScore: 0,
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
        this.newGame();
        this.keyboardEventStream = this.keyboardEvents.subscribe((keyboardEvent: KeyboardEvent) => {
            switch (keyboardEvent.key.toLowerCase()) {
                case "arrowup":
                case "w":
                    if (this.playerDirection !== PlayerDirection.DOWN) {
                        this.playerDirection = PlayerDirection.UP;
                    }
                    break;
                case "arrowright":
                case "d":
                    if (this.playerDirection !== PlayerDirection.LEFT) {
                        this.playerDirection = PlayerDirection.RIGHT;
                    }
                    break;
                case "arrowdown":
                case "s":
                    if (this.playerDirection !== PlayerDirection.UP) {
                        this.playerDirection = PlayerDirection.DOWN;
                    }
                    break;
                case "arrowleft":
                case "a":
                    if (this.playerDirection !== PlayerDirection.RIGHT) {
                        this.playerDirection = PlayerDirection.LEFT;
                    }
                    break;
                default:
                    console.warn("Unknown player input was fired.");
            }
        });
        this.renderStepStream = this.renderSteps
            .pipe(filter(() => this.playerDirection !== PlayerDirection.UNKNOWN && !this.state.gameIsOver))
            .subscribe(() => {
                this.dispatch({
                    type: "MOVE",
                    payload: this.playerDirection,
                });
            });
    }

    public componentDidUpdate() {
        if (this.state.gameIsOver) {
            this.props.gameDidEnd && this.props.gameDidEnd(this.state);
        }
    }

    public componentWillUnmount() {
        this.keyboardEventStream && this.keyboardEventStream.unsubscribe();
        this.renderStepStream && this.renderStepStream.unsubscribe();
    }

    private newGame() {
        this.dispatch({
            type: "NEW_GAME",
            payload: {
                gameBoardSize: {
                    width: this.props.width || SnakeGameController.defaultProps.width,
                    height: this.props.height || SnakeGameController.defaultProps.height,
                },
                scale: this.props.scale || SnakeGameController.defaultProps.scale,
            },
        });
        this.playerDirection = PlayerDirection.UNKNOWN;
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
            </main>
        );
    }
}
