
import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { Menu, Bell } from "lucide-react";
import DeveloperSidebar from "./DeveloperSidebar";

export default function DeveloperLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  let developer = {};

  try {
    developer = JSON.parse(localStorage.getItem("user") || "{}");
  } catch {
    developer = {};
  }

  const name = developer.name || "Developer";

  const initials = name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-stone-800">
      <DeveloperSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="min-h-screen lg:pl-[260px]">
        <header className="sticky top-0 z-30 flex h-[68px] items-center justify-between border-b border-stone-200 bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open navigation"
              className="rounded-xl border border-stone-200 p-2 text-stone-600 hover:bg-stone-50 lg:hidden"
            >
              <Menu size={20} />
            </button>

            <div>
              <p className="text-sm font-bold text-stone-900">
                Developer Workspace
              </p>
              <p className="hidden text-xs text-stone-500 sm:block">
                Manage your assigned support tickets
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Notifications */}
            <button
              type="button"
              aria-label="Notifications"
              title="Demo notifications"
              className="relative rounded-xl border border-stone-200 p-2.5 text-stone-600 transition hover:bg-stone-50"
            >
              <Bell size={18} />
            </button>

            {/* Developer Profile */}
            <Link
              to="/developer/profile"
              aria-label="Open developer profile"
              title="My Profile"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-100 text-xs font-bold text-orange-800 transition hover:ring-4 hover:ring-orange-100"
            >
              {initials}
            </Link>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
