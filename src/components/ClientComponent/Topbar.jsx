import { useCallback, useEffect, useState } from "react";
import { Bell, Menu, Search, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { getActivities } from "../../api/activityApi";

function getReadNotificationIds() {
  try {
    return JSON.parse(localStorage.getItem("clientcare_read_notifications") || "[]");
  } catch {
    return [];
  }
}

function formatTime(value) {
  if (!value) return "Time unavailable";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function Topbar({ onMenuClick }) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [notificationsLoading, setNotificationsLoading] = useState(true);
  const [notificationsError, setNotificationsError] = useState("");
  const unreadCount = notifications.filter((item) => item.unread).length;

  const fetchNotifications = useCallback(async () => {
    setNotificationsLoading(true);
    setNotificationsError("");
    try {
      const response = await getActivities({ limit: 10 });
      const readIds = new Set(getReadNotificationIds());
      const items = (response.activities || []).map((activity) => {
        const ticket = activity.ticket;
        return {
          id: String(activity._id || activity.id),
          title: activity.action || "Ticket update",
          detail: activity.description || "There is a new update on your support ticket.",
          time: formatTime(activity.createdAt),
          ticketId: ticket?._id || ticket?.id || activity.ticketId || "",
          unread: !readIds.has(String(activity._id || activity.id)),
        };
      });
      setNotifications(items);
    } catch (error) {
      setNotificationsError(
        error.response?.data?.message || "Unable to load notifications."
      );
    } finally {
      setNotificationsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const markRead = (ids) => {
    const readIds = new Set(getReadNotificationIds());
    ids.forEach((id) => readIds.add(String(id)));
    localStorage.setItem("clientcare_read_notifications", JSON.stringify([...readIds]));
    setNotifications((items) => items.map((item) => ({ ...item, unread: false })));
  };

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
            className="relative rounded-xl p-2.5 text-stone-500 transition hover:bg-stone-100"
          >
            <Bell size={19} />
            {unreadCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full border-2 border-white bg-orange-600 px-0.5 text-[9px] font-bold text-white">
                {unreadCount}
              </span>
            )}
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 top-full z-50 mt-2 w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-xl">
              <div className="flex items-center justify-between border-b border-stone-100 px-4 py-3">
                <div>
                  <h2 className="text-sm font-bold text-stone-900">Notifications</h2>
                  <p className="text-xs text-stone-500">Recent ticket updates</p>
                </div>
                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={() => markRead(notifications.map((item) => item.id))}
                    className="text-xs font-semibold text-orange-800 hover:text-orange-950"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto">
                {notificationsLoading ? (
                  <p className="p-5 text-sm text-stone-500">Loading notifications...</p>
                ) : notificationsError ? (
                  <div role="alert" className="p-5">
                    <p className="text-sm text-red-700">{notificationsError}</p>
                    <button
                      type="button"
                      onClick={fetchNotifications}
                      className="mt-2 text-xs font-semibold text-red-800 underline"
                    >
                      Try again
                    </button>
                  </div>
                ) : notifications.length === 0 ? (
                  <p className="p-5 text-sm text-stone-500">No notifications yet.</p>
                ) : notifications.map((item) => (
                  <Link
                    key={item.id}
                    to={item.ticketId ? `/client/tickets/${item.ticketId}` : "/client/tickets"}
                    onClick={() => {
                      markRead([item.id]);
                      setNotificationsOpen(false);
                    }}
                    className="flex gap-3 border-b border-stone-100 px-4 py-3 last:border-0 hover:bg-orange-50/50"
                  >
                    <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${item.unread ? "bg-orange-600" : "bg-stone-200"}`} />
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold text-stone-800">{item.title}</span>
                      <span className="mt-1 block text-xs leading-5 text-stone-500">{item.detail}</span>
                      <span className="mt-1 block text-[11px] text-stone-400">{item.time}</span>
                    </span>
                  </Link>
                ))}
              </div>

              <Link
                to="/client/tickets"
                onClick={() => setNotificationsOpen(false)}
                className="block bg-stone-50 px-4 py-3 text-center text-xs font-bold text-orange-800 hover:bg-orange-50"
              >
                View my tickets
              </Link>
            </div>
          )}
        </div>

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
