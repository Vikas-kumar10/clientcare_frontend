import { Bell, Menu, Search, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

export default function Topbar({ onMenuClick }) {
  let clientUser = {};

  try {
    clientUser = JSON.parse(localStorage.getItem("user") || "{}");
  } catch {
    clientUser = {};
  }

  const name = clientUser.name || "Client";
  const initials = name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between gap-3 border-b border-stone-200 bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-xl p-2 text-stone-600 hover:bg-stone-100 lg:hidden"
          aria-label="Open navigation"
        >
          <Menu size={21} />
        </button>

        <div className="hidden h-10 w-64 items-center gap-2 rounded-xl border border-stone-200 bg-stone-50 px-3 md:flex">
          <Search size={17} className="text-stone-400" />
          <input
            type="text"
            placeholder="Search tickets..."
            aria-label="Search tickets"
            className="w-full bg-transparent text-sm outline-none placeholder:text-stone-400"
          />
          <kbd className="rounded border border-stone-200 bg-white px-1.5 py-0.5 text-[10px] text-stone-400">
            /
          </kbd>
        </div>

        <p className="truncate text-sm font-semibold text-stone-700 md:hidden">
          Client Portal
        </p>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <button
          aria-label="Notifications"
          className="relative rounded-xl p-2.5 text-stone-500 transition hover:bg-stone-100"
        >
          <Bell size={19} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-white bg-orange-600" />
        </button>

        <div className="h-8 w-px bg-stone-200" />

        <Link
          to="/client/profile"
          aria-label="Open client profile"
          className="flex items-center gap-2 rounded-xl p-1.5 text-left hover:bg-stone-50"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-100 text-xs font-bold text-orange-800">
            {initials}
          </div>

          <div className="hidden sm:block">
            <p className="max-w-36 truncate text-sm font-semibold text-stone-800">
              {name}
            </p>
            <p className="text-[11px] text-stone-500">Client account</p>
          </div>

          <ChevronDown size={15} className="hidden text-stone-400 sm:block" />
        </Link>
      </div>
    </header>
  );
}
