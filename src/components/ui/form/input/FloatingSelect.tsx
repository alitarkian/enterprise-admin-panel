"use client";
import { Listbox } from "@headlessui/react";
import { ChevronUpDownIcon, CheckIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";

export function FloatingSelect({
  label,
  value,
  options,
  onChange,
  disabled,
}: {
  label: string;
  value: any;
  options: { label: string; value: string }[];
  onChange: (v: any) => void;
  disabled?: boolean;
}) {
  return (
    <Listbox value={value} onChange={onChange} disabled={disabled}>
      {({ open }) => (
        <div className="relative">
          <Listbox.Button
            className={clsx(
              "w-full h-14 px-4 pt-5 rounded-xl border bg-transparent text-left",
              "transition outline-none",
              value
                ? "border-white/20 text-white"
                : "border-white/10 text-white/40",
              open && "border-gold"
            )}
          >
            <span className="block truncate">
              {value?.label}
            </span>

            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50">
              <ChevronUpDownIcon className="w-5 h-5" />
            </span>

            <label
              className={clsx(
                "absolute left-4 transition-all pointer-events-none",
                value
                  ? "top-2 text-xs text-gold"
                  : "top-1/2 -translate-y-1/2 text-sm text-white/40"
              )}
            >
              {label}
            </label>
          </Listbox.Button>

          <Listbox.Options className="absolute z-50 mt-2 w-full max-h-72 overflow-auto rounded-xl bg-[#020617] border border-white/10 shadow-2xl backdrop-blur-xl">
            {options.map((opt) => (
              <Listbox.Option
                key={opt.value}
                value={opt}
                className={({ active }) =>
                  clsx(
                    "cursor-pointer select-none px-4 py-3 text-sm transition",
                    active
                      ? "bg-gold/10 text-gold"
                      : "text-white/80"
                  )
                }
              >
                {({ selected }) => (
                  <div className="flex items-center justify-between">
                    <span>{opt.label}</span>
                    {selected && (
                      <CheckIcon className="w-4 h-4 text-gold" />
                    )}
                  </div>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      )}
    </Listbox>
  );
}
