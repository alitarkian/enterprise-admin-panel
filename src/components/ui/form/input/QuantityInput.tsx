"use client";

import React, { useState } from "react";
import { Button } from "../../button/Button";
import { Icon } from "../../icons/icon";

interface QuantityInputProps {
  min?: number;
  max?: number;
  initial?: number;
  onChange?: (value: number) => void;
  className?: string;
}

export default function QuantityInput({
  min = 1,
  max = 100,
  initial = 1,
  onChange,
  className,
}: QuantityInputProps) {
  const [value, setValue] = useState(initial);

  const decrement = () => {
    setValue((prev) => {
      const newValue = Math.max(min, prev - 1);
      onChange?.(newValue);
      return newValue;
    });
  };

  const increment = () => {
    setValue((prev) => {
      const newValue = Math.min(max, prev + 1);
      onChange?.(newValue);
      return newValue;
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = parseInt(e.target.value, 10);
    if (isNaN(val)) val = min;
    val = Math.max(min, Math.min(max, val));
    setValue(val);
    onChange?.(val);
  };

  return (
    <div className="relative w-20">
      <input
        type="text"
        value={value}
        min={min}
        max={max}
        onChange={handleInputChange}
        className={`w-full border rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-primary appearance-none ${className}`}
      />
      <div className="absolute inset-y-0 left-0 flex items-center">
        <Button
          variant={"link"}
          onClick={decrement}
          className="w-8 h-8 flex items-center justify-center transition"
        >
          -
        </Button>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center">
        <Button
          variant={"link"}
          onClick={increment}
          className="w-8 h-8 flex items-center justify-center transition "
        >
          +
        </Button>
      </div>
    </div>
  );
}
