import { PlayerDirection } from "../SnakeGameState";

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

export type Action = MoveAction | GrowAction | EatAction;
