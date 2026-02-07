import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../commons/Sidebar";
import Header from "../commons/Header";

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen  overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto p-4 lg:p-4  bg-hwhite-300">
          <div className="max-w-7xl mx-auto relative">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
