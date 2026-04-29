import { Button } from "./Button";

type Props = {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  highlight?: boolean;
  disable?: boolean;
};

const ActionButton: React.FC<Props> = ({
  icon,
  label,
  onClick,
  highlight,
  disable = false,
}) => {
  return (
    <Button
      variant="custom"
      onClick={onClick}
      disabled={disable}
      className={`group flex bg-victor-black items-center gap-3 px-5 py-3 p-4 rounded-xl backdrop-blur-md border transition-all duration-300
        ${
          disable
            ? "bg-gray-500 text-black"
            : highlight
              ? "bg-gold text-victor-black border-gold hover:scale-105"
              : "bg-victor-red border-white/10 text-smoke-white hover:bg-victor-black2"
        }
      `}
    >
      <span className="group-hover:scale-110 transition-transform">{icon}</span>
      <span className="font-medium">{label}</span>
    </Button>
  );
};

export default ActionButton;
