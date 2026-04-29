import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import clsx from "clsx";

const PremiumPhoneInput = ({
  value,
  onChange,
  label,
  hint,
}: {
  value?: string;
  onChange: (v: string) => void;
  label: string;
  hint?: string;
}) => {
  return (
    <div className="space-y-1">
      <div className="relative">
        <PhoneInput
          defaultCountry="de"
          value={value}
          onChange={onChange}
          inputClassName="!w-full !h-14 rounded-e-2xl! !bg-black/5 !border !border-white/10 !text-white !pl-[35px] focus:!border-amber-400/40 focus:!ring-1 focus:!ring-amber-400/20 transition"
          countrySelectorStyleProps={{
            buttonClassName:
              "!h-14 !w-[80px] !rounded-l-2xl !bg-black/5 !border-r !border-white/10 hover:!bg-white/10 transition",
            dropdownClassName:
              "!bg-[#05070B] !border !border-white/10 !rounded-2xl !shadow-xl",
            dropdownItemClassName: "!text-white/80 hover:!bg-white/10",
          }}
        />

        <label className="absolute left-[92px] top-2 text-xs text-white/40">
          {label}
        </label>
      </div>

      {hint && (
        <div className="text-xs text-white/40 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400/70" />
          <span>{hint}</span>
        </div>
      )}
    </div>
  );
};

export default PremiumPhoneInput;