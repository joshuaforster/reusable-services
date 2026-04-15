import { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { navigation } from "./navigation";
import TodaysDate from "./todaysDate";
import Footer from "./footer";

export default function AppShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            onClick={() => setSidebarOpen(false)}
            className="absolute inset-0 bg-black/60"
          />

          <div className="relative z-50 w-64 h-full bg-gray-900 p-6 flex flex-col">
            <button
              onClick={() => setSidebarOpen(false)}
              className="mb-6 text-right"
            >
              ✕
            </button>

            <SidebarContent />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:fixed lg:inset-y-0 lg:w-72 lg:flex-col bg-gray-900 border-r border-white/10 p-6">
        <SidebarContent />
      </div>

      {/* Main */}
      <div className="lg:pl-72 flex flex-col flex-1">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 px-4 border-b border-white/10 bg-gray-900">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-xl"
          >
            ☰
          </button>

          <div className="flex-1 relative">
            <input
              placeholder="Search"
              className="w-full bg-gray-800 border border-gray-700 pl-8 pr-3 py-2 text-sm outline-none"
            />
            <span className="absolute left-2 top-2 text-gray-400">🔍</span>
          </div>

          <div className="flex items-center gap-4">
            <span>🔔</span>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-700 flex items-center justify-center text-sm">
                J
              </div>
              <span className="hidden lg:block text-sm">Josh</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8 bg-gray-950">
          <p className="text-sm text-gray-500 mb-4">
            Today is: <TodaysDate />
          </p>
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
}

function SidebarContent() {
  return (
    <div className="flex flex-col flex-1">
      <div className="mb-8">
        <h1 className="text-lg font-semibold">HoundData</h1>
      </div>

      <nav className="flex flex-col gap-1">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
              `px-3 py-2 text-sm ${
                isActive
                  ? "bg-white/10 text-white"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
