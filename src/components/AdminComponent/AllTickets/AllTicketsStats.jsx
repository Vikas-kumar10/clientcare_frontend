
import { Ticket, Clock, UserCheck, CheckCircle } from "lucide-react";

const statConfig = [
  {
    key: "total",
    label: "Total Tickets",
    icon: Ticket,
    color: "text-orange-700",
    bg: "bg-orange-50",
  },
  {
    key: "open",
    label: "Open Tickets",
    icon: Clock,
    color: "text-amber-700",
    bg: "bg-amber-50",
  },
  {
    key: "assigned",
    label: "Assigned Tickets",
    icon: UserCheck,
    color: "text-stone-700",
    bg: "bg-stone-100",
  },
  {
    key: "resolved",
    label: "Resolved Tickets",
    icon: CheckCircle,
    color: "text-green-700",
    bg: "bg-green-50",
  },
];

export default function AllTicketsStats({ tickets = [] }) {
  const stats = {
    total: tickets.length,
    open: tickets.filter((ticket) => ticket.status === "Open").length,
    assigned: tickets.filter((ticket) => ticket.status === "Assigned").length,
    resolved: tickets.filter(
      (ticket) => ticket.status === "Resolved"
    ).length,
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {statConfig.map(({ key, label, icon: Icon, color, bg }) => (
        <div
          key={key}
          className="rounded-2xl border border-stone-200 bg-white p-5"
        >
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-stone-500">{label}</p>
            <div className={`rounded-xl p-2.5 ${bg} ${color}`}>
              <Icon size={20} />
            </div>
          </div>

          <p className="mt-4 text-3xl font-bold text-stone-900">
            {stats[key]}
          </p>
        </div>
      ))}
    </div>
  );
}
