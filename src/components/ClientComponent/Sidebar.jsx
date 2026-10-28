import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  Ticket,
  PlusCircle,
  Headset,
  ChevronRight,
  X,
  LogOut,
} from "lucide-react";

const links = [
  { label: "Dashboard", to: "/client", icon: LayoutDashboard, end: true },
  { label: "My Projects", to: "/client/projects", icon: FolderKanban },

  { label: "Create Ticket", to: "/client/create-ticket", icon: PlusCircle },
  { label: "My Tickets", to: "/client/tickets", icon: Ticket },
];

export default function Sidebar({ open, onClose }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    onClose?.();
    navigate("/login", { replace: true });
  };

  return (
    <>
      {open && (
        <button
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
        <div className="flex h-[76px] shrink-0 items-center justify-between border-b border-stone-100 px-6">
          <NavLink
            to="/client"
            className="flex items-center gap-3"
            onClick={onClose}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C2410C] text-white">
              <Headset size={22} />
            </div>

            <div>
              <p className="text-lg font-extrabold tracking-tight text-stone-900">
                ClientCare<span className="text-orange-700">.</span>
              </p>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-stone-400">
                Client portal
              </p>
            </div>
          </NavLink>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-stone-500 hover:bg-stone-100 lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={19} />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-4 pt-7">
          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.17em] text-stone-400">
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
                  `group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
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

          {/* Help Card */}
          <div className="mt-8 rounded-2xl bg-[#FAF7F2] p-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-orange-700 shadow-sm">
              <Headset size={19} />
            </div>

            <p className="mt-3 text-sm font-bold text-stone-900">
              Need some help?
            </p>

            <p className="mt-1 text-xs leading-5 text-stone-500">
              Create a ticket and our team will review your issue.
            </p>

            <NavLink
              to="/client/create-ticket"
              onClick={onClose}
              className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-orange-800 hover:text-orange-950"
            >
              Report an issue <ChevronRight size={14} />
            </NavLink>
          </div>
        </div>

        {/* Fixed Bottom Section */}
        <div className="shrink-0 border-t border-stone-100 bg-white p-4">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-stone-600 transition hover:bg-red-50 hover:text-red-700"
          >
            <LogOut size={19} />
            <span className="flex-1 text-left">Logout</span>
            <ChevronRight size={16} />
          </button>

          <p className="mt-3 text-center text-[10px] text-stone-400">
            ClientCare Portal · Demo UI
          </p>
        </div>
      </aside>
    </>
  );
}
