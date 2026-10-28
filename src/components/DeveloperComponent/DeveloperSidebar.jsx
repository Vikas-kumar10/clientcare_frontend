
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Ticket,
  Headset,
  X,
  ChevronRight,
  Code2,
  LifeBuoy,
  UserRound,
  LogOut,
  ChevronDown,
} from "lucide-react";

const links = [
  {
    label: "Dashboard",
    to: "/developer",
    icon: LayoutDashboard,
    end: true,
  },
  {
    label: "Assigned Tickets",
    to: "/developer/tickets",
    icon: Ticket,
  },
];

export default function DeveloperSidebar({ open, onClose }) {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const navigate = useNavigate();

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

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    // Close menus and sidebar
    setProfileMenuOpen(false);
    onClose?.();

    // Redirect to login
    navigate("/login", { replace: true });
  };

  return (
    <>
      {open && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-stone-950/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col border-r border-stone-200 bg-white transition-transform duration-200 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex h-[76px] shrink-0 items-center justify-between border-b border-stone-100 px-5">
          <NavLink
            to="/developer"
            onClick={onClose}
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C2410C] text-white">
              <Headset size={22} />
            </div>

            <div>
              <p className="text-lg font-extrabold text-stone-900">
                ClientCare<span className="text-orange-700">.</span>
              </p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">
                Developer portal
              </p>
            </div>
          </NavLink>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close sidebar"
            className="rounded-lg p-2 text-stone-500 hover:bg-stone-100 lg:hidden"
          >
            <X size={19} />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-4 pt-7">
          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-stone-400">
            Workspace
          </p>

          <nav className="space-y-1">
            {links.map(({ label, to, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-orange-50 text-orange-800"
                      : "text-stone-600 hover:bg-stone-50 hover:text-stone-900"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon size={19} />
                    <span className="flex-1">{label}</span>
                    {isActive && <ChevronRight size={16} />}
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Help Section */}
        <div className="shrink-0 border-t border-stone-100 p-4">
          <div className="rounded-2xl bg-[#FAF7F2] p-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-orange-700 shadow-sm">
              <LifeBuoy size={19} />
            </div>

            <p className="mt-3 text-sm font-bold text-stone-900">
              Developer workspace
            </p>

            <p className="mt-1 text-xs leading-5 text-stone-500">
              Review assigned issues, fix bugs and keep ticket statuses updated.
            </p>
          </div>

          {/* Profile Menu */}
          <div className="relative mt-4">
            <button
              type="button"
              onClick={() => setProfileMenuOpen((prev) => !prev)}
              aria-expanded={profileMenuOpen}
              aria-label="Open profile menu"
              className="flex w-full min-w-0 items-center gap-2 rounded-xl p-2 text-left transition hover:bg-stone-50"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-100 text-xs font-bold text-orange-800">
                {initials}
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold text-stone-800">
                  {name}
                </p>
                <p className="text-[10px] capitalize text-stone-400">
                  {developer.role || "Developer"}
                </p>
              </div>

              <ChevronDown
                size={16}
                className={`shrink-0 text-stone-400 transition-transform ${
                  profileMenuOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {profileMenuOpen && (
              <div className="absolute bottom-full left-0 z-[60] mb-2 w-full overflow-hidden rounded-xl border border-stone-200 bg-white p-1.5 shadow-lg">
                <NavLink
                  to="/developer/profile"
                  onClick={() => {
                    setProfileMenuOpen(false);
                    onClose?.();
                  }}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-stone-700 transition hover:bg-orange-50 hover:text-orange-800"
                >
                  <UserRound size={17} />
                  <span>My Profile</span>
                </NavLink>

                <div className="my-1 border-t border-stone-100" />

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
                >
                  <LogOut size={17} />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
