import { useCallback, useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { Menu, Bell } from "lucide-react";
import DeveloperSidebar from "./DeveloperSidebar";
import {
  getNotifications,
  markNotificationAsRead,
} from "../../api/notificationApi";

export default function DeveloperLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notificationsLoading, setNotificationsLoading] = useState(true);
  const [notificationsError, setNotificationsError] = useState("");

  const fetchNotifications = useCallback(async () => {
    setNotificationsError("");
    try {
      const response = await getNotifications({ limit: 5 });
      setNotifications(response.notifications || []);
      setUnreadCount(response.unreadCount || 0);
    } catch (error) {
      setNotificationsError(
        error.response?.data?.message || "Unable to load notifications.",
      );
    } finally {
      setNotificationsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
    const intervalId = window.setInterval(fetchNotifications, 30000);
    return () => window.clearInterval(intervalId);
  }, [fetchNotifications]);

  const markRead = async (notification) => {
    if (notification.read) return;
    try {
      await markNotificationAsRead(notification._id);
      setNotifications((current) =>
        current.map((item) =>
          item._id === notification._id ? { ...item, read: true } : item,
        ),
      );
      setUnreadCount((count) => Math.max(0, count - 1));
    } catch (error) {
      setNotificationsError(
        error.response?.data?.message || "Could not mark notification as read.",
      );
    }
  };

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
        <header className="fixed inset-x-0 top-0 z-30 flex h-[68px] items-center justify-between border-b border-stone-200 bg-white/95 px-4 backdrop-blur sm:px-6 lg:left-[260px] lg:px-8">
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
            <div className="relative">
              <button
                type="button"
                aria-label={`Notifications${unreadCount ? `, ${unreadCount} unread` : ""}`}
                aria-expanded={notificationsOpen}
                onClick={() => {
                  const willOpen = !notificationsOpen;
                  setNotificationsOpen(willOpen);
                  if (willOpen) fetchNotifications();
                }}
                className="relative rounded-xl border border-stone-200 p-2.5 text-stone-600 transition hover:bg-stone-50"
              >
                <Bell size={18} />
                {unreadCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full border-2 border-white bg-orange-600 px-0.5 text-[9px] font-bold text-white">
                    {unreadCount > 99 ? "99+" : unreadCount}
                  </span>
                )}
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 top-full z-50 mt-2 w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-xl">
                  <div className="border-b border-stone-100 px-4 py-3">
                    <h2 className="text-sm font-bold text-stone-900">
                      Notifications
                    </h2>
                    <p className="text-xs text-stone-500">
                      Ticket assignments and updates
                    </p>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notificationsLoading ? (
                      <p className="p-5 text-sm text-stone-500">
                        Loading notifications...
                      </p>
                    ) : notificationsError ? (
                      <div role="alert" className="p-5">
                        <p className="text-sm text-red-700">
                          {notificationsError}
                        </p>
                        <button
                          type="button"
                          onClick={fetchNotifications}
                          className="mt-2 text-xs font-semibold text-red-800 underline"
                        >
                          Try again
                        </button>
                      </div>
                    ) : notifications.length === 0 ? (
                      <p className="p-5 text-sm text-stone-500">
                        No notifications yet.
                      </p>
                    ) : (
                      notifications.map((notification) => {
                        const ticketId = notification.ticket?._id;
                        return (
                          <Link
                            key={notification._id}
                            to={
                              ticketId
                                ? `/developer/tickets/${ticketId}`
                                : "/developer/tickets"
                            }
                            onClick={() => {
                              markRead(notification);
                              setNotificationsOpen(false);
                            }}
                            className="flex gap-3 border-b border-stone-100 px-4 py-3 last:border-0 hover:bg-orange-50/50"
                          >
                            <span
                              className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${notification.read ? "bg-stone-200" : "bg-orange-600"}`}
                            />
                            <span className="min-w-0 flex-1">
                              <span className="block text-sm font-semibold text-stone-800">
                                {notification.title}
                              </span>
                              <span className="mt-1 block text-xs leading-5 text-stone-500">
                                {notification.message}
                              </span>
                              <span className="mt-1 block text-[11px] text-stone-400">
                                {new Date(
                                  notification.createdAt,
                                ).toLocaleString()}
                              </span>
                            </span>
                          </Link>
                        );
                      })
                    )}
                  </div>
                </div>
              )}
            </div>

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

        <main className="pt-[68px]">
          <div className="p-4 sm:p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
