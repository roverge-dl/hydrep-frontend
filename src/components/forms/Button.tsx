import { type ReactNode, type ButtonHTMLAttributes } from "react";
import Loader from "../ui/Loader";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  loading?: boolean;
  variant?: "primary" | "outline" | "ghost";
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
  width?: string;
  disabled?: boolean;
}

export default function Button({
  children,
  loading = false,
  variant = "primary",
  leftIcon,
  rightIcon,
  className = "",
  width = "w-fit",
  disabled,
  ...props
}: ButtonProps) {
  // Styles based on your register screen snippet
  const baseStyles = `${width} px-3 font-medium py-3 rounded-lg transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer`;

  const variants = {
    primary: "bg-hgreen-500 hover:bg-[#2d9147] text-white",
    outline:
      "border border-hgrey-500 bg-transparent text-hdark-400 hover:bg-hgrey-100",
    ghost: "bg-transparent text-hdark-400 hover:bg-hgrey-100 shadow-none",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={disabled || loading}
      {...props}>
      {loading ? (
        <Loader />
      ) : (
        <>
          {leftIcon && <span className="flex items-center">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="flex items-center">{rightIcon}</span>}
        </>
      )}
    </button>
  );
}
