type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

export function PrimaryButton({ children, onClick, disabled }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 text-sm font-medium ${
        disabled
          ? "bg-gray-700 text-gray-400 cursor-not-allowed"
          : "bg-white text-black hover:bg-gray-200"
      }`}
    >
      {children}
    </button>
  );
}

export function SecondaryButton({ children, onClick, disabled }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 text-sm border ${
        disabled
          ? "border-gray-700 text-gray-500 cursor-not-allowed"
          : "border-gray-600 text-white hover:border-gray-400"
      }`}
    >
      {children}
    </button>
  );
}

export function TertiaryButton({ children, onClick, disabled }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 text-sm ${
        disabled
          ? "text-gray-600 cursor-not-allowed"
          : "text-gray-400 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}