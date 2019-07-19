import React, { useState, ReactNode } from "react";

export type SliderProps = {
    children?: ReactNode;
    initialValue: number;
    min: number;
    max: number;
    didChange?: (newValue: number) => void;
};

export default function Slider({ initialValue, min, max, didChange }: SliderProps) {
    const [value, setValue] = useState(initialValue);
    return (
        <input
            type="range"
            min={min}
            max={max}
            value={value}
            step={1}
            onChange={event => {
                const newValue = event.target.value;
                setValue(parseFloat(newValue) || initialValue);
                didChange && didChange(value);
            }}
        />
    );
}
