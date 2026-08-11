import { useState, type HTMLInputTypeAttribute, type ReactNode } from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegEyeSlash } from "react-icons/fa6";

interface InputProps {
  label: string;
  labelClass?: string;
  className?: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  leftIcon?: ReactNode;
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string | string[];
  name?: string;
  disabled?: boolean;
  required?: boolean;
}

export default function Input({
  label,
  labelClass = "text-center",
  className = "pl-10 ",
  type = "text ",
  placeholder,
  leftIcon,
  value,
  defaultValue,
  onChange,
  error,
  name,
  disabled = false,
  required = true,
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  // Determine actual input type based on password toggle state
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="w-full">
      {/* Exact label style from your snippet */}
      <label
        className={`block text-sm font-medium text-hdark-400 mb-1.5 text-center ${labelClass}`}>
        {label}
        {required && <span className="text-hdark-400">*</span>}
      </label>

      <div className="relative">
        {/* Left Icon: Positioned absolutely as per your snippet */}
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 flex items-center justify-center">
            {leftIcon}
          </div>
        )}

        <input
          name={name}
          type={inputType}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={` ${className}
            w-full pr-10 py-2 bg-hgrey-200 border rounded-lg transition-all 
            placeholder:text-hdark-300 font-normal placeholder:font-normal placeholder:text-sm
            outline-none focus:outline-none focus:ring-2 focus:ring-hgreen-500/20
            ${error ? "border-red-500" : "border-hgrey-500 focus:border-hgreen-500"}
            ${disabled ? "opacity-50 cursor-not-allowed" : ""}
          `}
        />

        {/* Password Toggle: Positioned on the right */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
            {showPassword ? (
              <FaRegEyeSlash size={20} />
            ) : (
              <MdOutlineRemoveRedEye size={20} />
            )}
          </button>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-xs text-red-500 mt-1 text-center">{error}</p>
      )}
    </div>
  );
}
