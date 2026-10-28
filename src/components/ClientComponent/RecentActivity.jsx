import { Link } from "react-router-dom";
import {
  Activity as ActivityIcon,
  CheckCircle2,
  Ticket,
  Clock3,
  ArrowUpRight,
} from "lucide-react";

function getActivityIcon(item) {
  const action = `${item.action || ""} ${item.description || item.title || ""}`.toLowerCase();
  if (action.includes("resolv") || action.includes("complet")) return CheckCircle2;
  if (action.includes("creat") || action.includes("report")) return Ticket;
  return Clock3;
}

function getTicketId(item) {
  const ticket = item.ticket;
  return String(ticket?._id || ticket?.id || item.ticketId || "");
}

function formatActivityTime(item) {
  const value = item.createdAt || item.time || item.timestamp;
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

export default function RecentActivity({
  activity = [],
  loading = false,
  error = "",
  onRetry,
}) {
  return (
    <section className="mt-8 overflow-hidden rounded-2xl border border-stone-200 bg-white">
      <div className="border-b border-stone-100 p-5 sm:p-6">
        <div className="flex items-center gap-2">
          <ActivityIcon size={19} className="text-orange-700" />
          <h2 className="font-bold text-stone-900">Recent activity</h2>
        </div>

        <p className="mt-1 text-sm text-stone-500">
          A quick look at recent ticket updates.
        </p>
      </div>

      <div className="divide-y divide-stone-100">
        {loading ? (
          <p className="p-6 text-sm text-stone-500">Loading recent activity...</p>
        ) : error ? (
          <div role="alert" className="p-6">
            <p className="text-sm text-red-700">{error}</p>
            <button
              type="button"
              onClick={onRetry}
              className="mt-2 text-sm font-semibold text-red-800 underline"
            >
              Try again
            </button>
          </div>
        ) : activity.length > 0 ? (
          activity.slice(0, 3).map((item) => {
            const Icon = getActivityIcon(item);
            const ticketId = getTicketId(item);
            const title = item.description || item.title || item.action || "Ticket activity";
            const row = (
              <>
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-700">
                  <Icon size={18} />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium text-stone-800">
                    {title}
                  </span>

                  <span className="mt-1 block text-xs text-stone-500">
                    {ticketId ? `#${ticketId.slice(-6).toUpperCase()} · ` : ""}
                    {formatActivityTime(item)}
                  </span>
                </span>

                {ticketId && <ArrowUpRight size={17} className="text-stone-400" />}
              </>
            );

            return ticketId ? (
              <Link
                key={item._id || item.id}
                to={`/client/tickets/${ticketId}`}
                className="flex items-start gap-3 p-5 transition hover:bg-stone-50"
              >
                {row}
              </Link>
            ) : (
              <div key={item._id || item.id} className="flex items-start gap-3 p-5">
                {row}
              </div>
            );
          })
        ) : (
          <p className="p-6 text-sm text-stone-500">
            No recent activity.
          </p>
        )}
      </div>
    </section>
  );
}
