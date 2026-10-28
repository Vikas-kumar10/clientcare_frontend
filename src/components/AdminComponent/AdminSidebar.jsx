
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import {
  LayoutDashboard,
  Ticket,
  FolderKanban,
  Users,
  Code2,
  Headset,
  X,
  ChevronRight,
  History,
  Bell,
  Settings,
  LogOut,
} from "lucide-react";

const sections = [
  {
    title: "Overview",
    links: [
      {
        label: "Dashboard",
        to: "/admin",
        icon: LayoutDashboard,
        end: true,
      },
    ],
  },
  {
    title: "Support Management",
    links: [
      {
        label: "All Tickets",
        to: "/admin/tickets",
        icon: Ticket,
      },
      {
        label: "Manage Projects",
        to: "/admin/projects",
        icon: FolderKanban,
      },
      {
        label: "Manage Clients",
        to: "/admin/clients",
        icon: Users,
      },
      {
        label: "Manage Developers",
        to: "/admin/developers",
        icon: Code2,
      },
    ],
  },
  {
    title: "System",
    links: [
      {
        label: "Activity Log",
        to: "/admin/activity",
        icon: History,
      },
      {
        label: "Notifications",
        to: "/admin/notifications",
        icon: Bell,
      },
      {
        label: "Settings",
        to: "/admin/settings",
        icon: Settings,
      },
    ],
  },
];

export default function AdminSidebar({ open, onClose }) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    onClose?.();
    navigate("/login", { replace: true });
  };

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-stone-950/40 lg:hidden"
        />
      )}

      {/* Fixed sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-dvh w-[260px] flex-col border-r border-stone-200 bg-white transition-transform duration-200 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand */}
        <div className="flex h-[76px] shrink-0 items-center justify-between border-b border-stone-100 px-5">
          <NavLink
            to="/admin"
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
                Admin portal
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
        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-6">
          {sections.map((section) => (
            <div key={section.title} className="mb-7 last:mb-0">
              <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-stone-400">
                {section.title}
              </p>

              <nav className="space-y-1">
                {section.links.map(
                  ({ label, to, icon: Icon, end }) => (
                    <NavLink
                      key={to}
                      to={to}
                      end={end}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors ${
                          isActive
                            ? "bg-orange-50 text-orange-800"
                            : "text-stone-600 hover:bg-stone-50 hover:text-stone-900"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <Icon
                            size={19}
                            className={
                              isActive
                                ? "text-orange-700"
                                : "text-stone-500 group-hover:text-stone-800"
                            }
                          />

                          <span className="flex-1">{label}</span>

                          {isActive && (
                            <ChevronRight
                              size={16}
                              className="text-orange-700"
                            />
                          )}
                        </>
                      )}
                    </NavLink>
                  )
                )}
              </nav>
            </div>
          ))}
        </div>

        {/* Sidebar footer */}
        <div className="shrink-0 border-t border-stone-100 p-4">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
          >
            <LogOut size={19} />
            <span>Logout</span>
          </button>

          <p className="mt-2 text-center text-[10px] text-stone-400">
            ClientCare · Admin Portal
          </p>
        </div>
      </aside>
    </>
  );
}
