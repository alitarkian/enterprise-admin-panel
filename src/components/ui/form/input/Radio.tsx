import React from "react";

interface RadioProps {
  id: string;
  name: string;
  value: string;
  checked: boolean;
  label?: string;
  onChange: (value: string) => void;
  className?: string;
  disabled?: boolean;

  icon?: React.ReactNode; // آیکون اختیاری
  colorChecked?: string; // رنگ زمانی که checked هست
}

const Radio: React.FC<RadioProps> = ({
  id,
  name,
  value,
  checked,
  label,
  onChange,
  className = "",
  disabled = false,
  icon,
  colorChecked = "bg-brand-500",
}) => {
  return (
    <label
      htmlFor={id}
      className={`flex items-center justify-between gap-3 p-2 rounded-md transition-all duration-200
        ${checked ? `${colorChecked} text-white` : "text-gray-700 dark:text-gray-300"}
        ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"}
        ${className}`}
    >
      <div className="flex items-center gap-2">
        {icon && <div className="w-5 h-5 flex-shrink-0">{icon}</div>}
        {label && <span className="text-sm font-medium">{label}</span>}
      </div>

      <div className="relative w-5 h-5 flex items-center justify-center">
        <input
          id={id}
          name={name}
          type="radio"
          value={value}
          checked={checked}
          onChange={() => !disabled && onChange(value)}
          disabled={disabled}
          className="sr-only"
        />

        <span
          className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors
            ${checked ? "border-white bg-white/20" : "border-gray-300 dark:border-gray-700"}
          `}
        >
          {checked && (
            <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
          )}
        </span>
      </div>
    </label>
  );
};

export default Radio;
