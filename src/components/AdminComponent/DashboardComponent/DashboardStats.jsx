
import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  Ticket,
} from "lucide-react";

const statConfig = [
  {
    label: "Total tickets",
    key: "total",
    note: "All client support requests",
    icon: Ticket,
    style: "bg-orange-50 text-orange-700",
  },
  {
    label: "Open tickets",
    key: "open",
    note: "Need admin review",
    icon: AlertTriangle,
    style: "bg-rose-50 text-rose-700",
  },
  {
    label: "Assigned tickets",
    key: "assigned",
    note: "Waiting for developer action",
    icon: Clock3,
    style: "bg-amber-50 text-amber-700",
  },
  {
    label: "Resolved tickets",
    key: "resolved",
    note: "Marked as fixed",
    icon: CheckCircle2,
    style: "bg-emerald-50 text-emerald-700",
  },
];

export default function DashboardStats({ tickets = [] }) {
  const counts = {
    total: tickets.length,
    open: tickets.filter((ticket) => ticket.status === "Open").length,
    assigned: tickets.filter((ticket) => ticket.status === "Assigned").length,
    resolved: tickets.filter((ticket) => ticket.status === "Resolved").length,
  };

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {statConfig.map(({ label, key, note, icon: Icon, style }) => (
        <div
          key={key}
          className="rounded-2xl border border-stone-200 bg-white p-5 transition hover:shadow-sm"
        >
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-medium text-stone-500">{label}</p>

            <span
              className={`flex h-10 w-10 items-center justify-center rounded-xl ${style}`}
            >
              <Icon size={20} />
            </span>
          </div>

          <p className="mt-4 text-3xl font-bold text-stone-900">
            {String(counts[key]).padStart(2, "0")}
          </p>

          <p className="mt-2 text-xs text-stone-500">{note}</p>
        </div>
      ))}
    </section>
  );
}
