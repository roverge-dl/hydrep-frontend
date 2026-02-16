import { useState, useRef, useEffect } from "react";
import { BiChevronDown, BiSearch } from "react-icons/bi";

interface SelectProps {
  label?: string;
  placeholder?: string;
  error?: string | React.ReactNode;
  className?: string;
  value?: string;
  name: string;
  onChange: (e: any) => void; // Keeps it compatible with your handleInputChange
  options: Array<{ label: string; value: string }>;
  disabled?: boolean;
  required?: boolean;
}

export default function SearchableSelect({
  label,
  placeholder = "Select an option",
  error,
  className = "",
  options,
  disabled,
  required = true,
  value,
  name,
  onChange,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const selectedOption = options.find(
    (opt) => String(opt.value) === String(value),
  );
  const displayValue = selectedOption ? selectedOption.label : "";

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const selectedLabel = options.find((opt) => opt.value === value)?.label;

  const handleSelect = (option: { label: string; value: string }) => {
    onChange({
      target: { name, value: option.value },
    });
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <div className="flex flex-col w-full gap-1 relative" ref={containerRef}>
      {label && (
        <label className="block text-sm font-medium text-hdark-400 mb-1.5 text-start">
          {label} {required && <span className="text-hdark-400">*</span>}
        </label>
      )}

      {/* Trigger Button */}
      <div
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`
          px-3 py-2 h-11 bg-hgrey-200 border rounded-lg transition-all flex items-center justify-between
          cursor-pointer text-sm
          ${error ? "border-red-500" : "border-hgrey-500 focus-within:border-green-500"}
          ${disabled ? "opacity-50 cursor-not-allowed" : "hover:border-hgrey-400"}
          ${className}
        `}>
        <span className={selectedLabel ? "text-hdark-500" : "text-hdark-300"}>
          {selectedLabel || placeholder}
        </span>
        <BiChevronDown
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
          size={20}
        />
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-[105%] left-0 w-full bg-white border border-hgrey-300 rounded-lg shadow-lg z-[100] max-h-60 flex flex-col overflow-hidden">
          {/* Search Input */}
          <div className="p-2 border-b border-hgrey-200 sticky top-0 bg-white">
            <div className="relative">
              <BiSearch
                className="absolute left-2 top-2.5 text-gray-400"
                size={16}
              />
              <input
                autoFocus
                type="text"
                className="w-full pl-8 pr-3 py-2 text-sm bg-hgrey-200 rounded-md outline-none focus:ring-1 focus:ring-green-500"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Options List */}
          <div className="overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((item: { label: string; value: string }) => (
                <div
                  key={item.value}
                  onClick={() => handleSelect(item)}
                  className={`px-4 py-2.5 text-sm cursor-pointer hover:bg-green-50 transition-colors
                    ${value === item.value ? "bg-green-50 text-green-600 font-semibold" : "text-hdark-500"}
                  `}>
                  {item.label}
                </div>
              ))
            ) : (
              <div className="px-4 py-3 text-sm text-gray-400 italic">
                No results found
              </div>
            )}
          </div>
        </div>
      )}

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
