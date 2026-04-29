import React from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

interface FloatingProps {
  label: string;
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string,
  ) => void;
  type?: string; // "text" | "email" | "tel"
  className?: string;
  defaultCountry?: string; // فقط برای تلفن
}

export const FloatingInput = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  className = "",
  defaultCountry = "de",
}: FloatingProps) => {
  // === حالت تلفن بین المللی ===
  if (type === "tel") {
    return (
      <div className="relative w-full group">
        <label
          className={`absolute start-15 text-white/60 transition-all
            ${value ? "start-0! -top-3 text-xs text-victor-red" : "top-2 text-sm text-white/60"}`}
        >
          {label}
        </label>
        <PhoneInput
          defaultCountry={defaultCountry}
          value={value}
          onChange={(phone) => onChange(phone)}
          inputClassName={`peer w-full bg-transparent! border-0! border-b! border-white/30 text-white py-3 outline-none focus:border-gold transition ${className}`}
          countrySelectorStyleProps={{
            buttonClassName:
              "bg-transparent! border-0! border-b! border-white/20 h-14 rounded-l-lg px-2",
            containerClassName: "h-14",
          }}
        />
      </div>
    );
  }

  // === حالت معمولی (text, email) ===
  return (
    <div className="relative group w-full">
      <input
        type={type}
        name={name}
        value={value}
        onChange={(e) => onChange(e)}
        required
        className={`peer w-full bg-transparent border-0 border-b border-white/30 text-white py-3 outline-none focus:border-victor-red transition ${className}`}
        pattern={
          type === "email" ? "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$" : undefined
        } // فقط ایمیل درست
      />
      <label
        className={`absolute start-0 text-white/60 transition-all
          ${
            value
              ? "-top-3 text-xs text-victor-red"
              : "top-3 text-sm peer-focus:-top-3 peer-focus:text-xs peer-focus:text-victor-red"
          }`}
      >
        {label}
      </label>
    </div>
  );
};

export const FloatingTextarea = ({
  label,
  name,
  value,
  onChange,
  className = "",
}: FloatingProps) => {
  return (
    <div className="relative w-full h-full">
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        required
        className={`peer w-full h-full resize-none bg-transparent border-0 border-b border-white/30 text-white py-3 outline-none focus:border-victor-red transition ${className}`}
      />
      <label
        className={`absolute start-0 text-white/60 transition-all
        ${
          value
            ? "-top-3 text-xs text-victor-red"
            : "top-3 text-sm peer-focus:-top-3 peer-focus:text-xs peer-focus:text-victor-red"
        }`}
      >
        {label}
      </label>
    </div>
  );
};
