import {
  // BiBell,
  BiBriefcase,
  BiLogOut,
} from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import HydrepLogo from "../../assets/svgs/hydrep-logo.svg";
import { LuLayoutDashboard } from "react-icons/lu";
import { FiFileText } from "react-icons/fi";
import { LuGraduationCap } from "react-icons/lu";
import { useAuth } from "../../context/AuthContext";
// import { useAuth } from "../../context/AuthContext";

const navItems = [
  { name: "Dashboard", path: "/dashboard", icon: LuLayoutDashboard },
  { name: "My Applications", path: "/applications", icon: FiFileText },
  { name: "My Programmes", path: "/programmes", icon: BiBriefcase },
  { name: "Examinations", path: "/exams", icon: LuGraduationCap },
  // { name: "Notifications", path: "/notifications", icon: BiBell },
];

export default function Sidebar({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}) {
  // const { logout } = useAuth();
  const location = useLocation();
  const { user } = useAuth();
  const { logout } = useAuth();
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`
        fixed top-0 left-0 z-50 h-full lg:w-64 tabletsm:w-72 sm:w-80 w-full bg-white border-r border-slate-100 transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:block
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="flex flex-col h-full p-4">
          {/* Logo & Close Button (Mobile) */}
          <div className="flex items-center justify-between mb-8 px-2">
            <div className="flex items-center gap-2">
              <img src={HydrepLogo} className="w-fit h-fit" alt="" />
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden p-2 text-slate-500">
              <IoClose className="w-8 h-8" />
            </button>
          </div>

          {/* User Profile Mini-Card */}
          <div className="bg-hgrey-200 rounded-xl p-3 mb-6 flex items-center gap-3">
            <div className="w-10 h-10 bg-hgreen-500 rounded-full flex items-center justify-center text-white font-semibold">
              {user?.user?.first_name?.split("")[0]}
              {user?.user?.last_name?.split("")[0]}
            </div>
            <div>
              <p className="text-sm font-bold text-hdark-500">
                {user?.user?.first_name} {user?.user?.last_name}
              </p>
              <p className="text-[10px] text-slate-500">Beneficiary</p>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="flex-1 space-y-1">
            {navItems.map((item) => {
              const isActive =
                item.path === "/"
                  ? location.pathname === "/"
                  : location.pathname.startsWith(item.path);
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors hover:text-white hover:bg-hgreen-500 ${
                    isActive
                      ? "bg-hgreen-500 text-white shadow-md shadow-green-100"
                      : "text-slate-500  hover:text-slate-900"
                  }`}>
                  <item.icon size={18} />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Sign Out */}
          <button
            onClick={logout}
            type="button"
            className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-slate-500 hover:text-red-600 transition-colors cursor-pointer">
            <BiLogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}
