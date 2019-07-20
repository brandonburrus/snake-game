import { PlayerDirection, Rect } from "../game/State";

export interface MoveAction {
    type: "MOVE";
    payload: PlayerDirection;
}

export interface GrowAction {
    type: "GROW";
}

export interface EatAction {
    type: "EAT";
}

export interface NewGameAction {
    type: "NEW_GAME";
    payload: {
        gameBoardSize: Rect;
        scale: number;
    };
}

export type Action = MoveAction | GrowAction | EatAction | NewGameAction;
