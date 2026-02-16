import { type SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  placeholder?: string;
  error?: string | React.ReactNode;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Array<{ label: string; value: string | number }>;
  required?: boolean;
}

export default function Select({
  label,
  placeholder,
  error,
  className = "",
  options,
  disabled,
  required = true,
  ...rest
}: SelectProps) {
  return (
    <div className="flex flex-col w-full gap-1">
      {label && (
        <label className="block text-sm font-medium text-hdark-400 mb-1.5 text-start">
          {label} {required && <span className="text-hdark-400">*</span>}
        </label>
      )}

      <div
        className={`
          px-3 py-2 h-11 bg-hgrey-200 border rounded-lg transition-all 
            placeholder:text-hdark-300 font-normal placeholder:font-normal placeholder:text-sm
            outline-none focus:outline-none focus:ring-2 focus:ring-green-500/20 
            ${error ? "border-red-500" : "border-hgrey-500 focus:border-green-500"}
            ${disabled ? "opacity-50 cursor-not-allowed" : ""}
          ${className}
        `}>
        <select
          disabled={disabled}
          className="w-full outline-none bg-transparent text-sm "
          {...rest}>
          {placeholder && (
            <option defaultValue="" disabled hidden>
              {placeholder}
            </option>
          )}

          {options.map((item) => (
            <option
              key={item.value}
              value={item.value}
              defaultValue={item.value}
              className="">
              {item.label}
            </option>
          ))}
        </select>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
