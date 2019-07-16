import { PlayerDirection } from "../SnakeGameState";

export interface GameAction {
    type: "MOVE";
}

export interface MoveAction extends GameAction {
    payload: PlayerDirection;
}

export type Action = MoveAction;
