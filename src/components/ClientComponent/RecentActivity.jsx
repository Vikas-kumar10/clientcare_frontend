import { Link } from "react-router-dom";
import {
  Activity as ActivityIcon,
  CheckCircle2,
  Ticket,
  Clock3,
  ArrowUpRight,
} from "lucide-react";

function getActivityIcon(type) {
  if (type === "resolved") return CheckCircle2;
  if (type === "created") return Ticket;
  return Clock3;
}

export default function RecentActivity({ activity }) {
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
        {activity.length > 0 ? (
          activity.map((item) => {
            const Icon = getActivityIcon(item.type);

            return (
              <Link
                key={item.id}
                to={`/client/tickets/${item.ticketId}`}
                className="flex items-start gap-3 p-5 transition hover:bg-stone-50"
              >
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-700">
                  <Icon size={18} />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium text-stone-800">
                    {item.title}
                  </span>

                  <span className="mt-1 block text-xs text-stone-500">
                    {item.ticketId} · {item.time}
                  </span>
                </span>

                <ArrowUpRight
                  size={17}
                  className="text-stone-400"
                />
              </Link>
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