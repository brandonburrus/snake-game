import { PlayerDirection } from "../State";

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
}

export type Action = MoveAction | GrowAction | EatAction | NewGameAction;
