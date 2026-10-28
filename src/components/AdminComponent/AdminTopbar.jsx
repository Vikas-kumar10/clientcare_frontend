
import { useEffect, useState } from "react";
import { Bell, Menu, Search } from "lucide-react";
import { getMyProfile } from "../../api/profileApi";
import { useAuth } from "../../context/AuthContext";

export default function AdminTopbar({ onMenuClick }) {
  const { user: sessionUser } = useAuth();
  const [profile, setProfile] = useState(sessionUser);

  useEffect(() => {
    let active = true;

    getMyProfile()
      .then((response) => {
        if (active && response?.user) setProfile(response.user);
      })
      .catch(() => {
        // Keep the signed-in session profile visible if the request fails.
      });

    return () => {
      active = false;
    };
  }, []);

  const name = profile?.name || "Admin";
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "A";
  const roleLabel = profile?.role === "admin"
    ? "Administrator"
    : profile?.role || "Admin";

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

        <div className="flex items-center gap-2 rounded-xl p-1.5 text-left">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-100 text-xs font-bold text-orange-800">
            {initials}
          </div>
          <div className="hidden sm:block">
            <p className="max-w-40 truncate text-sm font-semibold text-stone-800">{name}</p>
            <p className="text-[11px] capitalize text-stone-500">{roleLabel}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
