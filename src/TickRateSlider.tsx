import React, { ReactNode } from "react";
import styled from "styled-components";
import Slider from "./Slider";

const Styling = styled.div`
    display: flex;
    align-items: center;
    padding: 0.5rem;
    background-color: #f0f0f0;
    border-radius: 50px;
    & i {
        padding: 0.35rem;
        color: #20b2aa;
        font-size: 1.25rem;
    }
`;

export type TickRateSliderProps = {
    children?: ReactNode;
    initialTickRate: number;
    didChange: (value: number) => void;
};

export default function(props: TickRateSliderProps) {
    return (
        <Styling>
            <i className="fas fa-turtle" />
            <Slider initialValue={props.initialTickRate} min={100} max={1000} didChange={props.didChange} />
            <i className="fas fa-rabbit-fast" />
        </Styling>
    );
}
