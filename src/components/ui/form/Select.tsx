import React, { useState } from "react";

interface Option {
  value: string;
  label: string;
}
interface SelectProps {
  options: Option[];
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const Select: React.FC<SelectProps> = ({
  options,
  placeholder = "Select an option",
  value,
  onChange,
  className = "",
}) => {
  return (
    <select
      className={`h-11 w-full appearance-none rounded-lg px-4 py-2.5 pr-11 text-sm
        focus:outline-hidden focus:ring-3
        ${value ? "text-gray-800 dark:text-white/90" : "text-gray-400"}
        ${className}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="" disabled>
        {placeholder}
      </option>

      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};


export default Select;

