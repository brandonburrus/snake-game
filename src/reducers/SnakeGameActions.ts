import { PlayerDirection } from "../SnakeGameState";

export interface MoveAction {
    type: "MOVE";
    payload: PlayerDirection;
}

export interface GrowAction {
    type: "GROW";
}

export type Action = MoveAction | GrowAction;
