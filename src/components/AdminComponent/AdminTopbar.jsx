
import { Bell, Menu, Search, ChevronDown } from "lucide-react";

export default function AdminTopbar({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between gap-3 border-b border-stone-200 bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <button
          onClick={onMenuClick}
          aria-label="Open navigation"
          className="rounded-xl p-2 text-stone-600 hover:bg-stone-100 lg:hidden"
        >
          <Menu size={21} />
        </button>

        <div className="hidden h-10 w-64 items-center gap-2 rounded-xl border border-stone-200 bg-stone-50 px-3 md:flex">
          <Search size={17} className="text-stone-400" />
          <input
            aria-label="Search admin portal"
            placeholder="Search tickets and users..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-stone-400"
          />
        </div>

        <span className="truncate text-sm font-semibold text-stone-700 md:hidden">
          Admin Portal
        </span>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        <button
          aria-label="Demo notifications"
          title="Demo only"
          className="relative rounded-xl p-2.5 text-stone-500 hover:bg-stone-100"
        >
          <Bell size={19} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-white bg-orange-600" />
        </button>

        <div className="h-8 w-px bg-stone-200" />

        <button className="flex items-center gap-2 rounded-xl p-1.5 text-left hover:bg-stone-50">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-100 text-xs font-bold text-orange-800">
            AD
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-stone-800">Alex Morgan</p>
            <p className="text-[11px] text-stone-500">Administrator</p>
          </div>
          <ChevronDown size={15} className="hidden text-stone-400 sm:block" />
        </button>
      </div>
    </header>
  );
}
