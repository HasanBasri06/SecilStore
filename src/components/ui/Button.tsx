import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "danger" | "secondary";
  children: ReactNode;
  fullWidth?: boolean;
}

export default function Button({
  variant = "primary",
  fullWidth = false,
  children,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "rounded-md px-4 py-2 font-semibold text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50";
  
  const variantStyles = {
    primary: "bg-blue-600 hover:bg-blue-700",
    danger: "bg-red-600 hover:bg-red-700",
    secondary: "bg-gray-600 hover:bg-gray-700",
  };

  const widthStyle = fullWidth ? "w-full" : "";

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${widthStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
