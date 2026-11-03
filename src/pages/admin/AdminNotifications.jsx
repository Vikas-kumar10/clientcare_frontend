import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Bell,
  Check,
  CheckCheck,
  CircleAlert,
  ClipboardCheck,
  Ticket,
} from "lucide-react";
import { PageHeader } from "../../components/ClientComponent/UI";
import {
  getNotifications,
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from "../../api/notificationApi";

const initialNotifications = []; /*
  {
    id: 1,
    type: "ticket",
    title: "New support ticket submitted",
    message: "Alex Morgan reported an issue with the checkout payment flow.",
    reference: "TKT-5258",
    ticketId: "6adf461bcfdd18a03bdb5258",
    time: "10 minutes ago",
    unread: true,
  },
  {
    id: 2,
    type: "assignment",
    title: "Ticket assigned to a developer",
    message: "Rahul Sharma was assigned to investigate a payment callback issue.",
    reference: "TKT-5174",
    ticketId: "6adf3b66cf9b8154c1ce0ada",
    time: "Today, 9:42 AM",
    unread: true,
  },
  {
    id: 3,
    type: "status",
    title: "Ticket marked as resolved",
    message: "The developer marked the client’s login issue as resolved.",
    reference: "TKT-4912",
    ticketId: "6adf3b66cf9b8154c1ce0ada",
    time: "Today, 8:15 AM",
    unread: true,
  },
  {
    id: 4,
    type: "client",
    title: "New client account created",
    message: "A new client account was added to ClientCare.",
    time: "Yesterday, 4:30 PM",
    unread: false,
  },
  {
    id: 5,
    type: "ticket",
    title: "High priority ticket needs review",
    message: "A ticket about missing order records is waiting for admin review.",
    reference: "TKT-4881",
    ticketId: "6adf3b66cf9b8154c1ce0ada",
    time: "Yesterday, 2:05 PM",
    unread: false,
  },
]; */

const notificationTypes = {
  ticket_created: { icon: Ticket, style: "bg-orange-50 text-orange-700" },
  ticket_assigned: {
    icon: ClipboardCheck,
    style: "bg-violet-50 text-violet-700",
  },
  ticket_status_updated: {
    icon: Check,
    style: "bg-emerald-50 text-emerald-700",
  },
};

export default function AdminNotifications() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [unreadCount, setUnreadCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    let active = true;
    getNotifications()
      .then((data) => {
        if (!active) return;
        setNotifications(data.notifications || []);
        setUnreadCount(data.unreadCount || 0);
        setTotalCount(
          data.pagination?.total ?? data.notifications?.length ?? 0,
        );
      })
      .catch(() => {
        if (!active) return;
        setNotifications([]);
        setError("Could not load notifications. Please try again.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const visibleNotifications = useMemo(
    () => notifications.filter((item) => filter !== "Unread" || !item.read),
    [notifications, filter],
  );

  const markRead = async (id) => {
    if (notifications.find((item) => item._id === id)?.read) return;
    try {
      await markNotificationAsRead(id);
      setNotifications((current) =>
        current.map((item) =>
          item._id === id ? { ...item, read: true } : item,
        ),
      );
      setUnreadCount((count) => Math.max(0, count - 1));
      setError("");
    } catch {
      setError("Could not mark this notification as read. Please try again.");
    }
  };

  const markAllRead = async () => {
    try {
      await markAllNotificationsAsRead();
      setNotifications((current) =>
        current.map((item) => ({ ...item, read: true })),
      );
      setUnreadCount(0);
      setError("");
    } catch {
      setError("Could not mark notifications as read. Please try again.");
    }
  };

  return (
    <div>
      <PageHeader
        eyebrow="Administration"
        title="Notifications"
        description="Keep up with ticket updates, assignments and client account activity."
        action={
          <button
            type="button"
            onClick={markAllRead}
            disabled={unreadCount === 0 || loading}
            className="inline-flex items-center gap-2 rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm font-semibold text-stone-700 transition hover:border-orange-300 hover:text-orange-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <CheckCheck size={17} /> Mark all as read
          </button>
        }
      />

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-stone-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-stone-500">All notifications</p>
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-700">
              <Bell size={19} />
            </span>
          </div>
          <p className="mt-4 text-3xl font-bold text-stone-900">{totalCount}</p>
        </div>
        <div className="rounded-2xl border border-stone-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-stone-500">Unread notifications</p>
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
              <CircleAlert size={19} />
            </span>
          </div>
          <p className="mt-4 text-3xl font-bold text-stone-900">
            {unreadCount}
          </p>
        </div>
      </div>

      <section className="overflow-hidden rounded-2xl border border-stone-200 bg-white">
        <div className="flex items-center justify-between gap-4 border-b border-stone-100 p-4 sm:p-5">
          <div>
            <h2 className="font-bold text-stone-900">Recent notifications</h2>
            <p className="mt-1 text-sm text-stone-500">
              Updates for your admin account
            </p>
          </div>
          <div
            className="flex rounded-lg bg-stone-100 p-1"
            aria-label="Filter notifications"
          >
            {["All", "Unread"].map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setFilter(option)}
                className={`rounded-md px-3 py-1.5 text-xs font-semibold transition ${filter === option ? "bg-white text-stone-900 shadow-sm" : "text-stone-500 hover:text-stone-800"}`}
              >
                {option}
                {option === "Unread" && (
                  <span className="ml-1">{unreadCount}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <p
            role="alert"
            className="border-b border-red-100 bg-red-50 px-5 py-3 text-sm text-red-700"
          >
            {error}
          </p>
        )}
        {loading ? (
          <p className="px-5 py-14 text-center text-sm text-stone-500">
            Loading notifications...
          </p>
        ) : visibleNotifications.length ? (
          <div className="divide-y divide-stone-100">
            {visibleNotifications.map((item) => {
              const { icon: Icon, style } =
                notificationTypes[item.type] ||
                notificationTypes.ticket_created;
              const ticketId = item.ticket?._id;
              const timestamp = item.createdAt
                ? new Date(item.createdAt).toLocaleString()
                : "";
              const content = (
                <>
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${style}`}
                  >
                    <Icon size={19} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-semibold text-stone-900">
                        {item.title}
                      </span>
                      {!item.read && (
                        <span
                          className="h-2 w-2 rounded-full bg-orange-600"
                          aria-label="Unread"
                        />
                      )}
                    </span>
                    <span className="mt-1 block text-sm leading-5 text-stone-600">
                      {item.message}
                    </span>
                    <span className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-stone-400">
                      <span>{timestamp}</span>
                      {ticketId && (
                        <Link
                          to={`/admin/tickets/${ticketId}`}
                          onClick={() => markRead(item._id)}
                          className="font-medium text-orange-700 hover:text-orange-900"
                        >
                          {item.ticket?.title || "View ticket"}
                        </Link>
                      )}
                    </span>
                  </span>
                  {!item.read && (
                    <button
                      type="button"
                      onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        markRead(item._id);
                      }}
                      className="shrink-0 rounded-lg px-2.5 py-2 text-xs font-semibold text-stone-500 hover:bg-stone-100 hover:text-stone-800"
                    >
                      Mark read
                    </button>
                  )}
                </>
              );

              return (
                <div
                  key={item._id}
                  className={`flex items-center gap-3 p-4 sm:px-5 ${!item.read ? "bg-orange-50/30" : ""}`}
                >
                  {content}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="px-5 py-14 text-center">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-stone-100 text-stone-500">
              <CheckCheck size={22} />
            </span>
            <h3 className="mt-4 text-sm font-bold text-stone-900">
              You’re all caught up
            </h3>
            <p className="mt-1 text-sm text-stone-500">
              There are no unread notifications right now.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
