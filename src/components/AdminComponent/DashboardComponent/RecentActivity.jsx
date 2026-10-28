
import { Link } from "react-router-dom";
import { Activity, ArrowUpRight } from "lucide-react";

export default function RecentActivity({ activity = [] }) {
  return (
    <section className="mt-8 overflow-hidden rounded-2xl border border-stone-200 bg-white">
      <div className="border-b border-stone-100 p-5">
        <div className="flex items-center gap-2">
          <Activity size={18} className="text-orange-700" />
          <h2 className="font-bold text-stone-900">Recent activity</h2>
        </div>
      </div>

      <div className="divide-y divide-stone-100">
        {activity.length === 0 ? (
          <p className="p-5 text-sm text-stone-500">
            No recent activity available.
          </p>
        ) : (
          activity.slice(0, 4).map((item) => {
            const id = item._id || item.id;
            const ticketId = item.ticket?._id || item.ticketId;

            return (
              <Link
                key={id}
                to={ticketId ? `/admin/tickets/${ticketId}` : "/admin/tickets"}
                className="flex items-center gap-3 p-4 hover:bg-stone-50 sm:px-5"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-stone-100 text-stone-600">
                  <Activity size={17} />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium text-stone-800">
                    {item.title || item.description || "Ticket activity"}
                  </span>

                  <span className="mt-1 block text-xs text-stone-500">
                    {ticketId ? `#${String(ticketId).slice(-6).toUpperCase()}` : "Activity"}
                    {" · "}
                    {item.time ||
                      (item.createdAt
                        ? new Date(item.createdAt).toLocaleString("en-IN")
                        : "Recently")}
                  </span>
                </span>

                <ArrowUpRight size={16} className="text-stone-400" />
              </Link>
            );
          })
        )}
      </div>
    </section>
  );
}
