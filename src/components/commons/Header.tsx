import { BiBell, BiMenu } from "react-icons/bi";
import { BsBell } from "react-icons/bs";
import { IoSearch } from "react-icons/io5";

export default function Header({ onMenuClick }: { onMenuClick: () => void }) {
  let userName = "Emmanuel Otudor";
  const initials = userName
    .split(" ")
    .map((word) => word.charAt(0))
    .join("");
  return (
    <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">
      <div className="flex items-center gap-4 flex-1">
        {/* Hamburger */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 text-slate-600 hover:bg-slate-50 rounded-lg">
          <BiMenu className="w-8 h-8" />
        </button>

        {/* Search Bar */}
        <div className="max-w-md w-full relative hidden sm:block">
          <IoSearch
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={16}
          />
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-hgreen-500/20 focus:border-hgreen-500"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 bg-white border border-slate-200 rounded px-1.5 py-0.5 text-[10px] text-slate-400">
            ⌘K
          </kbd>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="p-2 text-[#475569] hover:bg-hgrey-300 cursor-pointer  rounded-full relative">
          <BiBell className="w-6 h-6" />
          <span className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full border-2 border-white "></span>
        </button>
        <div className="flex items-center gap-2 pl-2 border-l border-hgrey-300">
          <div className="w-10 h-10 bg-hgreen-500 rounded-full flex items-center justify-center text-white text-base font-bold">
            {initials}
          </div>
          <span className="text-sm font-semibold text-hdark-500 hidden md:block">
            Emmanuel Otudor
          </span>
        </div>
      </div>
    </header>
  );
}
